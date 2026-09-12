'use client';

import React, { useState } from 'react';
import { Sidebar } from '../../components/navigation/Sidebar';
import { Header } from '../../components/navigation/Header';
import { Award, Shield, Sparkles, UserCheck } from 'lucide-react';

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

  const leaderboardEntries = [
    { rank: 1, name: 'Elena R.', avatar: '🧙‍♀️', level: 18, totalXp: 7240, isUser: false },
    { rank: 2, name: 'Marcus K.', avatar: '🥷', level: 15, totalXp: 5410, isUser: false },
    { rank: 3, name: 'Dhruv', avatar: '🧙‍♂️', level: 12, totalXp: 2480, isUser: true },
    { rank: 4, name: 'Aria S.', avatar: '🎨', level: 11, totalXp: 2150, isUser: false },
    { rank: 5, name: 'Kaelen M.', avatar: '🛡️', level: 9, totalXp: 1890, isUser: false },
  ];

  return (
    <div className="min-h-screen bg-[#F7F5F0] text-[#171A21] flex flex-col lg:flex-row font-sans">
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

        <div className="p-4 sm:p-6 lg:p-8 max-w-6xl w-full mx-auto space-y-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#171A21] tracking-tight">
              Leaderboard
            </h1>
            <p className="text-sm text-[#686C73] mt-1 font-medium">
              Community rankings of opted-in habit builders. Exposes Level and Total XP only.
            </p>
          </div>

          <div className="bg-white border border-[#E5E1D9] rounded-2xl shadow-2xs overflow-hidden">
            <div className="px-6 py-4 border-b border-[#E5E1D9] bg-[#FAF9F6] flex items-center justify-between">
              <span className="text-xs font-extrabold text-[#171A21] tracking-wider uppercase">
                Global Standings
              </span>
              <span className="text-xs text-[#686C73]">Opt-in via Settings</span>
            </div>

            <div className="divide-y divide-[#E5E1D9]">
              {leaderboardEntries.map((entry) => (
                <div
                  key={entry.rank}
                  className={`px-6 py-4 flex items-center justify-between gap-4 ${
                    entry.isUser ? 'bg-[#FFF8EC]/60' : 'hover:bg-[#FAF9F6]'
                  }`}
                >
                  <div className="flex items-center gap-4 min-w-0">
                    <span
                      className={`w-7 h-7 rounded-lg flex items-center justify-center font-technical text-xs font-bold shrink-0 ${
                        entry.rank === 1
                          ? 'bg-[#FFB547] text-white'
                          : entry.rank === 2
                          ? 'bg-[#202B3C] text-white'
                          : entry.rank === 3
                          ? 'bg-[#F05A3C] text-white'
                          : 'bg-[#F7F5F0] text-[#686C73] border border-[#E5E1D9]'
                      }`}
                    >
                      {entry.rank}
                    </span>

                    <div className="w-9 h-9 rounded-xl bg-[#202B3C] flex items-center justify-center text-lg shrink-0">
                      {entry.avatar}
                    </div>

                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-extrabold text-[#171A21] truncate">
                          {entry.name}
                        </span>
                        {entry.isUser && (
                          <span className="px-2 py-0.5 rounded-md bg-[#F05A3C] text-white text-[10px] font-extrabold uppercase">
                            You
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-6 text-right shrink-0">
                    <div>
                      <span className="text-xs font-extrabold text-[#171A21]">
                        Level {entry.level}
                      </span>
                      <div className="text-[10px] font-technical text-[#686C73]">
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
