import { app, HttpRequest, HttpResponseInit, InvocationContext } from '@azure/functions';
import { validateContactForm, isSpam, rateLimiter } from '../shared/validation';
import { sendContactEmail } from '../shared/email-service';
import { logger } from '../shared/logger';
import { 
  SECURITY_HEADERS, 
  getCorsHeaders, 
  generateRequestId, 
  getClientIp, 
  maskSensitiveData 
} from '../shared/security';
import { 
  ContactFormResponse, 
  ApiError 
} from '../shared/types';

/**
 * Contact Form Azure Function for Static Web Apps
 * Handles POST requests to /api/contact-form
 */
async function contactFormFunction(
  req: HttpRequest,
  _context: InvocationContext
): Promise<HttpResponseInit> {
  const requestId = generateRequestId();
  const clientIp = getClientIp(Object.fromEntries(req.headers.entries()));
  const origin = req.headers.get('origin') || undefined;
  
  // Set up logging context
  logger.setRequestId(requestId);

  logger.info('Contact form request received', {
    requestId,
    method: req.method,
    origin,
    clientIp: maskSensitiveData({ clientIp }).clientIp,
  });

  try {
    // Handle preflight OPTIONS request
    if (req.method === 'OPTIONS') {
      return {
        status: 200,
        headers: {
          ...SECURITY_HEADERS,
          ...getCorsHeaders(origin),
        },
        body: null,
      };
    }

    // Validate request method
    if (req.method !== 'POST') {
      const error: ApiError = {
        code: 'METHOD_NOT_ALLOWED',
        message: 'Only POST requests are allowed',
        timestamp: new Date().toISOString(),
      };

      return {
        status: 405,
        headers: {
          ...SECURITY_HEADERS,
          ...getCorsHeaders(origin),
          'Content-Type': 'application/json',
        },
        jsonBody: error,
      };
    }

    // Rate limiting check
    if (rateLimiter.isRateLimited(clientIp)) {
      logger.warn('Rate limit exceeded', { clientIp, requestId });
      
      const error: ApiError = {
        code: 'RATE_LIMIT_EXCEEDED',
        message: 'Too many requests. Please try again later.',
        timestamp: new Date().toISOString(),
      };

      return {
        status: 429,
        headers: {
          ...SECURITY_HEADERS,
          ...getCorsHeaders(origin),
          'Content-Type': 'application/json',
          'Retry-After': '900', // 15 minutes
        },
        jsonBody: error,
      };
    }

    // Validate and sanitize input
    const validationResult = validateContactForm(await req.json());
    
    if (!validationResult.isValid || !validationResult.sanitizedData) {
      logger.warn('Validation failed', { 
        errors: validationResult.errors, 
        requestId 
      });

      const error: ApiError = {
        code: 'VALIDATION_ERROR',
        message: 'Invalid input data',
        details: validationResult.errors,
        timestamp: new Date().toISOString(),
      };

      return {
        status: 400,
        headers: {
          ...SECURITY_HEADERS,
          ...getCorsHeaders(origin),
          'Content-Type': 'application/json',
        },
        jsonBody: error,
      };
    }

    const formData = validationResult.sanitizedData;

    // Spam detection
    const messageContent = `${formData.name} ${formData.subject || ''} ${formData.message}`;
    if (isSpam(messageContent)) {
      logger.warn('Spam detected', { 
        requestId,
        clientIp: maskSensitiveData({ clientIp }).clientIp,
      });

      // Return success to avoid revealing spam detection
      const response: ContactFormResponse = {
        success: true,
        message: 'Thank you for your message. We will get back to you soon.',
        id: requestId,
      };

      return {
        status: 200,
        headers: {
          ...SECURITY_HEADERS,
          ...getCorsHeaders(origin),
          'Content-Type': 'application/json',
        },
        jsonBody: response,
      };
    }

    // Send email
    await sendContactEmail(formData, requestId);

    logger.info('Contact form processed successfully', { 
      requestId,
      remainingRequests: rateLimiter.getRemainingRequests(clientIp),
    });

    const response: ContactFormResponse = {
      success: true,
      message: 'Thank you for your message. We will get back to you soon.',
      id: requestId,
    };

    return {
      status: 200,
      headers: {
        ...SECURITY_HEADERS,
        ...getCorsHeaders(origin),
        'Content-Type': 'application/json',
      },
      jsonBody: response,
    };

  } catch (error) {
    logger.error('Unexpected error in contact form function', { 
      error: error instanceof Error ? error.message : 'Unknown error',
      requestId,
      stack: error instanceof Error ? error.stack : undefined,
    });

    const apiError: ApiError = {
      code: 'INTERNAL_SERVER_ERROR',
      message: 'An unexpected error occurred. Please try again later.',
      timestamp: new Date().toISOString(),
    };

    return {
      status: 500,
      headers: {
        ...SECURITY_HEADERS,
        ...getCorsHeaders(origin),
        'Content-Type': 'application/json',
      },
      jsonBody: apiError,
    };
  }
}

app.http('contact-form', {
  methods: ['GET', 'POST', 'OPTIONS'],
  authLevel: 'anonymous',
  handler: contactFormFunction
});