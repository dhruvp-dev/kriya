'use client';

import React, { useState } from 'react';
import { Sidebar } from '../../components/navigation/Sidebar';
import { Header } from '../../components/navigation/Header';
import { Award, Crown, Medal, Shield, Sparkles, UserCheck, Zap } from 'lucide-react';

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

  const renderRankBadge = (rank: number) => {
    switch (rank) {
      case 1:
        return (
          <span className="w-8 h-8 rounded-lg flex items-center justify-center bg-[#D9A441] text-white font-technical text-xs font-bold shrink-0 shadow-2xs" title="1st Place - Crown Champion">
            <Crown className="w-4 h-4 fill-white text-white" />
          </span>
        );
      case 2:
        return (
          <span className="w-8 h-8 rounded-lg flex items-center justify-center bg-[#344653] text-white font-technical text-xs font-bold shrink-0 shadow-2xs" title="2nd Place - Runner Up">
            <Medal className="w-4 h-4 fill-white text-white" />
          </span>
        );
      case 3:
        return (
          <span className="w-8 h-8 rounded-lg flex items-center justify-center bg-[#C85A3D] text-white font-technical text-xs font-bold shrink-0 shadow-2xs" title="3rd Place - Bronze Champion">
            <Medal className="w-4 h-4 fill-white text-white" />
          </span>
        );
      default:
        return (
          <span className="w-8 h-8 rounded-lg flex items-center justify-center bg-[#F3F1E8] text-[#70736B] border border-[#DFDDD2] font-technical text-xs font-bold shrink-0">
            #{rank}
          </span>
        );
    }
  };

  return (
    <div className="min-h-screen bg-[#F3F1E8] text-[#20231F] flex flex-col lg:flex-row font-sans">
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
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-[#20231F] tracking-tight">
                Leaderboard
              </h1>
              <p className="text-sm text-[#70736B] mt-1 font-medium">
                Community rankings of opted-in habit builders. Exposes Level and Total XP only.
              </p>
            </div>

            <div className="flex items-center gap-2 px-3.5 py-2 bg-[#FFFDF7] border border-[#DFDDD2] rounded-xl shadow-2xs text-xs font-bold text-[#20231F]">
              <Award className="w-4 h-4 text-[#C85A3D]" />
              <span>Global Rankings</span>
            </div>
          </div>

          <div className="bg-[#FFFDF7] border border-[#DFDDD2] rounded-2xl shadow-2xs overflow-hidden">
            <div className="px-6 py-4 border-b border-[#DFDDD2] bg-[#F3F1E8] flex items-center justify-between">
              <span className="text-xs font-extrabold text-[#20231F] tracking-wider uppercase flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-[#D9A441]" />
                Global Standings
              </span>
              <span className="text-xs text-[#70736B]">Opt-in via Settings</span>
            </div>

            <div className="divide-y divide-[#DFDDD2]">
              {leaderboardEntries.map((entry) => (
                <div
                  key={entry.rank}
                  className={`px-6 py-4 flex items-center justify-between gap-4 ${
                    entry.isUser ? 'bg-[#FAF4E6]/60' : 'hover:bg-[#F3F1E8]'
                  }`}
                >
                  <div className="flex items-center gap-4 min-w-0">
                    {renderRankBadge(entry.rank)}

                    <div className="w-9 h-9 rounded-xl bg-[#344653] flex items-center justify-center text-lg shrink-0 border border-[#DFDDD2]">
                      {entry.avatar}
                    </div>

                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-extrabold text-[#20231F] truncate">
                          {entry.name}
                        </span>
                        {entry.isUser && (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-[#C85A3D] text-white text-[10px] font-extrabold uppercase">
                            <UserCheck className="w-3 h-3" />
                            You
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-6 text-right shrink-0">
                    <div>
                      <span className="text-xs font-extrabold text-[#20231F] flex items-center justify-end gap-1">
                        <Zap className="w-3.5 h-3.5 text-[#C85A3D] fill-[#C85A3D]" />
                        Level {entry.level}
                      </span>
                      <div className="text-[10px] font-technical text-[#70736B]">
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

