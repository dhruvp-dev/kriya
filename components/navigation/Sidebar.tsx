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
  History,
  Award,
  Settings,
  X,
} from 'lucide-react';
import { cn } from '../../lib/utils/cn';
import { KriyaLogo } from '../ui/KriyaLogo';
import { Avatar } from '../avatars/Avatar';

export interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
  activeTab?: string;
  onSelectTab?: (tab: string) => void;
  isLoading?: boolean;
  userStats?: {
    level: number;
    currentXp: number;
    nextLevelXp: number;
    displayName: string;
    avatarVariant?: string;
  };
}

export const MAIN_NAV = [
  { id: 'home', label: 'Home', href: '/dashboard', icon: Home },
  { id: 'quests', label: 'Quests', href: '/quests', icon: CheckSquare },
  { id: 'character', label: 'Character', href: '/character', icon: User },
  { id: 'achievements', label: 'Achievements', href: '/achievements', icon: Trophy },
  { id: 'shop', label: 'Shop', href: '/shop', icon: ShoppingBag },
  { id: 'inventory', label: 'Inventory', href: '/inventory', icon: Package },
];

export const SECONDARY_NAV = [
  { id: 'history', label: 'History', href: '/history', icon: History },
  { id: 'leaderboard', label: 'Leaderboard', href: '/leaderboard', icon: Award },
];

export const TERTIARY_NAV = [
  { id: 'settings', label: 'Settings', href: '/settings', icon: Settings },
];

export function Sidebar({
  isOpen = false,
  onClose,
  activeTab = 'home',
  onSelectTab,
  isLoading = false,
  userStats = {
    level: 1,
    currentXp: 0,
    nextLevelXp: 100,
    displayName: 'Hero',
    avatarVariant: 'architect',
  },
}: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();

  const stats = userStats || {
    level: 1,
    currentXp: 0,
    nextLevelXp: 100,
    displayName: 'Hero',
    avatarVariant: 'architect',
  };

  const xpPercent = Math.min(100, Math.round((stats.currentXp / (stats.nextLevelXp || 1)) * 100));

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
          'w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs transition-colors relative text-left font-medium',
          isCurrent
            ? 'bg-[#F3F4F5] text-[#070709] font-semibold'
            : 'text-[#60606C] hover:text-[#070709] hover:bg-[#F7F7F8]'
        )}
      >
        <Icon
          className={cn(
            'w-4 h-4 stroke-[1.75] shrink-0',
            isCurrent ? 'text-[#070709]' : 'text-[#8B8B8B]'
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
          className="fixed inset-0 z-40 bg-[#070709]/30 backdrop-blur-xs lg:hidden"
        />
      )}

      {/* Navigation Rail */}
      <aside
        className={cn(
          'fixed top-0 left-0 z-40 h-screen w-60 bg-[#FFFFFF] border-r border-[#E6E6E8] flex flex-col justify-between transition-transform duration-200 lg:translate-x-0 select-none font-sans',
          isOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <div className="p-4 flex flex-col h-full overflow-y-auto">
          {/* KRIYA Logo */}
          <div className="flex items-center justify-between px-2 py-2 mb-3">
            <Link
              href="/dashboard"
              onClick={() => onSelectTab && onSelectTab('home')}
              className="flex items-center gap-2.5"
            >
              <KriyaLogo variant="navbar" size={26} showTagline={false} />
            </Link>

            {onClose && (
              <button
                onClick={onClose}
                className="lg:hidden p-1 text-[#8B8B8B] hover:text-[#070709] rounded-md"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          <div className="border-t border-[#E6E6E8] my-2" />

          {/* Group 1: Primary Productivity Navigation */}
          <nav className="space-y-0.5">
            {MAIN_NAV.map(renderNavItem)}
          </nav>

          <div className="border-t border-[#E6E6E8] my-2.5" />

          {/* Group 2: Secondary Feeds */}
          <nav className="space-y-0.5">
            {SECONDARY_NAV.map(renderNavItem)}
          </nav>

          <div className="border-t border-[#E6E6E8] my-2.5" />

          {/* Group 3: Settings */}
          <nav className="space-y-0.5 flex-1">
            {TERTIARY_NAV.map(renderNavItem)}
          </nav>

          {/* Bottom Account / Character Summary */}
          <div className="pt-3 border-t border-[#E6E6E8] mt-auto">
            {isLoading ? (
              <div className="p-2.5 rounded-xl bg-[#F7F7F8] border border-[#E6E6E8] flex items-center gap-3 animate-pulse">
                <div className="w-8 h-8 rounded-full bg-[#E6E6E8] shrink-0" />
                <div className="flex-1 min-w-0 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <div className="h-3 w-16 bg-[#E6E6E8] rounded" />
                    <div className="h-3 w-8 bg-[#E6E6E8] rounded" />
                  </div>
                  <div className="h-1 w-full bg-[#E6E6E8] rounded-full" />
                </div>
              </div>
            ) : (
              <Link
                href="/character"
                className="p-2.5 rounded-xl bg-[#F7F7F8] hover:bg-[#F3F4F5] border border-[#E6E6E8] transition-colors flex items-center gap-3 group"
              >
                <Avatar
                  variant={(stats.avatarVariant as any) || 'architect'}
                  size={34}
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-[#070709] truncate">
                      {stats.displayName || 'Hero'}
                    </span>
                    <span className="text-[11px] font-semibold text-[#8B8B8B] tabular-nums">
                      Lv. {stats.level}
                    </span>
                  </div>
                  {/* Micro Progress Bar */}
                  <div className="h-1 w-full bg-[#E6E6E8] rounded-full overflow-hidden mt-1.5">
                    <div
                      className="h-full bg-[#070709] rounded-full transition-all duration-300"
                      style={{ width: `${xpPercent}%` }}
                    />
                  </div>
                </div>
              </Link>
            )}
          </div>
        </div>
      </aside>
    </>
  );
}
