'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

const ROUTE_TITLES: Record<string, string> = {
  '/dashboard': 'Dashboard | Kriya',
  '/quests': 'Quests | Kriya',
  '/achievements': 'Achievements | Kriya',
  '/character': 'Character | Kriya',
  '/shop': 'Shop | Kriya',
  '/inventory': 'Inventory | Kriya',
  '/history': 'History | Kriya',
  '/leaderboard': 'Leaderboard | Kriya',
  '/settings': 'Settings | Kriya',
  '/avatars': 'Avatars | Kriya',
  '/login': 'Sign In | Kriya',
  '/signup': 'Sign Up | Kriya',
  '/brand': 'Brand Guidelines | Kriya',
  '/dev/avatar-grid': 'Avatar Grid | Kriya',
};

export function DynamicTitle() {
  const pathname = usePathname();

  useEffect(() => {
    if (!pathname) return;

    if (pathname === '/') {
      document.title = 'Kriya — Turn Action Into Progress';
      return;
    }

    // Exact match
    if (ROUTE_TITLES[pathname]) {
      document.title = ROUTE_TITLES[pathname];
      return;
    }

    // Prefix match
    const matchingPrefix = Object.keys(ROUTE_TITLES).find(
      (route) => pathname.startsWith(route) && route !== '/'
    );

    if (matchingPrefix) {
      document.title = ROUTE_TITLES[matchingPrefix];
      return;
    }

    // Fallback: capitalize first segment
    const segment = pathname.split('/').filter(Boolean)[0];
    if (segment) {
      const formatted = segment.charAt(0).toUpperCase() + segment.slice(1);
      document.title = `${formatted} | Kriya`;
    } else {
      document.title = 'Kriya | Premium Productivity & Progression';
    }
  }, [pathname]);

  return null;
}
