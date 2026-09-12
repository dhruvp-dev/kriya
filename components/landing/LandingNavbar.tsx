'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, List, X } from '@phosphor-icons/react';
import { KriyaLogo } from '../ui/KriyaLogo';

export function LandingNavbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'How it works', href: '#how-it-works' },
    { label: 'Progression', href: '#progression' },
    { label: 'Character', href: '#character' },
    { label: 'Rewards', href: '#rewards' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-white/90 backdrop-blur-md border-b border-[#E6E6E8] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Left: Brand Mark */}
        <Link
          href="/"
          className="flex items-center gap-2.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#070709] rounded-lg"
          aria-label="KRIYA Home"
        >
          <KriyaLogo variant="navbar" size={26} showTagline={false} />
        </Link>

        {/* Center: Desktop Navigation Links */}
        <nav
          className="hidden md:flex items-center gap-8 text-sm font-medium text-[#60606C]"
          aria-label="Main Navigation"
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="hover:text-[#070709] transition-colors py-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#070709] rounded-md"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right: Desktop Actions */}
        <div className="hidden md:flex items-center gap-4">
          <Link
            href="/login"
            className="text-xs font-semibold text-[#60606C] hover:text-[#070709] transition-colors px-2 py-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#070709] rounded-md"
          >
            Log in
          </Link>

          <Link
            href="/signup"
            className="inline-flex items-center gap-1.5 bg-[#070709] hover:bg-[#202025] text-white font-semibold text-xs px-4 py-2 rounded-xl transition-all shadow-xs active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#070709] focus-visible:ring-offset-2"
          >
            <span>Start your journey</span>
            <ArrowRight weight="bold" className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Mobile Controls */}
        <div className="flex md:hidden items-center gap-2">
          <Link
            href="/signup"
            className="bg-[#070709] text-white text-xs font-semibold px-3 py-1.5 rounded-lg"
          >
            Start
          </Link>

          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 text-[#070709] hover:bg-[#F7F7F8] rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#070709]"
            aria-label="Toggle navigation menu"
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? (
              <X weight="bold" className="w-5 h-5" />
            ) : (
              <List weight="bold" className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-[#E6E6E8] px-4 pt-3 pb-6 space-y-4 shadow-md">
          <nav className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-sm font-medium text-[#070709] hover:text-[#C85A3D] py-2 border-b border-[#E6E6E8]/50"
              >
                {link.label}
              </a>
            ))}
            <Link
              href="/login"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-sm font-medium text-[#60606C] hover:text-[#070709] py-2"
            >
              Log in
            </Link>
          </nav>

          <div className="pt-2">
            <Link
              href="/signup"
              onClick={() => setIsMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 bg-[#070709] text-white font-semibold text-sm py-2.5 rounded-xl shadow-xs"
            >
              <span>Start your journey</span>
              <ArrowRight weight="bold" className="w-4 h-4" />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
