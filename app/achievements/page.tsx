'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Sidebar } from '../../components/navigation/Sidebar';
import { Header } from '../../components/navigation/Header';
import {
  Trophy,
  Lock,
  CheckCircle2,
  Star,
  Flame,
  Award,
  Shield,
  Coins,
  Footprints,
  Sword,
  Zap,
} from 'lucide-react';
import { getDashboardData } from '../../lib/queries/dashboard';
import { getAchievementsData, AchievementDisplayItem } from '../../lib/queries/achievements';
import { getXpThreshold } from '../../lib/progression';

export default function AchievementsPage() {
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
  } | null>(null);

  const [achievements, setAchievements] = useState<AchievementDisplayItem[]>([]);

  const loadData = useCallback(async () => {
    try {
      setIsLoading(true);
      const [dashData, achData] = await Promise.all([
        getDashboardData(),
        getAchievementsData(),
      ]);

      if (dashData && dashData.character && dashData.profile) {
        const { character, profile } = dashData;
        const nextThreshold = getXpThreshold(character.level + 1);

        let avatarVariant = 'architect';
        if (profile.avatar_config) {
          try {
            const parsed =
              typeof profile.avatar_config === 'string'
                ? JSON.parse(profile.avatar_config)
                : profile.avatar_config;
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
      } else {
        setUserStats({
          level: 1,
          currentXp: 0,
          nextLevelXp: 100,
          gold: 0,
          streak: 0,
          displayName: 'Hero',
          avatarVariant: 'architect',
        });
      }

      setAchievements(achData || []);
    } catch {
      setUserStats({
        level: 1,
        currentXp: 0,
        nextLevelXp: 100,
        gold: 0,
        streak: 0,
        displayName: 'Hero',
        avatarVariant: 'architect',
      });
      setAchievements([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const getAchievementIcon = (iconName: string) => {
    switch (iconName) {
      case 'footsteps':
        return Footprints;
      case 'flame':
        return Flame;
      case 'star':
        return Star;
      case 'shield':
        return Shield;
      case 'sword':
        return Sword;
      case 'coins':
        return Coins;
      case 'zap':
        return Zap;
      case 'trophy':
        return Trophy;
      default:
        return Award;
    }
  };

  const unlockedCount = achievements.filter((a) => a.unlocked).length;

  return (
    <div className="min-h-screen bg-[#FFFFFF] text-[#070709] flex flex-col lg:flex-row font-sans">
      <Sidebar
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        activeTab="achievements"
        isLoading={isLoading}
        userStats={userStats || undefined}
      />

      <main className="flex-1 lg:pl-60 min-w-0 flex flex-col min-h-screen">
        <Header
          isLoading={isLoading}
          userStats={userStats || undefined}
          onOpenMobileMenu={() => setIsMobileMenuOpen(true)}
        />

        <div className="p-4 sm:p-6 lg:p-8 max-w-6xl w-full mx-auto space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-[#070709] tracking-tight">
                Achievements
              </h1>
              <p className="text-sm text-[#60606C] mt-1 font-medium">
                Milestones unlocked through real-world habit execution.
              </p>
            </div>

            <div className="flex items-center gap-2 px-3.5 py-2 bg-white border border-[#E6E6E8] rounded-xl shadow-xs text-xs font-semibold text-[#070709]">
              <Trophy className="w-4 h-4 text-[#D9A441]" />
              <span className="tabular-nums">
                {unlockedCount} of {achievements.length} Unlocked
              </span>
            </div>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div
                  key={i}
                  className="border border-[#E6E6E8] rounded-2xl p-5 bg-white space-y-4 animate-pulse"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#F3F4F5] shrink-0" />
                    <div className="space-y-2 flex-1 min-w-0">
                      <div className="h-4 w-28 bg-[#E6E6E8] rounded" />
                      <div className="h-3 w-40 bg-[#F3F4F5] rounded" />
                    </div>
                  </div>
                  <div className="h-3 w-20 bg-[#F3F4F5] rounded pt-2" />
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {achievements.map((ach) => {
                const Icon = getAchievementIcon(ach.icon_name);

                return (
                  <div
                    key={ach.id}
                    className={`border rounded-2xl p-5 shadow-xs flex flex-col justify-between space-y-4 transition-all ${
                      ach.unlocked
                        ? 'bg-white border-[#E6E6E8]'
                        : 'bg-[#F7F7F8] border-[#E6E6E8] opacity-75'
                    }`}
                  >
                    <div className="space-y-3">
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-start gap-3">
                          <div
                            className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 mt-0.5 ${
                              ach.unlocked
                                ? 'bg-[#FDF8EC] text-[#D9A441] border border-[#D9A441]/20'
                                : 'bg-white text-[#8B8B8B] border border-[#E6E6E8]'
                            }`}
                          >
                            <Icon className="w-5 h-5" />
                          </div>
                          <div className="min-w-0">
                            <div className="flex items-center gap-2">
                              <h4 className="text-sm font-bold text-[#070709] truncate">
                                {ach.title || ach.name}
                              </h4>
                              <span className="text-[10px] uppercase font-semibold text-[#8B8B8B] tracking-wider shrink-0">
                                {ach.category}
                              </span>
                            </div>
                            <p className="text-xs text-[#60606C] mt-0.5 leading-relaxed">
                              {ach.description}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Rewards row */}
                      <div className="flex items-center gap-2 text-[11px] font-semibold text-[#8B8B8B]">
                        <span>Reward:</span>
                        <span className="text-[#070709]">+{ach.reward_xp} XP</span>
                        <span>•</span>
                        <span className="text-[#D9A441]">+{ach.reward_gold} Gold</span>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-[#E6E6E8] flex items-center justify-between text-xs font-medium">
                      {ach.unlocked ? (
                        <span className="inline-flex items-center gap-1.5 text-[#668F72] font-semibold">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          {ach.unlocked_at || 'Unlocked'}
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 text-[#8B8B8B] tabular-nums font-medium">
                          <Lock className="w-3.5 h-3.5" />
                          Progress: {ach.progress}
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
