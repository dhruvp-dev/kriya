import React from 'react';
import type { Metadata } from 'next';
import './globals.css';
import { ToastProvider } from '../components/ui/Toast';

export const metadata: Metadata = {
  title: 'KRIYA — Daily Progress Engine',
  description: 'Turn real-life goals into daily achievements with a warm cozy retro-digital productivity system.',
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/brand/kriya-symbol.svg', type: 'image/svg+xml' },
    ],
    shortcut: '/favicon.svg',
    apple: '/brand/kriya-app-icon.svg',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="shortcut icon" href="/favicon.svg" />
        <link rel="apple-touch-icon" href="/brand/kriya-app-icon.svg" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-[#FAF9F6] text-[#1C1917] min-h-screen antialiased font-sans selection:bg-[#EA580C] selection:text-white">
        <ToastProvider>{children}</ToastProvider>
      </body>
    </html>
  );
}

