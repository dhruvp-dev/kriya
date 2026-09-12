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
            ? 'bg-[#FFFFFF] text-[#171A21] border border-[#E5E1D9] shadow-2xs font-bold'
            : 'text-[#686C73] hover:text-[#171A21] hover:bg-[#EAE6DE]'
        )}
      >
        {/* Thin Electric Coral Rail */}
        {isCurrent && (
          <span className="absolute left-0 top-1.5 bottom-1.5 w-1 bg-[#F05A3C] rounded-r-full" />
        )}

        <Icon
          className={cn(
            'w-4 h-4 stroke-[1.8]',
            isCurrent ? 'text-[#F05A3C]' : 'text-[#686C73]'
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
          className="fixed inset-0 z-40 bg-[#171A21]/20 backdrop-blur-xs lg:hidden"
        />
      )}

      {/* Retro-Product Navigation Rail */}
      <aside
        className={cn(
          'fixed top-0 left-0 z-40 h-screen w-60 bg-[#F0ECE4] border-r border-[#E5E1D9] flex flex-col justify-between transition-transform duration-200 lg:translate-x-0 select-none font-sans',
          isOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        {/* Top Header & Brand */}
        <div className="p-4 flex flex-col h-full overflow-y-auto">
          {/* KRIYA Mark */}
          <div className="flex items-center justify-between px-2 py-2 mb-3">
            <Link
              href="/dashboard"
              className="flex items-center gap-3 group"
              onClick={() => onSelectTab && onSelectTab('home')}
            >
              {/* Deep Navy Geometric Mark with Coral Dot */}
              <div className="w-8 h-8 bg-[#202B3C] rounded-lg flex items-center justify-center text-white font-black text-sm tracking-wider group-hover:bg-[#F05A3C] transition-colors shadow-2xs relative">
                <span>K</span>
                <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-[#F05A3C] rounded-full border border-[#F0ECE4] group-hover:bg-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-base font-extrabold tracking-tight text-[#171A21] leading-none">
                  KRIYA
                </span>
                <span className="text-[10px] font-bold text-[#686C73] tracking-wider uppercase mt-1">
                  LIFE RPG
                </span>
              </div>
            </Link>

            {onClose && (
              <button
                onClick={onClose}
                className="lg:hidden p-1 text-[#686C73] hover:text-[#171A21] rounded-md"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          <div className="border-t border-[#E5E1D9] my-2" />

          {/* Group 1: Primary Consumer Navigation */}
          <nav className="space-y-0.5">
            {PRIMARY_NAV.map(renderNavItem)}
          </nav>

          <div className="border-t border-[#E5E1D9] my-2.5" />

          {/* Group 2: Secondary Features */}
          <nav className="space-y-0.5">
            {SECONDARY_NAV.map(renderNavItem)}
          </nav>

          <div className="border-t border-[#E5E1D9] my-2.5" />

          {/* Group 3: System Settings */}
          <nav className="space-y-0.5 flex-1">
            {TERTIARY_NAV.map(renderNavItem)}
          </nav>

          {/* Bottom Identity Block */}
          <div className="pt-3 border-t border-[#E5E1D9] mt-auto">
            <div className="p-3 rounded-xl bg-[#FFFFFF] border border-[#E5E1D9] shadow-2xs space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 min-w-0">
                  {/* Status dot */}
                  <span className="w-2 h-2 rounded-full bg-[#2E9B72] shrink-0" />
                  <span className="text-xs font-bold text-[#171A21] truncate">
                    {userStats.displayName}
                  </span>
                </div>

                <span className="text-xs font-semibold text-[#686C73]">
                  Level {userStats.level}
                </span>
              </div>

              {/* Progress Bar (Warm Amber #FFB547) */}
              <div className="space-y-1">
                <div className="h-1.5 w-full bg-[#F7F5F0] border border-[#E5E1D9] rounded-full overflow-hidden p-0.5">
                  <div
                    className="h-full bg-[#FFB547] rounded-full transition-all duration-500"
                    style={{ width: `${xpPercent}%` }}
                  />
                </div>
                <div className="flex justify-between text-[9px] text-[#686C73] font-technical font-medium">
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
