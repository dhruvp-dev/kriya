'use client';

import React, { useEffect, useState } from 'react';
import { getDashboardData } from '../../lib/queries/dashboard';
import type { DashboardData } from '../../types/database.types';
import { Sidebar } from '../../components/navigation/Sidebar';
import { Header } from '../../components/navigation/Header';
import { Card } from '../../components/ui/Card';
import { Avatar } from '../../components/rpg/Avatar';
import { LevelBadge } from '../../components/rpg/LevelBadge';
import { StreakBadge } from '../../components/rpg/StreakBadge';
import { AttributeCard } from '../../components/rpg/AttributeCard';
import { ProgressBar } from '../../components/ui/ProgressBar';
import { getXpThreshold } from '../../lib/progression';

export default function CharacterPage() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    async function load() {
      const res = await getDashboardData();
      setData(res);
      setIsLoading(false);
    }
    load();
  }, []);

  if (isLoading || !data) {
    return (
      <div className="min-h-screen bg-[#161310] flex items-center justify-center">
        <span className="text-sm text-slate-400 font-semibold">Loading Character Sheet...</span>
      </div>
    );
  }

  const { profile, character, attributes } = data;
  const currentThreshold = getXpThreshold(character.level);
  const nextThreshold = getXpThreshold(character.level + 1);
  const currentXpProgress = Math.max(0, character.total_xp - currentThreshold);
  const xpSpan = Math.max(1, nextThreshold - currentThreshold);

  return (
    <div className="min-h-screen bg-[#161310] flex">
      <Sidebar isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />

      <div className="flex-1 lg:pl-64 flex flex-col min-w-0">
        <Header
          character={character}
          profile={profile}
          onToggleMobileMenu={() => setIsMobileMenuOpen(true)}
        />

        <main className="flex-1 p-4 lg:p-8 space-y-8 max-w-5xl w-full mx-auto">
          {/* Character Header Card */}
          <Card className="p-6 lg:p-8 border-slate-800 flex flex-col md:flex-row items-center gap-6">
            <Avatar config={profile.avatar_config} size="xl" className="shadow-2xl border-2 border-indigo-500/40" />

            <div className="flex-1 text-center md:text-left space-y-2">
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
                <h1 className="text-3xl font-black text-slate-100">{profile.display_name}</h1>
                <LevelBadge level={character.level} size="md" />
                <StreakBadge currentStreak={character.current_streak} longestStreak={character.longest_streak} size="md" />
              </div>

              <p className="text-xs text-slate-400">
                Timezone: <span className="font-semibold text-slate-300">{profile.timezone}</span> |
                Leaderboard: <span className="font-semibold text-slate-300">{profile.leaderboard_visible ? 'Visible (Opt-in)' : 'Hidden'}</span>
              </p>

              <div className="pt-3 max-w-md">
                <ProgressBar
                  value={currentXpProgress}
                  max={xpSpan}
                  label={`Level ${character.level} Progression`}
                  subLabel={`${character.total_xp} / ${nextThreshold} XP`}
                  colorClass="bg-purple-500"
                  showPercentage
                />
              </div>
            </div>
          </Card>

          {/* 4 Attributes Breakdown */}
          <section className="space-y-4">
            <h2 className="text-lg font-bold text-slate-100">Attribute Distribution</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <AttributeCard type="strength" value={attributes.strength} />
              <AttributeCard type="intellect" value={attributes.intellect} />
              <AttributeCard type="discipline" value={attributes.discipline} />
              <AttributeCard type="creativity" value={attributes.creativity} />
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
