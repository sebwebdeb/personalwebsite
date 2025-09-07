import { ContactFormRequest, EmailConfig, EmailTemplate } from './types';
import { logger } from './logger';

/**
 * Lightweight email service for Static Web Apps
 * Using nodemailer with environment variables (no Key Vault dependency)
 */

/**
 * Load email configuration from environment variables
 */
function loadEmailConfig(): EmailConfig {
  const emailSmtpUser = process.env.EMAIL_SMTP_USER;
  const emailSmtpPassword = process.env.EMAIL_SMTP_PASSWORD;
  const recipientEmailAddress = process.env.RECIPIENT_EMAIL_ADDRESS;

  if (!emailSmtpUser || !emailSmtpPassword || !recipientEmailAddress) {
    throw new Error('Missing required email configuration. Please set EMAIL_SMTP_USER, EMAIL_SMTP_PASSWORD, and RECIPIENT_EMAIL_ADDRESS environment variables.');
  }

  return {
    smtp: {
      host: 'smtp.protonmail.ch',
      port: 587,
      secure: false, // Use STARTTLS
      user: emailSmtpUser,
      password: emailSmtpPassword,
    },
    from: {
      name: 'Contact Form',
      email: emailSmtpUser,
    },
    to: {
      email: recipientEmailAddress,
    },
  };
}

/**
 * Generate email template
 */
function generateEmailTemplate(formData: ContactFormRequest, requestId: string): EmailTemplate {
  const subject = formData.subject 
    ? `Contact Form: ${formData.subject}` 
    : 'New Contact Form Submission';

  const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Contact Form Submission</title>
      <style>
        body {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          line-height: 1.6;
          color: #333;
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
          background-color: #f8f9fa;
        }
        .container {
          background-color: white;
          padding: 30px;
          border-radius: 8px;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        }
        .header {
          background-color: #4338ca;
          color: white;
          padding: 20px;
          margin: -30px -30px 30px -30px;
          border-radius: 8px 8px 0 0;
          text-align: center;
        }
        .field {
          margin-bottom: 20px;
          padding-bottom: 15px;
          border-bottom: 1px solid #e9ecef;
        }
        .field:last-child {
          border-bottom: none;
        }
        .label {
          font-weight: bold;
          color: #495057;
          display: block;
          margin-bottom: 5px;
        }
        .value {
          background-color: #f8f9fa;
          padding: 10px;
          border-radius: 4px;
          border-left: 3px solid #4338ca;
        }
        .message {
          white-space: pre-line;
        }
        .footer {
          margin-top: 30px;
          padding-top: 20px;
          border-top: 2px solid #e9ecef;
          font-size: 0.9em;
          color: #6c757d;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Contact Form Submission</h1>
        </div>
        
        <div class="field">
          <span class="label">Name:</span>
          <div class="value">${formData.name}</div>
        </div>
        
        <div class="field">
          <span class="label">Email:</span>
          <div class="value">${formData.email}</div>
        </div>
        
        ${formData.subject ? `
        <div class="field">
          <span class="label">Subject:</span>
          <div class="value">${formData.subject}</div>
        </div>
        ` : ''}
        
        <div class="field">
          <span class="label">Message:</span>
          <div class="value message">${formData.message}</div>
        </div>
        
        <div class="footer">
          <p><strong>Request ID:</strong> ${requestId}</p>
          <p><strong>Timestamp:</strong> ${new Date().toISOString()}</p>
          <p><em>This message was sent via your website's contact form.</em></p>
        </div>
      </div>
    </body>
    </html>
  `;

  const text = `
Contact Form Submission

Name: ${formData.name}
Email: ${formData.email}
${formData.subject ? `Subject: ${formData.subject}` : ''}

Message:
${formData.message}

---
Request ID: ${requestId}
Timestamp: ${new Date().toISOString()}

This message was sent via your website's contact form.
  `;

  return {
    subject,
    html,
    text: text.trim(),
  };
}

/**
 * Send contact form email
 * Note: This requires the nodemailer dependency to be installed
 */
export async function sendContactEmail(formData: ContactFormRequest, requestId: string): Promise<void> {
  try {
    // Check if we're in test mode
    if (process.env.TEST_MODE === 'true') {
      logger.info('TEST MODE: Email would be sent', {
        requestId,
        to: process.env.RECIPIENT_EMAIL_ADDRESS,
        from: formData.email,
        subject: formData.subject || 'New Contact Form Submission',
        messagePreview: formData.message.substring(0, 100) + '...',
      });
      return;
    }

    // Dynamic import to handle the case where nodemailer might not be installed yet
    const nodemailer = await import('nodemailer').catch(() => {
      throw new Error('nodemailer is required but not installed. Please run: npm install nodemailer @types/nodemailer');
    });

    const config = loadEmailConfig();
    const template = generateEmailTemplate(formData, requestId);

    const transporter = nodemailer.default.createTransport({
      host: config.smtp.host,
      port: config.smtp.port,
      secure: config.smtp.secure,
      auth: {
        user: config.smtp.user,
        pass: config.smtp.password,
      },
      tls: {
        rejectUnauthorized: false,
      },
      connectionTimeout: 10000, // 10 seconds
      greetingTimeout: 5000,    // 5 seconds
      socketTimeout: 10000,     // 10 seconds
    });

    // Verify connection
    await transporter.verify();
    logger.info('SMTP connection verified successfully');

    const mailOptions = {
      from: `"${config.from.name}" <${config.from.email}>`,
      to: config.to.email,
      replyTo: formData.email,
      subject: template.subject,
      text: template.text,
      html: template.html,
      headers: {
        'X-Request-ID': requestId,
        'X-Contact-Form': 'true',
      },
    };

    const result = await transporter.sendMail(mailOptions);
    
    logger.info('Contact email sent successfully', {
      requestId,
      messageId: result.messageId,
      response: result.response,
    });

  } catch (error) {
    logger.error('Failed to send contact email', {
      requestId,
      error: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined,
    });
    
    throw new Error('Failed to send email');
  }
}