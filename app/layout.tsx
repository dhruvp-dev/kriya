import React from 'react';
import type { Metadata } from 'next';
import './globals.css';
import { ToastProvider } from '../components/ui/Toast';

export const metadata: Metadata = {
  title: 'KRIYA — Productivity RPG Dashboard',
  description: 'Turn real-life tasks into quests, earn XP, level up attributes, and build habits in a retro-futuristic productivity interface.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
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

