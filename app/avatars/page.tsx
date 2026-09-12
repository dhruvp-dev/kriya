'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Sidebar } from '../../components/navigation/Sidebar';
import { Header } from '../../components/navigation/Header';
import { AvatarGallery } from '../../components/avatars';
import { getDashboardData } from '../../lib/queries/dashboard';
import { getXpThreshold } from '../../lib/progression';

export default function AvatarsPage() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const [userStats, setUserStats] = useState<{
    level: number;
    currentXp: number;
    nextLevelXp: number;
    gold: number;
    streak: number;
    displayName: string;
    avatarVariant?: string;
  }>({
    level: 1,
    currentXp: 0,
    nextLevelXp: 100,
    gold: 0,
    streak: 0,
    displayName: 'Hero',
    avatarVariant: 'architect',
  });

  const loadData = useCallback(async () => {
    try {
      setIsLoading(true);
      const dashData = await getDashboardData();
      if (dashData && dashData.character && dashData.profile) {
        const { character, profile } = dashData;
        const nextThreshold = getXpThreshold(character.level + 1);

        let avatarVariant = 'architect';
        if (profile.avatar_config) {
          try {
            const parsed = typeof profile.avatar_config === 'string' ? JSON.parse(profile.avatar_config) : profile.avatar_config;
            if (parsed?.baseModel) avatarVariant = parsed.baseModel;
          } catch {}
        }

        setUserStats({
          level: character.level,
          currentXp: character.total_xp,
          nextLevelXp: nextThreshold,
          gold: character.gold,
          streak: character.current_streak,
          displayName: profile.display_name || 'Hero',
          avatarVariant,
        });
      }
    } catch {
      // Graceful fallback
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  return (
    <div className="min-h-screen bg-[#FFFFFF] text-[#070709] flex flex-col lg:flex-row font-sans">
      <Sidebar
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        activeTab="character"
        isLoading={isLoading}
        userStats={userStats}
      />

      <main className="flex-1 lg:pl-60 min-w-0 flex flex-col min-h-screen">
        <Header
          isLoading={isLoading}
          userStats={userStats}
          onOpenMobileMenu={() => setIsMobileMenuOpen(true)}
        />

        <div className="p-4 sm:p-6 lg:p-8 max-w-6xl w-full mx-auto space-y-6">
          <AvatarGallery />
        </div>
      </main>
    </div>
  );
}
