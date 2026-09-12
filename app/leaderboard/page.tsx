'use client';

import React, { useState } from 'react';
import { Sidebar } from '../../components/navigation/Sidebar';
import { Header } from '../../components/navigation/Header';
import { Award, Crown, Medal, Sparkles, UserCheck, Zap } from 'lucide-react';
import { Avatar, AvatarVariant } from '../../components/avatars';

export default function LeaderboardPage() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const [userStats] = useState({
    level: 12,
    currentXp: 2480,
    nextLevelXp: 3200,
    gold: 680,
    streak: 14,
    displayName: 'Dhruv',
  });

  const leaderboardEntries: {
    rank: number;
    name: string;
    variant: AvatarVariant;
    level: number;
    totalXp: number;
    isUser: boolean;
  }[] = [
    { rank: 1, name: 'Elena R.', variant: 'scholar', level: 18, totalXp: 7240, isUser: false },
    { rank: 2, name: 'Marcus K.', variant: 'strategist', level: 15, totalXp: 5410, isUser: false },
    { rank: 3, name: 'Dhruv', variant: 'architect', level: 12, totalXp: 2480, isUser: true },
    { rank: 4, name: 'Aria S.', variant: 'creator', level: 11, totalXp: 2150, isUser: false },
    { rank: 5, name: 'Kaelen M.', variant: 'builder', level: 9, totalXp: 1890, isUser: false },
  ];

  const renderRankBadge = (rank: number) => {
    switch (rank) {
      case 1:
        return (
          <span className="w-7 h-7 rounded-lg flex items-center justify-center bg-[#D9A441] text-white tabular-nums text-xs font-bold shrink-0 shadow-xs" title="1st Place">
            <Crown className="w-3.5 h-3.5 fill-white text-white" />
          </span>
        );
      case 2:
        return (
          <span className="w-7 h-7 rounded-lg flex items-center justify-center bg-[#344653] text-white tabular-nums text-xs font-bold shrink-0 shadow-xs" title="2nd Place">
            <Medal className="w-3.5 h-3.5 fill-white text-white" />
          </span>
        );
      case 3:
        return (
          <span className="w-7 h-7 rounded-lg flex items-center justify-center bg-[#C85A3D] text-white tabular-nums text-xs font-bold shrink-0 shadow-xs" title="3rd Place">
            <Medal className="w-3.5 h-3.5 fill-white text-white" />
          </span>
        );
      default:
        return (
          <span className="w-7 h-7 rounded-lg flex items-center justify-center bg-[#F7F7F8] text-[#60606C] border border-[#E6E6E8] tabular-nums text-xs font-bold shrink-0">
            {rank}
          </span>
        );
    }
  };

  return (
    <div className="min-h-screen bg-[#FFFFFF] text-[#070709] flex flex-col lg:flex-row font-sans">
      <Sidebar
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        activeTab="leaderboard"
        userStats={userStats}
      />

      <main className="flex-1 lg:pl-60 min-w-0 flex flex-col min-h-screen">
        <Header
          userStats={userStats}
          onOpenMobileMenu={() => setIsMobileMenuOpen(true)}
        />

        <div className="p-4 sm:p-6 lg:p-8 max-w-4xl w-full mx-auto space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-[#070709] tracking-tight">
                Leaderboard
              </h1>
              <p className="text-sm text-[#60606C] mt-1 font-medium">
                Community rankings of opted-in habit builders. Exposes Level and Total XP only.
              </p>
            </div>

            <div className="flex items-center gap-2 px-3.5 py-2 bg-white border border-[#E6E6E8] rounded-xl shadow-xs text-xs font-semibold text-[#070709]">
              <Award className="w-4 h-4 text-[#C85A3D]" />
              <span>Global Rankings</span>
            </div>
          </div>

          <div className="bg-white border border-[#E6E6E8] rounded-2xl shadow-xs overflow-hidden">
            <div className="px-6 py-3.5 border-b border-[#E6E6E8] bg-[#F7F7F8] flex items-center justify-between text-xs font-semibold text-[#60606C]">
              <span className="flex items-center gap-2 text-[#070709]">
                <Sparkles className="w-3.5 h-3.5 text-[#C85A3D]" />
                Standing
              </span>
              <span>Level & XP</span>
            </div>

            <div className="divide-y divide-[#E6E6E8]">
              {leaderboardEntries.map((entry) => (
                <div
                  key={entry.rank}
                  className={`px-6 py-4 flex items-center justify-between gap-4 transition-colors ${
                    entry.isUser ? 'bg-[#FDFBF7]' : 'hover:bg-[#F7F7F8]'
                  }`}
                >
                  <div className="flex items-center gap-4 min-w-0">
                    {renderRankBadge(entry.rank)}

                    <div className="relative shrink-0">
                      <Avatar variant={entry.variant} size={36} system="blob" />
                    </div>

                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-[#070709] truncate">
                          {entry.name}
                        </span>
                        {entry.isUser && (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#070709] text-white text-[10px] font-bold uppercase tracking-wider">
                            <UserCheck className="w-3 h-3" />
                            You
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-6 text-right shrink-0">
                    <div>
                      <span className="text-xs font-bold text-[#070709] flex items-center justify-end gap-1">
                        <Zap className="w-3.5 h-3.5 text-[#C85A3D] fill-[#C85A3D]" />
                        Level {entry.level}
                      </span>
                      <div className="text-[11px] tabular-nums font-medium text-[#8B8B8B]">
                        {entry.totalXp.toLocaleString()} XP
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
