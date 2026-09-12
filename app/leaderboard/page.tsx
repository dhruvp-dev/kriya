'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { Sidebar } from '../../components/navigation/Sidebar';
import { Header } from '../../components/navigation/Header';
import {
  Crown,
  Medal,
  Zap,
  Sparkles,
  UserCheck,
  TrendingUp,
  Eye,
  ArrowUpRight,
  Shield,
  Clock,
} from 'lucide-react';
import { Avatar, AvatarVariant } from '../../components/avatars';
import { getDashboardData } from '../../lib/queries/dashboard';
import { getXpThreshold } from '../../lib/progression';

interface LeaderboardUser {
  rank: number;
  name: string;
  variant: AvatarVariant;
  level: number;
  totalXp: number;
  isUser: boolean;
  roleTitle?: string;
  trend?: 'up' | 'down' | 'same' | 'new';
}

const ALL_TIME_DATA: LeaderboardUser[] = [
  { rank: 1, name: 'Elena R.', variant: 'scholar', level: 18, totalXp: 7240, isUser: false, roleTitle: 'The Scholar', trend: 'same' },
  { rank: 2, name: 'Marcus K.', variant: 'strategist', level: 15, totalXp: 5410, isUser: false, roleTitle: 'The Strategist', trend: 'same' },
  { rank: 3, name: 'Kaelen M.', variant: 'builder', level: 14, totalXp: 4380, isUser: false, roleTitle: 'The Builder', trend: 'up' },
  { rank: 4, name: 'Aria S.', variant: 'creator', level: 13, totalXp: 3920, isUser: false, roleTitle: 'The Creator', trend: 'up' },
  { rank: 5, name: 'Leo V.', variant: 'runner', level: 13, totalXp: 3450, isUser: false, roleTitle: 'The Runner', trend: 'same' },
  { rank: 6, name: 'Sophia T.', variant: 'explorer', level: 12, totalXp: 2890, isUser: false, roleTitle: 'The Explorer', trend: 'same' },
  { rank: 7, name: 'Alex N.', variant: 'maker', level: 12, totalXp: 2600, isUser: false, roleTitle: 'The Maker', trend: 'down' },
  { rank: 8, name: 'You', variant: 'architect', level: 1, totalXp: 0, isUser: true, roleTitle: 'The Architect', trend: 'up' },
  { rank: 9, name: 'Chloe W.', variant: 'creator', level: 11, totalXp: 2120, isUser: false, roleTitle: 'The Creator', trend: 'same' },
  { rank: 10, name: 'James P.', variant: 'strategist', level: 10, totalXp: 1840, isUser: false, roleTitle: 'The Strategist', trend: 'same' },
];

const WEEKLY_DATA: LeaderboardUser[] = [
  { rank: 1, name: 'Elena R.', variant: 'scholar', level: 18, totalXp: 880, isUser: false, roleTitle: 'The Scholar', trend: 'same' },
  { rank: 2, name: 'You', variant: 'architect', level: 1, totalXp: 0, isUser: true, roleTitle: 'The Architect', trend: 'up' },
  { rank: 3, name: 'Aria S.', variant: 'creator', level: 13, totalXp: 760, isUser: false, roleTitle: 'The Creator', trend: 'up' },
  { rank: 4, name: 'Marcus K.', variant: 'strategist', level: 15, totalXp: 620, isUser: false, roleTitle: 'The Strategist', trend: 'same' },
  { rank: 5, name: 'Leo V.', variant: 'runner', level: 13, totalXp: 580, isUser: false, roleTitle: 'The Runner', trend: 'same' },
  { rank: 6, name: 'Kaelen M.', variant: 'builder', level: 14, totalXp: 510, isUser: false, roleTitle: 'The Builder', trend: 'down' },
  { rank: 7, name: 'Sophia T.', variant: 'explorer', level: 12, totalXp: 450, isUser: false, roleTitle: 'The Explorer', trend: 'same' },
  { rank: 8, name: 'Alex N.', variant: 'maker', level: 12, totalXp: 390, isUser: false, roleTitle: 'The Maker', trend: 'same' },
];

