'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Menu, X } from 'lucide-react';
import { KriyaLogo } from '../ui/KriyaLogo';

export function LandingNavbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Product', href: '#preview' },
    { label: 'Archetypes', href: '#archetypes' },
    { label: 'Core Loop', href: '#loop' },
    { label: 'Philosophy', href: '#philosophy' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-[#E6E6E8] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Mark */}
        <Link href="/" className="flex items-center gap-2.5 focus:outline-none rounded-lg">
          <KriyaLogo variant="navbar" size={26} showTagline={false} />
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-[#60606C]">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="hover:text-[#070709] transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Desktop Right Actions */}
        <div className="hidden md:flex items-center gap-4">
          <Link
            href="/login"
            className="text-xs font-semibold text-[#60606C] hover:text-[#070709] transition-colors px-2 py-1"
          >
            Sign In
          </Link>

          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 bg-[#070709] hover:bg-[#202025] text-white font-semibold text-xs px-4 py-2 rounded-xl transition-all shadow-xs active:scale-[0.98]"
          >
            <span>Open Dashboard</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Mobile Hamburger Toggle */}
        <div className="flex md:hidden items-center gap-2.5">
          <Link
            href="/dashboard"
            className="bg-[#070709] text-white text-xs font-semibold px-3 py-1.5 rounded-xl"
          >
            Launch
          </Link>

          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 text-[#070709] hover:bg-[#F7F7F8] rounded-xl transition-colors cursor-pointer"
            aria-label="Toggle Navigation Menu"
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-[#E6E6E8] px-4 pt-3 pb-6 space-y-3 shadow-lg animate-fadeIn">
          <nav className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-sm font-semibold text-[#070709] hover:text-[#C85A3D] py-2 border-b border-[#E6E6E8]/60"
              >
                {link.label}
              </a>
            ))}
            <Link
              href="/login"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-sm font-semibold text-[#60606C] hover:text-[#070709] py-2"
            >
              Sign In
            </Link>
          </nav>

          <div className="pt-2">
            <Link
              href="/dashboard"
              onClick={() => setIsMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 bg-[#070709] text-white font-semibold text-sm py-3 rounded-xl shadow-xs"
            >
              <span>Open Dashboard</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
