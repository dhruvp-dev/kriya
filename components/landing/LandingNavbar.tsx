'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, List, X, Sparkle } from '@phosphor-icons/react';

export function LandingNavbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'How it works', href: '#how-it-works' },
    { label: 'Features', href: '#features' },
    { label: 'Progression', href: '#progression' },
    { label: 'FAQ', href: '#faq' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md border-b border-[#EBEBEF] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Left: Brand Logo (Lowercase kriya in Satoshi font, no icon) */}
        <Link
          href="/"
          className="flex items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1D64EC] rounded-lg group py-1"
          aria-label="kriya home"
        >
          <span className="font-satoshi font-bold text-2xl tracking-normal text-[#070709] lowercase">
            kriya
          </span>
        </Link>

        {/* Center: Desktop Navigation Links */}
        <nav
          className="hidden md:flex items-center gap-8 text-sm font-medium text-[#60606C] tracking-normal"
          aria-label="Main Navigation"
        >
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="hover:text-[#070709] transition-colors py-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1D64EC] rounded-md"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right: Desktop Actions */}
        <div className="hidden md:flex items-center gap-4">
          <Link
            href="/login"
            className="text-sm font-medium text-[#60606C] hover:text-[#070709] transition-colors px-2 py-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1D64EC] rounded-md tracking-normal"
          >
            Log in
          </Link>

          <Link
            href="/signup"
            className="inline-flex items-center gap-1.5 bg-[#1D64EC] hover:bg-[#1554C8] text-white font-medium text-sm px-5 py-2.5 rounded-xl transition-all shadow-sm active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1D64EC] focus-visible:ring-offset-2 tracking-normal"
          >
            <span>Start your journey</span>
            <ArrowRight weight="bold" className="w-4 h-4" />
          </Link>
        </div>

        {/* Mobile Controls */}
        <div className="flex md:hidden items-center gap-2">
          <Link
            href="/signup"
            className="bg-[#1D64EC] text-white text-xs font-medium px-3.5 py-1.5 rounded-lg"
          >
            Start
          </Link>

          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 text-[#070709] hover:bg-[#F7F7F8] rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1D64EC]"
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
        <div className="md:hidden bg-white border-b border-[#EBEBEF] px-4 pt-3 pb-6 space-y-4 shadow-md">
          <nav className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-sm font-medium text-[#070709] hover:text-[#1D64EC] py-2 border-b border-[#EBEBEF]/60"
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
              className="w-full flex items-center justify-center gap-2 bg-[#1D64EC] text-white font-medium text-sm py-2.5 rounded-xl shadow-sm"
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