export default function LeaderboardPage() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [timeFilter, setTimeFilter] = useState<'all_time' | 'weekly'>('all_time');
  const [isLoading, setIsLoading] = useState(true);

  const [userStats, setUserStats] = useState<{
    level: number;
    currentXp: number;
    nextLevelXp: number;
    gold: number;
    streak: number;
    displayName: string;
    avatarVariant: AvatarVariant;
    title: string;
  }>({
    level: 1,
    currentXp: 0,
    nextLevelXp: 100,
    gold: 0,
    streak: 0,
    displayName: 'Hero',
    avatarVariant: 'architect',
    title: 'Architect of Habits',
  });

  const loadData = useCallback(async () => {
    try {
      setIsLoading(true);
      const dashData = await getDashboardData();
      if (dashData && dashData.character && dashData.profile) {
        const { character, profile } = dashData;
        const nextThreshold = getXpThreshold(character.level + 1);

        let avatarVariant: AvatarVariant = 'architect';
        if (profile.avatar_config) {
          try {
            const parsed = typeof profile.avatar_config === 'string' ? JSON.parse(profile.avatar_config) : profile.avatar_config;
            if (parsed?.baseModel) avatarVariant = parsed.baseModel as AvatarVariant;
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
          title: 'Architect of Habits',
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

  const rawDataset = timeFilter === 'all_time' ? ALL_TIME_DATA : WEEKLY_DATA;
  const activeDataset = rawDataset.map((u) => {
    if (u.isUser) {
      return {
        ...u,
        name: userStats.displayName || 'You',
        variant: userStats.avatarVariant,
        level: userStats.level,
        totalXp: userStats.currentXp,
      };
    }
    return u;
  });

  // Podium players: #2 (index 1), #1 (index 0), #3 (index 2)
  const firstPlace = activeDataset[0];
  const secondPlace = activeDataset[1];
  const thirdPlace = activeDataset[2];

  // Current user item in dataset
  const currentUserEntry = activeDataset.find((u) => u.isUser) || {
    rank: 8,
    name: userStats.displayName,
    variant: 'architect' as AvatarVariant,
    level: userStats.level,
    totalXp: userStats.currentXp,
    isUser: true,
    roleTitle: 'The Architect',
  };

  // Find next higher ranked user to calculate difference
  const nextTargetRank = currentUserEntry.rank > 1 ? currentUserEntry.rank - 1 : 1;
  const targetUser = activeDataset.find((u) => u.rank === nextTargetRank);
  const xpDifference = targetUser && targetUser.totalXp > currentUserEntry.totalXp
    ? targetUser.totalXp - currentUserEntry.totalXp
    : 0;

  return (
    <div className="min-h-screen bg-[#FFFFFF] text-[#070709] flex flex-col lg:flex-row font-sans selection:bg-[#070709] selection:text-white">
      <Sidebar
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        activeTab="leaderboard"
        isLoading={isLoading}
        userStats={userStats}
      />

      <main className="flex-1 lg:pl-60 min-w-0 flex flex-col min-h-screen">
        <Header
          isLoading={isLoading}
          userStats={userStats}
          onOpenMobileMenu={() => setIsMobileMenuOpen(true)}
        />

        <div className="p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto space-y-8">
          {/* Header & Segmented Time Filter */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#E6E6E8] pb-6">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#C85A3D] mb-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                Community Momentum
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-[#070709] tracking-tight">
                Leaderboard
              </h1>
              <p className="text-sm text-[#60606C] mt-1 font-medium">
                See how your progress stacks up. A little friendly competition never hurts.
              </p>
            </div>

            {/* Time Filter Segmented Control */}
            <div className="flex items-center p-1 bg-[#F7F7F8] border border-[#E6E6E8] rounded-xl self-start sm:self-auto shadow-2xs">
              <button
                type="button"
                onClick={() => setTimeFilter('weekly')}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  timeFilter === 'weekly'
                    ? 'bg-[#070709] text-white shadow-xs'
                    : 'text-[#60606C] hover:text-[#070709]'
                }`}
              >
                Weekly
              </button>
              <button
                type="button"
                onClick={() => setTimeFilter('all_time')}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  timeFilter === 'all_time'
                    ? 'bg-[#070709] text-white shadow-xs'
                    : 'text-[#60606C] hover:text-[#070709]'
                }`}
              >
                All time
              </button>
            </div>
          </div>

          {/* Desktop 2-Column Composition: Main Area (~70%) + Your Position Panel (~30%) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* LEFT / MAIN AREA (lg:col-span-8) */}
            <div className="lg:col-span-8 space-y-8">
              {activeDataset.length === 0 ? (
                <div className="bg-white border border-[#E6E6E8] rounded-3xl p-12 text-center space-y-4 shadow-xs">
                  <div className="w-20 h-20 rounded-3xl bg-[#F7F7F8] border border-[#E6E6E8] flex items-center justify-center mx-auto">
                    <Avatar variant="architect" size={56} system="blob" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-lg font-bold text-[#070709]">No one has opted into the leaderboard yet</h3>
                    <p className="text-xs text-[#60606C] max-w-sm mx-auto leading-relaxed">
                      Be the first habit builder to make your daily progress visible on public community standings.
                    </p>
                  </div>
                  <Link
                    href="/settings"
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#070709] hover:bg-[#202025] text-white text-xs font-semibold rounded-xl shadow-xs transition-all cursor-pointer"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>Enable Leaderboard</span>
                  </Link>
                </div>
              ) : (
                <>
                  {/* VISUAL PODIUM SECTION */}
                  <section aria-label="Top 3 Leaderboard Podium" className="bg-[#FFFFFF] border border-[#E6E6E8] rounded-3xl p-6 sm:p-8 shadow-xs overflow-hidden">
                <div className="flex items-center justify-between border-b border-[#E6E6E8] pb-4 mb-8">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#D9A441]" />
                    <h2 className="text-xs font-bold uppercase tracking-wider text-[#60606C]">
                      Top 3 Performers
                    </h2>
                  </div>
                  <span className="text-[11px] font-semibold text-[#8B8B8B] flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    Updated daily
                  </span>
                </div>

                {/* Podium Stage Grid: #2 (Left) | #1 (Center, Dominant) | #3 (Right) */}
                <div className="grid grid-cols-3 gap-2 sm:gap-4 items-end max-w-2xl mx-auto pt-4">
                  
                  {/* #2 PODIUM COLUMN (SILVER / SLATE) */}
                  {secondPlace && (
                    <div className="flex flex-col items-center text-center group">
                      {/* Avatar & Badge */}
                      <div className="relative mb-3 flex flex-col items-center">
                        <div className="w-18 h-18 sm:w-22 sm:h-22 rounded-3xl bg-[#F7F7F8] border border-[#D0D1D4] flex items-center justify-center p-2 shadow-2xs group-hover:scale-105 transition-transform duration-300">
                          <Avatar variant={secondPlace.variant} size={64} system="blob" />
                        </div>
                        {/* Rank Pill */}
                        <div className="absolute -top-2.5 px-2.5 py-0.5 rounded-full bg-[#344653] text-white text-[10px] font-bold uppercase tracking-wider shadow-xs flex items-center gap-1">
                          <Medal className="w-3 h-3" />
                          <span>#2</span>
                        </div>
                      </div>

                      {/* Player Info */}
                      <div className="space-y-0.5 mb-3 w-full px-1">
                        <h3 className="text-xs sm:text-sm font-bold text-[#070709] truncate">
                          {secondPlace.name}
                        </h3>
                        <p className="text-[11px] text-[#60606C] font-medium">
                          Level {secondPlace.level}
                        </p>
                        <p className="text-xs font-bold text-[#344653] tabular-nums">
                          {secondPlace.totalXp.toLocaleString()} XP
                        </p>
                      </div>

                      {/* Elevated Podium Step (#2) */}
                      <div className="w-full h-24 sm:h-28 rounded-t-2xl bg-gradient-to-b from-[#F3F4F5] to-[#F7F7F8] border-t-2 border-x border-[#D0D1D4] flex flex-col items-center justify-center relative overflow-hidden shadow-2xs">
                        <span className="text-3xl sm:text-4xl font-extrabold text-[#344653]/20 tabular-nums select-none">
                          2
                        </span>
                        <div className="absolute bottom-2 text-[9px] font-bold text-[#60606C] uppercase tracking-widest">
                          Runner Up
                        </div>
                      </div>
                    </div>
                  )}

                  {/* #1 PODIUM COLUMN (GOLD / OCHRE - DOMINANT & TALLEST) */}
                  {firstPlace && (
                    <div className="flex flex-col items-center text-center group z-10">
                      {/* Avatar & Crown Badge */}
                      <div className="relative mb-3 flex flex-col items-center">
                        <div className="w-22 h-22 sm:w-28 sm:h-28 rounded-3xl bg-[#FDF8EC] border-2 border-[#D9A441]/50 flex items-center justify-center p-2 shadow-sm group-hover:scale-105 transition-transform duration-300">
                          <Avatar variant={firstPlace.variant} size={80} system="blob" />
                        </div>
                        {/* Crown Rank Pill */}
                        <div className="absolute -top-3 px-3 py-1 rounded-full bg-[#D9A441] text-white text-xs font-bold uppercase tracking-wider shadow-xs flex items-center gap-1">
                          <Crown className="w-3.5 h-3.5 fill-white" />
                          <span>#1</span>
                        </div>
                      </div>

                      {/* Player Info */}
                      <div className="space-y-0.5 mb-3 w-full px-1">
                        <div className="flex items-center justify-center gap-1">
                          <h3 className="text-sm sm:text-base font-extrabold text-[#070709] truncate">
                            {firstPlace.name}
                          </h3>
                          {firstPlace.isUser && (
                            <span className="px-1.5 py-0.5 rounded-full bg-[#070709] text-white text-[9px] font-bold uppercase">
                              You
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-[#60606C] font-medium">
                          Level {firstPlace.level}
                        </p>
                        <p className="text-sm font-extrabold text-[#D9A441] tabular-nums">
                          {firstPlace.totalXp.toLocaleString()} XP
                        </p>
                      </div>

                      {/* Elevated Podium Step (#1 - Highest) */}
                      <div className="w-full h-34 sm:h-40 rounded-t-2xl bg-gradient-to-b from-[#FDF8EC] to-[#F7F7F8] border-t-2 border-x border-[#D9A441]/40 flex flex-col items-center justify-center relative overflow-hidden shadow-xs">
                        <span className="text-4xl sm:text-5xl font-extrabold text-[#D9A441]/35 tabular-nums select-none">
                          1
                        </span>
                        <div className="absolute bottom-2 text-[10px] font-bold text-[#D9A441] uppercase tracking-widest">
                          Champion
                        </div>
                      </div>
                    </div>
                  )}

                  {/* #3 PODIUM COLUMN (BRONZE / TERRACOTTA) */}
                  {thirdPlace && (
                    <div className="flex flex-col items-center text-center group">
                      {/* Avatar & Badge */}
                      <div className="relative mb-3 flex flex-col items-center">
                        <div className="w-18 h-18 sm:w-22 sm:h-22 rounded-3xl bg-[#FDF4F2] border border-[#C85A3D]/30 flex items-center justify-center p-2 shadow-2xs group-hover:scale-105 transition-transform duration-300">
                          <Avatar variant={thirdPlace.variant} size={64} system="blob" />
                        </div>
                        {/* Rank Pill */}
                        <div className="absolute -top-2.5 px-2.5 py-0.5 rounded-full bg-[#C85A3D] text-white text-[10px] font-bold uppercase tracking-wider shadow-xs flex items-center gap-1">
                          <Medal className="w-3 h-3" />
                          <span>#3</span>
                        </div>
                      </div>

                      {/* Player Info */}
                      <div className="space-y-0.5 mb-3 w-full px-1">
                        <h3 className="text-xs sm:text-sm font-bold text-[#070709] truncate">
                          {thirdPlace.name}
                        </h3>
                        <p className="text-[11px] text-[#60606C] font-medium">
                          Level {thirdPlace.level}
                        </p>
                        <p className="text-xs font-bold text-[#C85A3D] tabular-nums">
                          {thirdPlace.totalXp.toLocaleString()} XP
                        </p>
                      </div>

                      {/* Elevated Podium Step (#3) */}
                      <div className="w-full h-20 sm:h-24 rounded-t-2xl bg-gradient-to-b from-[#FDF4F2] to-[#F7F7F8] border-t-2 border-x border-[#C85A3D]/30 flex flex-col items-center justify-center relative overflow-hidden shadow-2xs">
                        <span className="text-3xl sm:text-4xl font-extrabold text-[#C85A3D]/20 tabular-nums select-none">
                          3
                        </span>
                        <div className="absolute bottom-2 text-[9px] font-bold text-[#C85A3D] uppercase tracking-widest">
                          Bronze Tier
                        </div>
                      </div>
                    </div>
                  )}

                </div>
              </section>

              {/* RANKED LIST UNDERNEATH */}
              <section aria-label="Full Leaderboard Standings" className="bg-white border border-[#E6E6E8] rounded-3xl shadow-xs overflow-hidden">
                {/* Table Header Strip */}
                <div className="px-6 py-3.5 border-b border-[#E6E6E8] bg-[#F7F7F8] grid grid-cols-12 gap-4 text-xs font-bold text-[#60606C] uppercase tracking-wider">
                  <div className="col-span-2 sm:col-span-1">Rank</div>
                  <div className="col-span-7 sm:col-span-7">Builder</div>
                  <div className="hidden sm:block sm:col-span-2 text-right">Level</div>
                  <div className="col-span-3 sm:col-span-2 text-right">XP Earned</div>
                </div>

                {/* Table Rows */}
                <div className="divide-y divide-[#E6E6E8]">
                  {activeDataset.map((entry) => {
                    const isTopThree = entry.rank <= 3;
                    const formattedRank = entry.rank < 10 ? `0${entry.rank}` : `${entry.rank}`;

                    return (
                      <div
                        key={entry.rank}
                        className={`px-6 py-3.5 grid grid-cols-12 gap-4 items-center transition-colors ${
                          entry.isUser
                            ? 'bg-[#FDFBF7] border-l-[3px] border-l-[#C85A3D]'
                            : 'hover:bg-[#F7F7F8]'
                        }`}
                      >
                        {/* 1. Rank Column */}
                        <div className="col-span-2 sm:col-span-1 flex items-center">
                          {entry.rank === 1 ? (
                            <span className="w-6 h-6 rounded-md bg-[#FDF8EC] border border-[#D9A441]/30 text-[#D9A441] text-xs font-bold flex items-center justify-center tabular-nums">
                              01
                            </span>
                          ) : entry.rank === 2 ? (
                            <span className="w-6 h-6 rounded-md bg-[#F3F4F5] border border-[#D0D1D4] text-[#344653] text-xs font-bold flex items-center justify-center tabular-nums">
                              02
                            </span>
                          ) : entry.rank === 3 ? (
                            <span className="w-6 h-6 rounded-md bg-[#FDF4F2] border border-[#C85A3D]/20 text-[#C85A3D] text-xs font-bold flex items-center justify-center tabular-nums">
                              03
                            </span>
                          ) : (
                            <span className="text-xs font-semibold tabular-nums text-[#8B8B8B] pl-1">
                              {formattedRank}
                            </span>
                          )}
                        </div>

                        {/* 2. Builder Column (Avatar + Name + Role) */}
                        <div className="col-span-7 sm:col-span-7 flex items-center gap-3 min-w-0">
                          <div className="relative shrink-0">
                            <Avatar variant={entry.variant} size={34} system="blob" />
                          </div>

                          <div className="min-w-0">
                            <div className="flex items-center gap-2">
                              <span className={`text-sm font-bold truncate ${entry.isUser ? 'text-[#070709]' : 'text-[#070709]'}`}>
                                {entry.name}
                              </span>
                              {entry.isUser && (
                                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#070709] text-white text-[10px] font-bold uppercase tracking-wider shrink-0">
                                  <UserCheck className="w-3 h-3" />
                                  You
                                </span>
                              )}
                            </div>
                            <div className="text-[11px] text-[#60606C] truncate sm:hidden">
                              Level {entry.level}
                            </div>
                          </div>
                        </div>

                        {/* 3. Level Column (Desktop) */}
                        <div className="hidden sm:block sm:col-span-2 text-right">
                          <span className="text-xs font-semibold text-[#60606C] tabular-nums">
                            Level {entry.level}
                          </span>
                        </div>

                        {/* 4. Total XP Column */}
                        <div className="col-span-3 sm:col-span-2 text-right">
                          <span className={`text-xs font-bold tabular-nums ${isTopThree ? 'text-[#070709]' : 'text-[#070709]'}`}>
                            {entry.totalXp.toLocaleString()} XP
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </section>
            </>
          )}
        </div>

            {/* RIGHT SIDEBAR: "YOUR POSITION" PANEL (lg:col-span-4) */}
            <aside className="lg:col-span-4 space-y-5">
              
              {/* Main "Your Position" Sticky Card */}
              <div className="bg-white border border-[#E6E6E8] rounded-3xl p-6 shadow-xs space-y-6 sticky top-20">
                {/* Header Title */}
                <div className="flex items-center justify-between border-b border-[#E6E6E8] pb-4">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#60606C]">
                    Your Position
                  </span>
                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#668F72] px-2 py-0.5 bg-[#F2F7F4] rounded-md border border-[#668F72]/20">
                    <Eye className="w-3 h-3" />
                    Public
                  </span>
                </div>

                {/* Big Rank Display */}
                <div className="flex items-baseline justify-between">
                  <div>
                    <div className="text-[11px] font-bold uppercase text-[#8B8B8B] tracking-wider mb-0.5">
                      Current Standing
                    </div>
                    <div className="text-4xl sm:text-5xl font-extrabold text-[#070709] tracking-tight tabular-nums">
                      #{currentUserEntry.rank < 10 ? `0${currentUserEntry.rank}` : currentUserEntry.rank}
                    </div>
                  </div>

                  <div className="relative shrink-0">
                    <Avatar variant="architect" size={56} frame="gold" system="blob" />
                  </div>
                </div>

                {/* User Stats Summary */}
                <div className="p-4 bg-[#F7F7F8] rounded-2xl border border-[#E6E6E8] space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm font-bold text-[#070709]">{userStats.displayName}</div>
                      <div className="text-xs text-[#60606C]">{userStats.title}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs font-bold text-[#070709] tabular-nums">
                        Level {userStats.level}
                      </div>
                      <div className="text-xs text-[#C85A3D] font-bold tabular-nums">
                        {currentUserEntry.totalXp.toLocaleString()} XP
                      </div>
                    </div>
                  </div>

                  {/* Progress to Next Rank */}
                  {currentUserEntry.rank > 1 && (
                    <div className="space-y-1.5 pt-2 border-t border-[#E6E6E8]">
                      <div className="flex items-center justify-between text-xs text-[#60606C]">
                        <span className="font-semibold text-[#070709] flex items-center gap-1">
                          <TrendingUp className="w-3.5 h-3.5 text-[#C85A3D]" />
                          Overtake Target
                        </span>
                        <span className="tabular-nums font-medium text-[#C85A3D]">
                          +{xpDifference} XP to #{nextTargetRank}
                        </span>
                      </div>
                      <div className="h-1.5 w-full bg-white rounded-full overflow-hidden">
                        <div
                          className="h-full bg-[#070709] rounded-full transition-all duration-500"
                          style={{ width: `${Math.min(100, Math.max(20, 100 - (xpDifference / 2)))}%` }}
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* Streak Metric */}
                <div className="flex items-center justify-between px-4 py-3 bg-white border border-[#E6E6E8] rounded-2xl shadow-2xs text-xs">
                  <span className="flex items-center gap-2 font-semibold text-[#070709]">
                    <Zap className="w-3.5 h-3.5 text-[#C85A3D] fill-[#C85A3D]" />
                    Daily Consistency
                  </span>
                  <span className="tabular-nums font-bold text-[#070709]">
                    {userStats.streak} day streak
                  </span>
                </div>

                {/* Privacy & Reassurance Note */}
                <div className="space-y-2 pt-1 border-t border-[#E6E6E8]">
                  <p className="text-[11px] text-[#8B8B8B] leading-relaxed">
                    Only Level and Total XP are exposed publicly. Your daily quest logs, habits, and private notes remain completely confidential.
                  </p>
                  <Link
                    href="/settings"
                    className="inline-flex items-center gap-1 text-xs font-semibold text-[#070709] hover:text-[#C85A3D] transition-colors"
                  >
                    <span>Privacy Preferences</span>
                    <ArrowUpRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>

            </aside>

          </div>
        </div>
      </main>
    </div>
  );
}
