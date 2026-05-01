'use client';

import { Toaster } from 'react-hot-toast';

export default function ToastProvider() {
  return (
    <Toaster position="bottom-right" toastOptions={{ duration: 4000, style: { background: '#0f1117', color: '#e2e8f0', border: '1px solid rgba(79, 168, 216, 0.3)', borderRadius: '12px', padding: '12px 16px', fontSize: '14px', backdropFilter: 'blur(12px)' } }} />
  );
}
