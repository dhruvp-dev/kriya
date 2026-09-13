import React from 'react';
import type { Metadata } from 'next';
import './globals.css';
import { ToastProvider } from '../components/ui/Toast';
import { DynamicTitle } from '../components/navigation/DynamicTitle';

export const metadata: Metadata = {
  title: {
    default: 'Dashboard | Kriya',
    template: '%s | Kriya',
  },
  description: 'Turn everyday actions into visible progress. Modern productivity software with character.',
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
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://api.fontshare.com/v2/css?f[]=satoshi@900,700,600,500,400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-[#FFFFFF] text-[#070709] min-h-screen antialiased font-sans selection:bg-[#070709] selection:text-[#FFFFFF]">
        <DynamicTitle />
        <ToastProvider>{children}</ToastProvider>
      </body>
    </html>
  );
}
