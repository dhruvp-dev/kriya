'use client';

import React, { useEffect, useState } from 'react';
import { Trophy, Lock, CheckCircle2 } from 'lucide-react';
import { Coins, Sparkle } from '@phosphor-icons/react';
import type { AchievementWithStatus } from '../../lib/queries/achievements';
import { getAchievementsData } from '../../lib/queries/achievements';
import { getDashboardData } from '../../lib/queries/dashboard';
import { Sidebar } from '../../components/navigation/Sidebar';
import { Header } from '../../components/navigation/Header';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';

export default function AchievementsPage() {
  const [achievements, setAchievements] = useState<AchievementWithStatus[]>([]);
  const [characterData, setCharacterData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    async function load() {
      const [achList, dashRes] = await Promise.all([
        getAchievementsData(),
        getDashboardData(),
      ]);
      setAchievements(achList);
      setCharacterData(dashRes);
      setIsLoading(false);
    }
    load();
  }, []);

  const unlockedCount = achievements.filter((a) => a.unlocked).length;

  return (
    <div className="min-h-screen bg-[#0B0F19] flex">
      <Sidebar isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />

      <div className="flex-1 lg:pl-64 flex flex-col min-w-0">
        <Header
          character={characterData?.character}
          profile={characterData?.profile}
          onToggleMobileMenu={() => setIsMobileMenuOpen(true)}
        />

        <main className="flex-1 p-4 lg:p-8 space-y-6 max-w-7xl w-full mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-black text-slate-100">Hero Achievements</h1>
              <p className="text-xs text-slate-400">
                Unlock milestone achievements through your real-world progression.
              </p>
            </div>

            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-purple-500/10 border border-purple-500/30 text-purple-300 text-sm font-bold">
              <Trophy className="w-4 h-4 text-purple-400" />
              <span>
                {unlockedCount} / {achievements.length} Unlocked
              </span>
            </div>
          </div>

          {isLoading ? (
            <div className="py-12 text-center text-slate-400 text-sm">Loading Achievements...</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {achievements.map((ach) => (
                <Card
                  key={ach.id}
                  className={`p-5 flex flex-col justify-between border transition-all ${
                    ach.unlocked
                      ? 'bg-purple-950/20 border-purple-500/40 glow-xp'
                      : 'opacity-70 border-slate-800'
                  }`}
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Badge variant="default" className="uppercase text-[10px]">
                        {ach.trigger_type.replace(/_/g, ' ')}
                      </Badge>

                      {ach.unlocked ? (
                        <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-400">
                          <CheckCircle2 className="w-4 h-4" /> Unlocked
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-xs font-semibold text-slate-500">
                          <Lock className="w-3.5 h-3.5" /> Locked
                        </span>
                      )}
                    </div>

                    <div>
                      <h3 className="text-base font-bold text-slate-100">{ach.name}</h3>
                      <p className="text-xs text-slate-400 line-clamp-2 mt-1">{ach.description}</p>
                    </div>
                  </div>

                  <div className="mt-5 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs font-bold">
                    <span className="text-slate-500">Threshold: {ach.threshold}</span>

                    <div className="flex items-center gap-2">
                      {ach.reward_xp > 0 && (
                        <span className="text-purple-400 flex items-center gap-0.5">
                          <Sparkle weight="fill" size={12} /> +{ach.reward_xp} XP
                        </span>
                      )}
                      {ach.reward_gold > 0 && (
                        <span className="text-amber-400 flex items-center gap-0.5">
                          <Coins weight="fill" size={12} /> +{ach.reward_gold} G
                        </span>
                      )}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
