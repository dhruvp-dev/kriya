import React from 'react';
import Link from 'next/link';
import { KriyaLogo } from '../ui/KriyaLogo';
import { ArrowUpRight } from '@phosphor-icons/react/dist/ssr';

export function LandingFooter() {
  const productLinks = [
    { label: 'How it works', href: '#how-it-works' },
    { label: 'Progression', href: '#progression' },
    { label: 'Character', href: '#character' },
    { label: 'Rewards', href: '#rewards' },
  ];

  const appLinks = [
    { label: 'Dashboard', href: '/dashboard' },
    { label: 'Quests', href: '/quests' },
    { label: 'Character', href: '/character' },
    { label: 'Achievements', href: '/achievements' },
    { label: 'Shop', href: '/shop' },
    { label: 'Settings', href: '/settings' },
  ];

  const authLinks = [
    { label: 'Log in', href: '/login' },
    { label: 'Sign up', href: '/signup' },
  ];

  return (
    <footer className="bg-[#FFFFFF] border-t border-[#E6E6E8] py-16 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-12 border-b border-[#E6E6E8]">
          {/* Brand Info */}
          <div className="md:col-span-5 space-y-4">
            <KriyaLogo variant="primary" size={28} showTagline={false} />
            <p className="text-xs text-[#60606C] max-w-sm leading-relaxed">
              KRIYA is a modern productivity application that turns real-world actions into visible character progression.
            </p>

            <div className="pt-2">
              <a
                href="https://dhruvp.tech"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#070709] hover:text-[#C85A3D] transition-colors group"
              >
                <span>Built by Dhruv</span>
                <span className="text-[#8B8B8B] font-normal group-hover:text-[#C85A3D]">(dhruvp.tech)</span>
                <ArrowUpRight weight="bold" className="w-3 h-3 text-[#8B8B8B] group-hover:text-[#C85A3D] transition-colors" />
              </a>
            </div>
          </div>

          {/* Product Links */}
          <div className="md:col-span-3 space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-[#070709]">
              Product
            </div>
            <ul className="space-y-2 text-xs text-[#60606C]">
              {productLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="hover:text-[#070709] transition-colors py-0.5 block"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* App Surfaces */}
          <div className="md:col-span-2 space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-[#070709]">
              Surfaces
            </div>
            <ul className="space-y-2 text-xs text-[#60606C]">
              {appLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="hover:text-[#070709] transition-colors py-0.5 block"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Account */}
          <div className="md:col-span-2 space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-[#070709]">
              Account
            </div>
            <ul className="space-y-2 text-xs text-[#60606C]">
              {authLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="hover:text-[#070709] transition-colors py-0.5 block"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-[#8B8B8B] gap-4">
          <p>
            &copy; {new Date().getFullYear()} KRIYA. Turn action into progress.
          </p>
          <div className="text-[11px] font-semibold text-[#8B8B8B]">
            Plus Jakarta Sans · Pure Vector Blobs · Deterministic XP
          </div>
        </div>
      </div>
    </footer>
  );
}
