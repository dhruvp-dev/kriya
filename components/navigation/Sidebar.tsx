'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  Home,
  CheckSquare,
  User,
  Trophy,
  ShoppingBag,
  Package,
  Award,
  History,
  Settings,
  X,
} from 'lucide-react';
import { cn } from '../../lib/utils/cn';
import { KriyaLogo } from '../ui/KriyaLogo';

export interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
  activeTab?: string;
  onSelectTab?: (tab: string) => void;
  userStats?: {
    level: number;
    currentXp: number;
    nextLevelXp: number;
    displayName: string;
  };
}

// Grouped Navigation Items (Consumer Product Taxonomy)
export const PRIMARY_NAV = [
  { id: 'home', label: 'Home', href: '/dashboard', icon: Home },
  { id: 'quests', label: 'Quests', href: '/quests', icon: CheckSquare },
  { id: 'character', label: 'Character', href: '/character', icon: User },
  { id: 'achievements', label: 'Achievements', href: '/achievements', icon: Trophy },
];

export const SECONDARY_NAV = [
  { id: 'shop', label: 'Shop', href: '/shop', icon: ShoppingBag },
  { id: 'inventory', label: 'Inventory', href: '/inventory', icon: Package },
  { id: 'leaderboard', label: 'Leaderboard', href: '/leaderboard', icon: Award },
  { id: 'history', label: 'History', href: '/history', icon: History },
];

export const TERTIARY_NAV = [
  { id: 'settings', label: 'Settings', href: '/settings', icon: Settings },
];

export function Sidebar({
  isOpen = false,
  onClose,
  activeTab = 'home',
  onSelectTab,
  userStats = {
    level: 12,
    currentXp: 2480,
    nextLevelXp: 3200,
    displayName: 'Dhruv',
  },
}: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();

  const xpPercent = Math.round((userStats.currentXp / userStats.nextLevelXp) * 100);

  const renderNavItem = (item: { id: string; label: string; href: string; icon: any }) => {
    const Icon = item.icon;
    const isCurrent = activeTab
      ? activeTab === item.id || (activeTab === 'dashboard' && item.id === 'home')
      : pathname === item.href || (pathname === '/' && item.id === 'home');

    return (
      <button
        key={item.id}
        onClick={() => {
          if (onSelectTab) {
            onSelectTab(item.id === 'home' ? 'home' : item.id);
          } else {
            router.push(item.href);
          }
          if (onClose) onClose();
        }}
        className={cn(
          'w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-semibold transition-all relative text-left',
          isCurrent
            ? 'bg-[#FFFDF7] text-[#20231F] border border-[#DFDDD2] shadow-2xs font-bold'
            : 'text-[#70736B] hover:text-[#20231F] hover:bg-[#EBE8DD]'
        )}
      >
        {/* Thin Terracotta Rail */}
        {isCurrent && (
          <span className="absolute left-0 top-1.5 bottom-1.5 w-1 bg-[#C85A3D] rounded-r-full" />
        )}

        <Icon
          className={cn(
            'w-4 h-4 stroke-[1.8]',
            isCurrent ? 'text-[#C85A3D]' : 'text-[#70736B]'
          )}
        />
        <span>{item.label}</span>
      </button>
    );
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-40 bg-[#20231F]/20 backdrop-blur-xs lg:hidden"
        />
      )}

      {/* Retro-Product Navigation Rail */}
      <aside
        className={cn(
          'fixed top-0 left-0 z-40 h-screen w-60 bg-[#EBE8DD] border-r border-[#DFDDD2] flex flex-col justify-between transition-transform duration-200 lg:translate-x-0 select-none font-sans',
          isOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        {/* Top Header & Brand */}
        <div className="p-4 flex flex-col h-full overflow-y-auto">
          {/* KRIYA Navbar Brand Mark */}
          <div className="flex items-center justify-between px-2 py-2 mb-3">
            <Link
              href="/dashboard"
              onClick={() => onSelectTab && onSelectTab('home')}
              className="group"
            >
              <KriyaLogo variant="navbar" size={28} />
            </Link>

            {onClose && (
              <button
                onClick={onClose}
                className="lg:hidden p-1 text-[#70736B] hover:text-[#20231F] rounded-md"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          <div className="border-t border-[#DFDDD2] my-2" />

          {/* Group 1: Primary Consumer Navigation */}
          <nav className="space-y-0.5">
            {PRIMARY_NAV.map(renderNavItem)}
          </nav>

          <div className="border-t border-[#DFDDD2] my-2.5" />

          {/* Group 2: Secondary Features */}
          <nav className="space-y-0.5">
            {SECONDARY_NAV.map(renderNavItem)}
          </nav>

          <div className="border-t border-[#DFDDD2] my-2.5" />

          {/* Group 3: System Settings */}
          <nav className="space-y-0.5 flex-1">
            {TERTIARY_NAV.map(renderNavItem)}
          </nav>

          {/* Bottom Identity Block */}
          <div className="pt-3 border-t border-[#DFDDD2] mt-auto">
            <div className="p-3 rounded-xl bg-[#FFFDF7] border border-[#DFDDD2] shadow-2xs space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 min-w-0">
                  {/* Status dot */}
                  <span className="w-2 h-2 rounded-full bg-[#668F72] shrink-0" />
                  <span className="text-xs font-bold text-[#20231F] truncate">
                    {userStats.displayName}
                  </span>
                </div>

                <span className="text-xs font-semibold text-[#70736B]">
                  Level {userStats.level}
                </span>
              </div>

              {/* Progress Bar (Muted Ochre #D9A441) */}
              <div className="space-y-1">
                <div className="h-1.5 w-full bg-[#F3F1E8] border border-[#DFDDD2] rounded-full overflow-hidden p-0.5">
                  <div
                    className="h-full bg-[#D9A441] rounded-full transition-all duration-500"
                    style={{ width: `${xpPercent}%` }}
                  />
                </div>
                <div className="flex justify-between text-[9px] text-[#70736B] font-technical font-medium">
                  <span>{userStats.currentXp.toLocaleString()} XP</span>
                  <span>{xpPercent}%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
