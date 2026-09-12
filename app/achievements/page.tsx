'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Sidebar } from '../../components/navigation/Sidebar';
import { Header } from '../../components/navigation/Header';
import { Trophy, Lock, CheckCircle2, Star, Flame, Award, Shield } from 'lucide-react';
import { getDashboardData } from '../../lib/queries/dashboard';
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
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const achievements = [
    {
      id: 'ach-1',
      title: 'First Step',
      description: 'Complete your first quest.',
      category: 'Beginner',
      unlocked: true,
      unlockedAt: 'Sep 1, 2026',
      icon: Star,
    },
    {
      id: 'ach-2',
      title: 'Week Warrior',
      description: 'Maintain a 7-day streak.',
      category: 'Streak',
      unlocked: true,
      unlockedAt: 'Sep 7, 2026',
      icon: Flame,
    },
    {
      id: 'ach-3',
      title: 'Getting Serious',
      description: 'Reach Level 10.',
      category: 'Level',
      unlocked: true,
      unlockedAt: 'Sep 10, 2026',
      icon: Trophy,
    },
    {
      id: 'ach-4',
      title: 'Discipline Master',
      description: 'Complete 25 Discipline quests.',
      category: 'Attributes',
      unlocked: false,
      progress: '15 / 25',
      icon: Shield,
    },
    {
      id: 'ach-5',
      title: 'Polymath',
      description: 'Reach score 10 in all 4 attributes.',
      category: 'Attributes',
      unlocked: false,
      progress: '3 / 4',
      icon: Award,
    },
    {
      id: 'ach-6',
      title: 'Gold Hoarder',
      description: 'Accumulate 1,000 total Gold.',
      category: 'Economy',
      unlocked: false,
      progress: '680 / 1,000',
      icon: Star,
    },
  ];

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
              <span className="tabular-nums">{unlockedCount} of {achievements.length} Unlocked</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {achievements.map((ach) => {
              const Icon = ach.icon;

              return (
                <div
                  key={ach.id}
                  className={`border rounded-2xl p-5 shadow-xs flex flex-col justify-between space-y-4 transition-all ${
                    ach.unlocked
                      ? 'bg-white border-[#E6E6E8]'
                      : 'bg-[#F7F7F8] border-[#E6E6E8] opacity-75'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                          ach.unlocked
                            ? 'bg-[#FDF8EC] text-[#D9A441] border border-[#D9A441]/20'
                            : 'bg-white text-[#8B8B8B] border border-[#E6E6E8]'
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="text-sm font-bold text-[#070709]">{ach.title}</h4>
                          <span className="text-[10px] uppercase font-semibold text-[#8B8B8B] tracking-wider">
                            {ach.category}
                          </span>
                        </div>
                        <p className="text-xs text-[#60606C] mt-0.5 leading-relaxed">{ach.description}</p>
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-[#E6E6E8] flex items-center justify-between text-xs font-medium">
                    {ach.unlocked ? (
                      <span className="inline-flex items-center gap-1.5 text-[#668F72] font-semibold">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        Unlocked {ach.unlockedAt}
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 text-[#8B8B8B] tabular-nums">
                        <Lock className="w-3.5 h-3.5" />
                        Progress: {ach.progress || 'Locked'}
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
}
