import { ContactFormRequest, ValidationError } from './types';

/**
 * Simple validation without external dependencies for Static Web Apps
 */

/**
 * Validates email format
 */
function isValidEmail(email: string): boolean {
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  return emailRegex.test(email);
}

/**
 * Validates name format
 */
function isValidName(name: string): boolean {
  const nameRegex = /^[a-zA-Z\s\-'.]+$/;
  return nameRegex.test(name) && name.trim().length > 0 && name.length <= 100;
}

/**
 * Simple HTML sanitization (removes HTML tags)
 */
function sanitizeHtml(input: string): string {
  return input
    .replace(/<script[^>]*>.*?<\/script>/gi, '')
    .replace(/<[^>]+>/g, '')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#x27;/g, "'")
    .replace(/&amp;/g, '&');
}

/**
 * Validates and sanitizes contact form input
 */
export function validateContactForm(data: unknown): {
  isValid: boolean;
  sanitizedData?: ContactFormRequest;
  errors?: ValidationError[];
} {
  const errors: ValidationError[] = [];
  
  if (!data || typeof data !== 'object') {
    return {
      isValid: false,
      errors: [{ field: 'form', message: 'Invalid form data' }],
    };
  }

  const formData = data as Record<string, unknown>;

  // Validate name
  if (!formData.name || typeof formData.name !== 'string') {
    errors.push({ field: 'name', message: 'Name is required' });
  } else if (!isValidName(formData.name)) {
    errors.push({ field: 'name', message: 'Name contains invalid characters or is too long' });
  }

  // Validate email
  if (!formData.email || typeof formData.email !== 'string') {
    errors.push({ field: 'email', message: 'Email is required' });
  } else if (!isValidEmail(formData.email)) {
    errors.push({ field: 'email', message: 'Please provide a valid email address' });
  } else if (formData.email.length > 254) {
    errors.push({ field: 'email', message: 'Email must be less than 254 characters' });
  }

  // Validate subject (optional)
  if (formData.subject && typeof formData.subject === 'string' && formData.subject.length > 200) {
    errors.push({ field: 'subject', message: 'Subject must be less than 200 characters' });
  }

  // Validate message
  if (!formData.message || typeof formData.message !== 'string') {
    errors.push({ field: 'message', message: 'Message is required' });
  } else if (formData.message.trim().length < 10) {
    errors.push({ field: 'message', message: 'Message must be at least 10 characters long' });
  } else if (formData.message.length > 5000) {
    errors.push({ field: 'message', message: 'Message must be less than 5000 characters' });
  }

  if (errors.length > 0) {
    return {
      isValid: false,
      errors,
    };
  }

  // Sanitize the data
  const sanitizedData: ContactFormRequest = {
    name: sanitizeHtml(formData.name as string).trim(),
    email: sanitizeHtml(formData.email as string).trim(),
    subject: formData.subject ? sanitizeHtml(formData.subject as string).trim() : undefined,
    message: sanitizeHtml(formData.message as string).trim(),
  };

  return {
    isValid: true,
    sanitizedData,
  };
}

/**
 * Basic spam detection patterns
 */
const spamPatterns = [
  /\b(?:viagra|cialis|casino|poker|lottery|winner|congratulations)\b/i,
  /\b(?:click here|free money|make money fast|work from home)\b/i,
  /(?:https?:\/\/[^\s]+){3,}/i, // Multiple URLs
  /(.)\1{10,}/, // Repeated characters
  /[^\u0000-\u007F]{20,}/, // Too many non-ASCII characters
];

/**
 * Checks if content appears to be spam
 */
export function isSpam(content: string): boolean {
  const cleanContent = content.toLowerCase();
  return spamPatterns.some(pattern => pattern.test(cleanContent));
}

/**
 * Rate limiting check (simple in-memory implementation)
 */
class RateLimiter {
  private requests: Map<string, number[]> = new Map();
  private readonly maxRequests: number = 5;
  private readonly windowMs: number = 15 * 60 * 1000; // 15 minutes

  public isRateLimited(identifier: string): boolean {
    const now = Date.now();
    const windowStart = now - this.windowMs;
    
    const requestTimes = this.requests.get(identifier) || [];
    const validRequests = requestTimes.filter(time => time > windowStart);
    
    if (validRequests.length >= this.maxRequests) {
      return true;
    }
    
    validRequests.push(now);
    this.requests.set(identifier, validRequests);
    
    return false;
  }

  public getRemainingRequests(identifier: string): number {
    const now = Date.now();
    const windowStart = now - this.windowMs;
    
    const requestTimes = this.requests.get(identifier) || [];
    const validRequests = requestTimes.filter(time => time > windowStart);
    
    return Math.max(0, this.maxRequests - validRequests.length);
  }
}

export const rateLimiter = new RateLimiter();