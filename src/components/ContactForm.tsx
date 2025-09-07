import React, { useState, type FormEvent } from 'react';
import { submitContactForm, validateContactForm } from '../utils/contactFormHandler';

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear status when user starts typing
    if (submitStatus.type) {
      setSubmitStatus({ type: null, message: '' });
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Validate form
    const validationError = validateContactForm(formData);
    if (validationError) {
      setSubmitStatus({
        type: 'error',
        message: validationError
      });
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: '' });

    try {
      const result = await submitContactForm(formData);
      
      if (result.success) {
        setSubmitStatus({
          type: 'success',
          message: result.message
        });
        
        // Reset form on success
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: ''
        });
      } else {
        setSubmitStatus({
          type: 'error',
          message: result.message
        });
      }
    } catch (_error) {
      setSubmitStatus({
        type: 'error',
        message: 'An unexpected error occurred. Please try again.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="contact__form" onSubmit={handleSubmit}>
      <h3 className="contact__form-title">Send a Message</h3>
      
      {submitStatus.type && (
        <div className={`contact__form-status contact__form-status--${submitStatus.type}`}>
          {submitStatus.message}
        </div>
      )}

      <label>
        Full Name
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          placeholder="Your Name"
          required
          disabled={isSubmitting}
        />
      </label>

      <label>
        Email Address
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          placeholder="your.email@example.com"
          required
          disabled={isSubmitting}
        />
      </label>

      <label>
        Subject (Optional)
        <input
          type="text"
          name="subject"
          value={formData.subject}
          onChange={handleInputChange}
          placeholder="e.g., IT Consultation Inquiry"
          disabled={isSubmitting}
        />
      </label>

      <label>
        Your Message
        <textarea
          name="message"
          value={formData.message}
          onChange={handleInputChange}
          placeholder="Describe your project or question here..."
          rows={4}
          required
          disabled={isSubmitting}
        />
      </label>

      <button
        type="submit"
        className={`contact__form-btn ${isSubmitting ? 'contact__form-btn--loading' : ''}`}
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Sending...' : 'Send Message'}
      </button>
    </form>
  );
};