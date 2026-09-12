'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { List, X, ArrowRight } from '@phosphor-icons/react';
import { KriyaLogo } from '../../ui/KriyaLogo';

export function LandingNavbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'How It Works', href: '#how-it-works' },
    { label: 'The Loop', href: '#loop' },
    { label: 'Archetypes', href: '#archetypes' },
    { label: 'World', href: '#world' },
    { label: 'Quests', href: '#quests' },
    { label: 'Shelf', href: '#shelf' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-[#FAF8F5]/90 backdrop-blur-md border-b border-[#E8E1D3] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Mark */}
        <Link href="/" className="flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-[#1B4332]/40 rounded-sm">
          <KriyaLogo variant="navbar" size={28} showTagline={false} />
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-[#667770]">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="hover:text-[#192420] transition-colors duration-150"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Desktop Right Actions */}
        <div className="hidden md:flex items-center gap-4">
          <Link
            href="/login"
            className="text-sm font-medium text-[#667770] hover:text-[#192420] transition-colors px-2 py-1"
          >
            Log In
          </Link>

          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 bg-[#1B4332] hover:bg-[#133226] text-[#FAF8F5] font-semibold text-sm px-4 py-2 rounded-lg transition-all duration-150 shadow-sm active:scale-[0.98]"
          >
            <span>Start Your Journey</span>
            <ArrowRight weight="bold" className="w-4 h-4" />
          </Link>
        </div>

        {/* Mobile Hamburger Toggle */}
        <div className="flex md:hidden items-center gap-3">
          <Link
            href="/dashboard"
            className="bg-[#1B4332] hover:bg-[#133226] text-[#FAF8F5] text-xs font-semibold px-3 py-1.5 rounded-md"
          >
            Start
          </Link>

          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 text-[#192420] hover:bg-[#EFEBE1] rounded-md transition-colors"
            aria-label="Toggle Navigation Menu"
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <X weight="bold" className="w-5 h-5" /> : <List weight="bold" className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-[#FAF8F5] border-b border-[#E8E1D3] px-4 pt-3 pb-6 space-y-3 shadow-lg">
          <nav className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-base font-medium text-[#192420] hover:text-[#1B4332] py-2 border-b border-[#E8E1D3]/60"
              >
                {link.label}
              </a>
            ))}
            <Link
              href="/login"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-base font-medium text-[#667770] hover:text-[#192420] py-2"
            >
              Log In
            </Link>
          </nav>

          <div className="pt-2">
            <Link
              href="/dashboard"
              onClick={() => setIsMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 bg-[#1B4332] text-[#FAF8F5] font-semibold text-base py-3 rounded-lg"
            >
              <span>Start Your Journey</span>
              <ArrowRight weight="bold" className="w-4 h-4" />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
