'use client';

import React, { useState } from 'react';
import { Sidebar } from '../../components/navigation/Sidebar';
import { Header } from '../../components/navigation/Header';
import { Trophy, Lock, CheckCircle2, Star, Flame, Award, Shield } from 'lucide-react';

export default function AchievementsPage() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const [userStats] = useState({
    level: 12,
    currentXp: 2480,
    nextLevelXp: 3200,
    gold: 680,
    streak: 14,
    displayName: 'Dhruv',
  });

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
    <div className="min-h-screen bg-[#F3F1E8] text-[#20231F] flex flex-col lg:flex-row font-sans">
      <Sidebar
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        activeTab="achievements"
        userStats={userStats}
      />

      <main className="flex-1 lg:pl-60 min-w-0 flex flex-col min-h-screen">
        <Header
          userStats={userStats}
          onOpenMobileMenu={() => setIsMobileMenuOpen(true)}
        />

        <div className="p-4 sm:p-6 lg:p-8 max-w-6xl w-full mx-auto space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-[#20231F] tracking-tight">
                Achievements
              </h1>
              <p className="text-sm text-[#70736B] mt-1 font-medium">
                Milestones unlocked through real-world habit execution.
              </p>
            </div>

            <div className="flex items-center gap-2 px-3.5 py-2 bg-[#FFFDF7] border border-[#DFDDD2] rounded-xl shadow-2xs text-xs font-bold text-[#20231F]">
              <Trophy className="w-4 h-4 text-[#D9A441]" />
              <span>{unlockedCount} of {achievements.length} Unlocked</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {achievements.map((ach) => {
              const Icon = ach.icon;

              return (
                <div
                  key={ach.id}
                  className={`bg-[#FFFDF7] border rounded-2xl p-5 shadow-2xs flex flex-col justify-between space-y-4 transition-all ${
                    ach.unlocked
                      ? 'border-[#DFDDD2]'
                      : 'border-[#DFDDD2]/60 opacity-60 bg-[#F3F1E8]'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                          ach.unlocked
                            ? 'bg-[#FAF4E6] text-[#D9A441] border border-[#D9A441]/30'
                            : 'bg-[#DFDDD2]/40 text-[#70736B]'
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="text-sm font-extrabold text-[#20231F]">{ach.title}</h4>
                        <p className="text-xs text-[#70736B] mt-0.5">{ach.description}</p>
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-[#DFDDD2]/60 flex items-center justify-between text-xs font-medium text-[#70736B]">
                    {ach.unlocked ? (
                      <span className="inline-flex items-center gap-1.5 text-[#668F72] font-semibold">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        Unlocked {ach.unlockedAt}
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 text-[#70736B]">
                        <Lock className="w-3.5 h-3.5" />
                        {ach.progress || 'Locked'}
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
