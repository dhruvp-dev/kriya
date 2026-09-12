'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Sidebar } from '../../components/navigation/Sidebar';
import { Header } from '../../components/navigation/Header';
import { Search, Calendar, CheckCircle2, Coins, Sparkles } from 'lucide-react';
import { getDashboardData } from '../../lib/queries/dashboard';
import { getHistoryData } from '../../lib/queries/history';
import { getXpThreshold } from '../../lib/progression';

interface HistoryEntry {
  id: string;
  title: string;
  attribute: string;
  xp: number;
  gold: number;
  completedAt: string;
}

export default function HistoryPage() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
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

  const [historyEntries, setHistoryEntries] = useState<HistoryEntry[]>([]);

  const loadData = useCallback(async () => {
    try {
      setIsLoading(true);
      const [dashData, historyData] = await Promise.all([
        getDashboardData(),
        getHistoryData(),
      ]);

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

      if (historyData && historyData.length > 0) {
        setHistoryEntries(
          historyData.map((h) => ({
            id: h.id,
            title: h.quest_title || 'Completed Quest',
            attribute: h.attribute_increased || 'Discipline',
            xp: h.xp_gained,
            gold: h.gold_gained,
            completedAt: new Date(h.completed_at).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
            }),
          }))
        );
      } else if (dashData?.todayCompletedQuests && dashData.todayCompletedQuests.length > 0) {
        setHistoryEntries(
          dashData.todayCompletedQuests.map((q) => ({
            id: q.id,
            title: q.title,
            attribute: q.attribute || 'Discipline',
            xp: q.xp_reward || 20,
            gold: q.gold_reward || 5,
            completedAt: 'Today',
          }))
        );
      } else {
        setHistoryEntries([]);
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
      setHistoryEntries([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const filteredEntries = historyEntries.filter((e) =>
    e.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    e.attribute.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#FFFFFF] text-[#070709] flex flex-col lg:flex-row font-sans">
      <Sidebar
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        activeTab="history"
        isLoading={isLoading}
        userStats={userStats || undefined}
      />

      <main className="flex-1 lg:pl-60 min-w-0 flex flex-col min-h-screen">
        <Header
          isLoading={isLoading}
          userStats={userStats || undefined}
          onOpenMobileMenu={() => setIsMobileMenuOpen(true)}
        />

        <div className="p-4 sm:p-6 lg:p-8 max-w-4xl w-full mx-auto space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-[#070709] tracking-tight">
                Completion History
              </h1>
              <p className="text-sm text-[#60606C] mt-1 font-medium">
                Audit log of all completed quests and earned rewards.
              </p>
            </div>

            <div className="relative min-w-[240px]">
              <Search className="w-4 h-4 text-[#8B8B8B] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search history..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3.5 py-2 bg-[#F7F7F8] border border-[#E6E6E8] rounded-xl text-xs text-[#070709] placeholder-[#8B8B8B] focus:outline-none focus:border-[#070709] transition-colors"
              />
            </div>
          </div>

          <div className="bg-white border border-[#E6E6E8] rounded-2xl shadow-xs overflow-hidden">
            {isLoading ? (
              <div className="divide-y divide-[#E6E6E8]">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="p-4 sm:p-5 flex items-center justify-between animate-pulse">
                    <div className="flex items-center gap-3.5 flex-1 min-w-0">
                      <div className="w-8 h-8 rounded-full bg-[#F3F4F5] shrink-0" />
                      <div className="space-y-2 flex-1 min-w-0">
                        <div className="h-4 w-48 bg-[#E6E6E8] rounded" />
                        <div className="h-3 w-32 bg-[#F3F4F5] rounded" />
                      </div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <div className="h-6 w-16 bg-[#F3F4F5] rounded-lg" />
                      <div className="h-6 w-16 bg-[#F3F4F5] rounded-lg" />
                    </div>
                  </div>
                ))}
              </div>
            ) : filteredEntries.length > 0 ? (
              <div className="divide-y divide-[#E6E6E8]">
                {filteredEntries.map((entry) => (
                  <div
                    key={entry.id}
                    className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-[#F7F7F8] transition-colors"
                  >
                    <div className="flex items-center gap-3.5">
                      <div className="w-8 h-8 rounded-full bg-[#F2F7F4] text-[#668F72] flex items-center justify-center shrink-0 border border-[#668F72]/20">
                        <CheckCircle2 className="w-4 h-4" />
                      </div>

                      <div>
                        <h4 className="text-sm font-bold text-[#070709]">{entry.title}</h4>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className="text-xs font-semibold text-[#60606C]">
                            {entry.attribute}
                          </span>
                          <span className="text-xs text-[#D0D1D4]">•</span>
                          <span className="text-xs text-[#8B8B8B] flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {entry.completedAt}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-xs font-bold text-right self-end sm:self-center tabular-nums">
                      <span className="px-2.5 py-1 bg-[#F7F7F8] border border-[#E6E6E8] rounded-lg text-[#070709] flex items-center gap-1">
                        <Sparkles className="w-3 h-3 text-[#C85A3D]" />
                        +{entry.xp} XP
                      </span>
                      <span className="px-2.5 py-1 bg-[#FDF8EC] border border-[#D9A441]/20 rounded-lg text-[#D9A441] flex items-center gap-1">
                        <Coins className="w-3 h-3" />
                        +{entry.gold} Gold
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-12 text-center space-y-2">
                <CheckCircle2 className="w-8 h-8 text-[#8B8B8B] mx-auto" />
                <h3 className="text-sm font-bold text-[#070709]">No completed quests yet</h3>
                <p className="text-xs text-[#8B8B8B]">
                  Quests you mark as completed will appear here.
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
