'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  CheckSquare,
  User,
  ShoppingBag,
  Package,
  Trophy,
  History,
  Award,
  Settings,
  LogOut,
  X,
} from 'lucide-react'; // Lucide for interface chrome per rule!
import { cn } from '../../lib/utils/cn';
import { signOutAction } from '../../lib/actions/auth';
import { useToast } from '../ui/Toast';

export interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

const NAV_ITEMS = [
  { label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { label: 'Quests', href: '/quests', icon: CheckSquare },
  { label: 'Character', href: '/character', icon: User },
  { label: 'Shop', href: '/shop', icon: ShoppingBag },
  { label: 'Inventory', href: '/inventory', icon: Package },
  { label: 'Achievements', href: '/achievements', icon: Trophy },
  { label: 'History', href: '/history', icon: History },
  { label: 'Leaderboard', href: '/leaderboard', icon: Award },
  { label: 'Settings', href: '/settings', icon: Settings },
];

export function Sidebar({ isOpen = false, onClose }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { showToast } = useToast();

  const handleSignOut = async () => {
    const res = await signOutAction();
    if (res.success) {
      showToast('Logged out successfully.', 'info');
      router.push('/login');
    } else {
      showToast(res.error || 'Failed to sign out.', 'error');
    }
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-40 bg-slate-950/80 backdrop-blur-sm lg:hidden"
        />
      )}

      <aside
        className={cn(
          'fixed top-0 left-0 z-40 h-screen w-64 glass-panel bg-slate-950/95 border-r border-slate-800 flex flex-col justify-between transition-transform duration-300 lg:translate-x-0',
          isOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <div className="p-6">
          <div className="flex items-center justify-between pb-6 border-b border-slate-800/80">
            <Link href="/dashboard" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-500 flex items-center justify-center font-black text-white text-lg shadow-lg shadow-indigo-600/30">
                K
              </div>
              <span className="text-xl font-black tracking-tight text-slate-100">KRIYA</span>
            </Link>

            {onClose && (
              <button
                onClick={onClose}
                className="lg:hidden p-1.5 text-slate-400 hover:text-slate-200 rounded-lg hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>

          <nav className="mt-6 space-y-1.5">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onClose}
                  className={cn(
                    'flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all',
                    isActive
                      ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/25'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
                  )}
                >
                  <Icon className={cn('w-5 h-5', isActive ? 'text-white' : 'text-slate-400')} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="p-6 border-t border-slate-800/80">
          <button
            onClick={handleSignOut}
            className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-sm font-semibold text-rose-400 hover:bg-rose-500/10 transition-colors"
          >
            <LogOut className="w-5 h-5" />
            <span>Log Out</span>
          </button>
        </div>
      </aside>
    </>
  );
}
