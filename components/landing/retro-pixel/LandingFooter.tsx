'use client';

import React from 'react';
import Link from 'next/link';
import { KriyaLogo } from '../../ui/KriyaLogo';
import { ArrowUpRight } from '@phosphor-icons/react';

export function LandingFooter() {
  const existingRoutes = [
    { label: 'Dashboard', href: '/dashboard' },
    { label: 'Quests', href: '/quests' },
    { label: 'Character', href: '/character' },
    { label: 'Shop', href: '/shop' },
    { label: 'Inventory', href: '/inventory' },
    { label: 'Leaderboard', href: '/leaderboard' },
    { label: 'Settings', href: '/settings' },
  ];

  return (
    <footer className="bg-[#FAF8F5] border-t border-[#E8E1D3] py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main CTA Banner */}
        <div className="bg-[#FFFFFF] border border-[#E8E1D3] rounded-2xl p-8 sm:p-12 mb-16 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div className="space-y-2 max-w-xl">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#192420] tracking-tight">
              YOUR NEXT LEVEL STARTS WITH ONE ACTION.
            </h2>
            <p className="text-base text-[#667770]">
              Turn everyday moments into progress. No roleplay, no noise. Just your life, made visible.
            </p>
          </div>

          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 bg-[#1B4332] hover:bg-[#133226] text-[#FAF8F5] font-semibold text-base px-6 py-3.5 rounded-lg shadow-sm transition-all active:scale-[0.98] shrink-0"
          >
            <span>Start Your Journey</span>
            <ArrowUpRight weight="bold" className="w-5 h-5" />
          </Link>
        </div>

        {/* Footer Navigation Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-12 border-b border-[#E8E1D3]">
          {/* Brand Info & Built By Credit */}
          <div className="md:col-span-5 space-y-4">
            <KriyaLogo variant="primary" size={32} showTagline={true} />
            <p className="text-sm text-[#667770] max-w-sm leading-relaxed">
              A calm productivity product wrapped in a warm illustrated pixel-art world. Turn the things you already do into quests and make your progress visible.
            </p>

            {/* Dhruv's Portfolio Link */}
            <div className="pt-2">
              <a
                href="https://dhruvp.tech"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#FFFFFF] border border-[#E8E1D3] text-[#192420] hover:text-[#1B4332] hover:border-[#1B4332] text-xs font-semibold rounded-md transition-all shadow-2xs group"
              >
                <span className="text-[#1B4332] font-bold">BUILT BY DHRUV</span>
                <span className="text-[#667770] group-hover:text-[#192420] transition-colors">dhruvp.tech</span>
                <ArrowUpRight weight="bold" className="w-3.5 h-3.5 text-[#1B4332] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            </div>
          </div>

          {/* Application Routes Links */}
          <div className="md:col-span-4 space-y-3">
            <div className="text-xs font-technical uppercase font-bold text-[#192420] tracking-wider">
              APPLICATION SURFACES
            </div>
            <div className="grid grid-cols-2 gap-2 text-sm text-[#667770]">
              {existingRoutes.map((route) => (
                <Link
                  key={route.href}
                  href={route.href}
                  className="hover:text-[#192420] transition-colors py-1"
                >
                  {route.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Account Links */}
          <div className="md:col-span-3 space-y-3">
            <div className="text-xs font-technical uppercase font-bold text-[#192420] tracking-wider">
              ACCOUNT & ACCESS
            </div>
            <div className="flex flex-col space-y-2 text-sm text-[#667770]">
              <Link href="/login" className="hover:text-[#192420] transition-colors py-0.5">
                Log In
              </Link>
              <Link href="/signup" className="hover:text-[#192420] transition-colors py-0.5">
                Sign Up
              </Link>
              <Link href="/dashboard" className="hover:text-[#192420] transition-colors py-0.5">
                Open Dashboard
              </Link>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#667770] gap-4">
          <div className="flex items-center gap-2">
            <span>&copy; 2026 KRIYA. Crafted with care by</span>
            <a
              href="https://dhruvp.tech"
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-[#192420] hover:text-[#1B4332] underline underline-offset-2 transition-colors"
            >
              Dhruv (dhruvp.tech)
            </a>
          </div>
          <div className="font-technical text-[11px] text-[#667770]">
            MAKE TODAY COUNT
          </div>
        </div>

      </div>
    </footer>
  );
}
