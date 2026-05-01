'use client';

export const EMAILJS_CONFIG = {
  serviceId: 'your_service_id',
  templateId: 'your_template_id',
  publicKey: 'your_public_key',
};

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export async function sendContactEmail(data: ContactFormData): Promise<void> {
  const emailjs = await import('emailjs-com');
  await emailjs.send(EMAILJS_CONFIG.serviceId, EMAILJS_CONFIG.templateId, { from_name: data.name, from_email: data.email, subject: data.subject, message: data.message }, EMAILJS_CONFIG.publicKey);
}
