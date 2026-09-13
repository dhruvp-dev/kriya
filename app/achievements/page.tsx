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
  Search,
  Sparkles,
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
      const [dashResult, achResult] = await Promise.allSettled([
        getDashboardData(),
        getAchievementsData(),
      ]);

      const dashData = dashResult.status === 'fulfilled' ? dashResult.value : null;
      const achData = achResult.status === 'fulfilled' ? achResult.value : [];

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

  const [searchQuery, setSearchQuery] = useState('');
  const [filterTab, setFilterTab] = useState<'all' | 'unlocked' | 'locked'>('all');

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
  const totalCount = achievements.length;
  const overallPercent = totalCount > 0 ? Math.round((unlockedCount / totalCount) * 100) : 0;

  const filteredAchievements = achievements.filter((ach) => {
    const matchesFilter =
      filterTab === 'all'
        ? true
        : filterTab === 'unlocked'
        ? ach.unlocked
        : !ach.unlocked;

    const query = searchQuery.trim().toLowerCase();
    const matchesQuery =
      query === '' ||
      (ach.title || ach.name).toLowerCase().includes(query) ||
      ach.description.toLowerCase().includes(query) ||
      ach.category.toLowerCase().includes(query);

    return matchesFilter && matchesQuery;
  });

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

        <div className="p-4 sm:p-6 lg:p-8 max-w-5xl w-full mx-auto space-y-6">
          {/* Header section */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-[#070709] tracking-tight">
                Achievements
              </h1>
              <p className="text-sm text-[#60606C] mt-1 font-medium">
                Milestones unlocked through real-world habit execution.
              </p>
            </div>

            <div className="flex items-center gap-3 px-4 py-2.5 bg-white border border-[#E6E6E8] rounded-xl shadow-xs text-xs font-semibold text-[#070709]">
              <Trophy className="w-4 h-4 text-[#D9A441]" />
              <span className="tabular-nums">
                {unlockedCount} of {totalCount} Unlocked ({overallPercent}%)
              </span>
            </div>
          </div>

          {/* Collection Progress Overview */}
          <div className="bg-[#F7F7F8] border border-[#E6E6E8] rounded-2xl p-4 sm:p-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2.5">
              <span className="text-xs font-bold text-[#070709] uppercase tracking-wider">
                Overall Milestone Progress
              </span>
              <span className="text-xs font-semibold text-[#60606C] tabular-nums">
                {unlockedCount} / {totalCount} Completed
              </span>
            </div>
            <div className="h-2 w-full bg-[#EBEBEF] rounded-full overflow-hidden">
              <div
                className="h-full bg-[#070709] rounded-full transition-all duration-700 ease-out"
                style={{ width: `${overallPercent}%` }}
              />
            </div>
          </div>

          {/* Filters & Search Toolbar */}
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 bg-[#F7F7F8] p-2.5 rounded-2xl border border-[#E6E6E8]">
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
              {(
                [
                  { id: 'all', label: 'All', count: totalCount },
                  { id: 'unlocked', label: 'Unlocked', count: unlockedCount },
                  { id: 'locked', label: 'In Progress', count: totalCount - unlockedCount },
                ] as const
              ).map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setFilterTab(tab.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all whitespace-nowrap cursor-pointer ${
                    filterTab === tab.id
                      ? 'bg-white text-[#070709] shadow-xs border border-[#E6E6E8]'
                      : 'text-[#60606C] hover:text-[#070709] hover:bg-white/60'
                  }`}
                >
                  <span>{tab.label}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-full tabular-nums ${
                      filterTab === tab.id
                        ? 'bg-[#070709] text-white'
                        : 'bg-[#E6E6E8] text-[#60606C]'
                    }`}
                  >
                    {tab.count}
                  </span>
                </button>
              ))}
            </div>

            <div className="relative min-w-[240px]">
              <Search className="w-4 h-4 text-[#8B8B8B] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search achievements..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3.5 py-1.5 bg-white border border-[#E6E6E8] rounded-xl text-xs text-[#070709] placeholder-[#8B8B8B] focus:outline-none focus:border-[#070709] transition-colors"
              />
            </div>
          </div>

          {/* Big List of Achievements */}
          {isLoading ? (
            <div className="space-y-3.5">
              {[1, 2, 3, 4, 5].map((i) => (
                <div
                  key={i}
                  className="border border-[#E6E6E8] rounded-2xl p-5 sm:p-6 bg-white flex flex-col md:flex-row md:items-center justify-between gap-4 animate-pulse"
                >
                  <div className="flex items-center gap-4 flex-1">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-[#F3F4F5] shrink-0" />
                    <div className="space-y-2 flex-1 max-w-md">
                      <div className="h-4 w-40 bg-[#E6E6E8] rounded" />
                      <div className="h-3 w-64 bg-[#F3F4F5] rounded" />
                      <div className="h-2 w-48 bg-[#F3F4F5] rounded pt-1" />
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-6 w-16 bg-[#F3F4F5] rounded-lg" />
                    <div className="h-6 w-16 bg-[#F3F4F5] rounded-lg" />
                  </div>
                </div>
              ))}
            </div>
          ) : filteredAchievements.length > 0 ? (
            <div className="space-y-3.5">
              {filteredAchievements.map((ach) => {
                const Icon = getAchievementIcon(ach.icon_name);

                // Parse progress numbers for visual progress bar
                const progressMatch = ach.progress.match(/(\d+)\s*\/\s*(\d+)/);
                let progressPercent = 0;
                if (ach.unlocked) {
                  progressPercent = 100;
                } else if (progressMatch) {
                  const curr = parseInt(progressMatch[1], 10);
                  const max = parseInt(progressMatch[2], 10);
                  progressPercent = max > 0 ? Math.min(100, Math.round((curr / max) * 100)) : 0;
                }

                return (
                  <div
                    key={ach.id}
                    className={`border rounded-2xl p-5 sm:p-6 shadow-xs transition-all flex flex-col md:flex-row md:items-center justify-between gap-5 ${
                      ach.unlocked
                        ? 'bg-white border-[#E6E6E8] hover:border-[#D0D1D4] hover:shadow-sm'
                        : 'bg-[#FAFAFB] border-[#EAEAEA] hover:border-[#D0D1D4]'
                    }`}
                  >
                    {/* Left: Icon and Achievement Details */}
                    <div className="flex items-start sm:items-center gap-4 sm:gap-5 flex-1 min-w-0">
                      <div
                        className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center shrink-0 transition-all ${
                          ach.unlocked
                            ? 'bg-[#FDF8EC] text-[#D9A441] border border-[#D9A441]/30 shadow-xs ring-4 ring-[#FDF8EC]/80'
                            : 'bg-white text-[#9E9EA7] border border-[#E6E6E8]'
                        }`}
                      >
                        <Icon className="w-6 h-6 sm:w-7 sm:h-7" />
                      </div>

                      <div className="flex-1 min-w-0">
                        {/* Title and Badges */}
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="text-base sm:text-lg font-bold text-[#070709] tracking-tight">
                            {ach.title || ach.name}
                          </h3>
                          <span className="text-[10px] font-semibold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#F3F4F5] text-[#60606C] border border-[#E6E6E8]">
                            {ach.category}
                          </span>
                          {ach.unlocked ? (
                            <span className="inline-flex items-center gap-1 text-[11px] font-bold text-[#52785C] bg-[#F2F7F4] px-2.5 py-0.5 rounded-full border border-[#668F72]/20">
                              <CheckCircle2 className="w-3.5 h-3.5" />
                              Unlocked
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 text-[11px] font-medium text-[#8B8B8B] bg-[#F3F4F5] px-2.5 py-0.5 rounded-full border border-[#E6E6E8]">
                              <Lock className="w-3 h-3" />
                              In Progress
                            </span>
                          )}
                        </div>

                        {/* Description */}
                        <p className="text-xs sm:text-sm text-[#60606C] mt-1 leading-relaxed">
                          {ach.description}
                        </p>

                        {/* Progress Bar & Status */}
                        <div className="mt-3 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 max-w-lg">
                          <div className="h-1.5 flex-1 bg-[#EBEBEF] rounded-full overflow-hidden">
                            <div
                              className={`h-full rounded-full transition-all duration-500 ${
                                ach.unlocked
                                  ? 'bg-[#668F72]'
                                  : 'bg-[#070709]'
                              }`}
                              style={{ width: `${progressPercent}%` }}
                            />
                          </div>
                          <span className="text-[11px] font-semibold text-[#8B8B8B] tabular-nums shrink-0">
                            {ach.unlocked
                              ? ach.unlocked_at
                                ? `Unlocked on ${ach.unlocked_at}`
                                : 'Completed'
                              : `${ach.progress} (${progressPercent}%)`}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Right: Rewards & Status Column */}
                    <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-3 shrink-0 pt-3 md:pt-0 border-t md:border-t-0 border-[#E6E6E8]">
                      <div className="flex items-center gap-2 text-xs font-bold tabular-nums">
                        <span className="px-2.5 py-1 bg-[#F7F7F8] border border-[#E6E6E8] rounded-lg text-[#070709] flex items-center gap-1 shadow-2xs">
                          <Sparkles className="w-3 h-3 text-[#C85A3D]" />
                          +{ach.reward_xp} XP
                        </span>
                        <span className="px-2.5 py-1 bg-[#FDF8EC] border border-[#D9A441]/25 rounded-lg text-[#D9A441] flex items-center gap-1 shadow-2xs">
                          <Coins className="w-3 h-3" />
                          +{ach.reward_gold} Gold
                        </span>
                      </div>

                      <div className="text-right">
                        {ach.unlocked ? (
                          <span className="inline-flex items-center gap-1 text-xs font-bold text-[#52785C]">
                            <CheckCircle2 className="w-4 h-4 text-[#668F72]" />
                            {ach.unlocked_at || 'Unlocked'}
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#8B8B8B]">
                            <Lock className="w-3.5 h-3.5" />
                            Locked
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="p-12 text-center bg-white border border-[#E6E6E8] rounded-2xl space-y-2">
              <Trophy className="w-8 h-8 text-[#8B8B8B] mx-auto opacity-50" />
              <h3 className="text-sm font-bold text-[#070709]">No achievements found</h3>
              <p className="text-xs text-[#8B8B8B]">
                Try adjusting your search query or filter settings.
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
