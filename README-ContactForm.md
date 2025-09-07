# Contact Form Integration Guide

This project now includes a fully integrated contact form API that works with Azure Static Web Apps.

## 🚀 Quick Setup

### 1. Environment Configuration

Copy the example environment file:
```bash
cp .env.example .env.local
```

Fill in your ProtonMail credentials in `.env.local`:
```
EMAIL_SMTP_USER=your.email@protonmail.com
EMAIL_SMTP_PASSWORD=your-app-password
RECIPIENT_EMAIL_ADDRESS=your.recipient@email.com
NODE_ENV=development
```

### 2. ProtonMail App Password Setup

1. Log into your ProtonMail account
2. Go to **Settings** → **Account and Security**
3. Enable **Two-factor authentication** (required for app passwords)
4. Go to **Settings** → **Account and Security** → **App passwords**
5. Create a new app password for "Contact Form API"
6. Use this app password in your `.env.local` file

### 3. Deploy to Azure Static Web Apps

1. Push your code to GitHub
2. In Azure Portal, create a new Static Web App
3. Connect to your GitHub repository
4. Configure build settings:
   - **App location**: `/`
   - **Api location**: `/api`
   - **Output location**: `/dist`
5. Add environment variables in Azure Portal:
   - `EMAIL_SMTP_USER`
   - `EMAIL_SMTP_PASSWORD`
   - `RECIPIENT_EMAIL_ADDRESS`

## 📁 Project Structure

```
├── api/                          # Azure Functions API
│   ├── contact-form/
│   │   └── index.ts              # Main contact form handler
│   ├── shared/                   # Shared utilities
│   │   ├── types.ts              # TypeScript interfaces
│   │   ├── validation.ts         # Input validation & spam detection
│   │   ├── email-service.ts      # Email sending logic
│   │   ├── security.ts           # Security headers & CORS
│   │   └── logger.ts             # Structured logging
│   ├── package.json              # API dependencies
│   └── tsconfig.json             # TypeScript configuration
├── src/
│   ├── components/
│   │   └── ContactForm.tsx       # React contact form component
│   └── utils/
│       └── contactFormHandler.ts # Frontend API client
├── staticwebapp.config.json      # Static Web App configuration
└── .env.example                  # Environment variables template
```

## 🔒 Security Features

- **Rate limiting**: 5 requests per 15 minutes per IP
- **Input validation**: Comprehensive form validation
- **Spam detection**: Pattern-based spam filtering
- **CORS protection**: Configurable allowed origins
- **Security headers**: CSP, HSTS, X-Frame-Options, etc.
- **HTML sanitization**: Prevents XSS attacks

## 🌐 API Usage

The contact form API endpoint: `/api/contact-form`

### Request Format
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "subject": "Website Inquiry",
  "message": "Hello, I'd like to know more about your services."
}
```

### Success Response
```json
{
  "success": true,
  "message": "Thank you for your message. We will get back to you soon.",
  "id": "req_1693834567_abc123def"
}
```

## 🧪 Local Development

1. Install dependencies:
```bash
npm install
cd api && npm install && cd ..
```

2. Build the API:
```bash
cd api && npm run build && cd ..
```

3. Start the development server:
```bash
npm run dev
```

The contact form will be available in your React app and will use the local API endpoint.

## 🔧 Customization

### Adding More Origins
Edit `api/shared/security.ts`:
```typescript
const ALLOWED_ORIGINS = [
  'https://yourdomain.com',
  'https://www.yourdomain.com',
  // Add your domains here
];
```

### Adjusting Rate Limits
Edit `api/shared/validation.ts`:
```typescript
private readonly maxRequests: number = 10;      // Increase limit
private readonly windowMs: number = 10 * 60 * 1000; // 10 minutes
```

### Email Template Styling
The email template in `api/shared/email-service.ts` can be customized with your branding.

## 📊 Monitoring

View logs and metrics in Azure Portal:
- Go to your Static Web App resource
- Navigate to **Functions** → **Log Stream**
- Monitor API calls and error rates

## ♻️ Reusable API

The API code in the `/api` folder can be copied to other projects:

1. Copy the entire `/api` folder
2. Update `ALLOWED_ORIGINS` in `security.ts`
3. Update environment variables
4. Deploy to any Azure Static Web App

## 💰 Cost Estimate

Expected monthly cost for moderate usage (~1000 contact form submissions):
- **Azure Static Web Apps**: Free tier available
- **Azure Functions**: ~$0.20 (very low cost due to serverless nature)
- **Total**: ~$0.20/month (excluding domain costs)

## 🛠️ Troubleshooting

### Common Issues

1. **CORS Errors**: Ensure your domain is added to `ALLOWED_ORIGINS`
2. **Email Not Sending**: Check ProtonMail credentials and app password
3. **Rate Limiting**: Users limited to 5 requests per 15 minutes
4. **Build Errors**: Ensure all dependencies are installed in both root and api folders

### Environment Variable Issues
Make sure environment variables are set in Azure Portal under **Configuration** → **Application settings**.

---

**Built with ❤️ using React, Azure Functions, and ProtonMail SMTP**