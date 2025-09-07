interface ContactFormData {
  name: string;
  email: string;
  subject?: string;
  message: string;
}

interface ContactFormResponse {
  success: boolean;
  message: string;
}

const FUNCTION_ENDPOINT = '/api/contact-form';

export async function submitContactForm(formData: ContactFormData): Promise<ContactFormResponse> {
  try {
    const response = await fetch(FUNCTION_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData)
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result: ContactFormResponse = await response.json();
    return result;
  } catch (error) {
    console.error('Error submitting contact form:', error);
    return {
      success: false,
      message: 'Network error. Please check your connection and try again.'
    };
  }
}

export function validateContactForm(formData: Partial<ContactFormData>): string | null {
  if (!formData.name?.trim()) {
    return 'Name is required';
  }

  if (!formData.email?.trim()) {
    return 'Email is required';
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(formData.email)) {
    return 'Please enter a valid email address';
  }

  if (!formData.message?.trim()) {
    return 'Message is required';
  }

  if (formData.message.length < 10) {
    return 'Message must be at least 10 characters long';
  }

  return null;
}