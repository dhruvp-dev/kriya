'use client';

import React from 'react';
import Link from 'next/link';
import { KriyaLogo } from '../ui/KriyaLogo';
import { ArrowUpRight } from 'lucide-react';

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
    <footer className="bg-[#F7F7F8] border-t border-[#E6E6E8] py-16 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main CTA Banner */}
        <div className="bg-white border border-[#E6E6E8] rounded-2xl p-8 sm:p-12 mb-16 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div className="space-y-2 max-w-xl">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#070709] tracking-tight">
              Start building visible daily momentum.
            </h2>
            <p className="text-sm text-[#60606C] leading-relaxed">
              Turn everyday focus, physical training, and deep work into tangible character progress.
            </p>
          </div>

          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 bg-[#070709] hover:bg-[#202025] text-white font-semibold text-sm px-6 py-3 rounded-xl shadow-xs transition-all active:scale-[0.98] shrink-0"
          >
            <span>Open Dashboard</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Footer Navigation Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-12 border-b border-[#E6E6E8]">
          {/* Brand Info & Built By Credit */}
          <div className="md:col-span-5 space-y-4">
            <KriyaLogo variant="primary" size={30} showTagline={true} />
            <p className="text-xs text-[#60606C] max-w-sm leading-relaxed">
              Premium aesthetic productivity SaaS paired with subtle RPG progression and distinctive blob avatars.
            </p>

            {/* Dhruv's Portfolio Link */}
            <div className="pt-1">
              <a
                href="https://dhruvp.tech"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3 py-1.5 bg-white border border-[#E6E6E8] text-[#070709] hover:text-[#C85A3D] hover:border-[#D0D1D4] text-xs font-semibold rounded-xl transition-all shadow-2xs group"
              >
                <span className="text-[#C85A3D] font-bold">BUILT BY DHRUV</span>
                <span className="text-[#60606C] group-hover:text-[#070709] transition-colors">dhruvp.tech</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-[#C85A3D] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            </div>
          </div>

          {/* Application Routes Links */}
          <div className="md:col-span-4 space-y-3">
            <div className="text-xs uppercase font-bold text-[#070709] tracking-wider">
              Application Surfaces
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs text-[#60606C]">
              {existingRoutes.map((route) => (
                <Link
                  key={route.href}
                  href={route.href}
                  className="hover:text-[#070709] transition-colors py-1"
                >
                  {route.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Account Links */}
          <div className="md:col-span-3 space-y-3">
            <div className="text-xs uppercase font-bold text-[#070709] tracking-wider">
              Account and Access
            </div>
            <div className="flex flex-col space-y-2 text-xs text-[#60606C]">
              <Link href="/login" className="hover:text-[#070709] transition-colors py-0.5">
                Sign In
              </Link>
              <Link href="/dashboard" className="hover:text-[#070709] transition-colors py-0.5">
                App Dashboard
              </Link>
              <Link href="/settings" className="hover:text-[#070709] transition-colors py-0.5">
                Preferences
              </Link>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#8B8B8B] gap-4">
          <div className="flex items-center gap-2">
            <span>&copy; 2026 KRIYA. Crafted with care by</span>
            <a
              href="https://dhruvp.tech"
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-[#070709] hover:text-[#C85A3D] underline underline-offset-2 transition-colors"
            >
              Dhruv (dhruvp.tech)
            </a>
          </div>
          <div className="text-[11px] font-semibold text-[#8B8B8B]">
            Aesthetic SaaS × Habit Progression
          </div>
        </div>
      </div>
    </footer>
  );
}
