import './globals.css';
import type { Metadata } from 'next';
import { Inter, Poppins } from 'next/font/google';
import { Toaster } from 'react-hot-toast';
import Script from 'next/script';

const inter = Inter({ subsets: ['latin'] });
const poppins = Poppins({ subsets: ['latin'], weight: ['400'], variable: '--font-poppins' });

export const metadata: Metadata = {
  title: 'Sahan Danushka',
  description: '',
  openGraph: {
    images: [
      {
        url: 'https://bolt.new/static/og_default.png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    images: [
      {
        url: 'https://bolt.new/static/og_default.png',
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className={`${inter.className} ${poppins.variable}`}>
        <Script
          type="module"
          src="https://unpkg.com/@splinetool/viewer@1.12.90/build/spline-viewer.js"
          strategy="afterInteractive"
        />
        {children}
        <Toaster position="top-right" />
      </body>
    </html>
  );
}
