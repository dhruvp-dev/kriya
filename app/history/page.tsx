'use client';

import React, { useState } from 'react';
import { Sidebar } from '../../components/navigation/Sidebar';
import { Header } from '../../components/navigation/Header';
import { Search, Calendar, CheckCircle2, Coins, Sparkles } from 'lucide-react';

export default function HistoryPage() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const [userStats] = useState({
    level: 12,
    currentXp: 2480,
    nextLevelXp: 3200,
    gold: 680,
    streak: 14,
    displayName: 'Dhruv',
  });

  const historyEntries = [
    {
      id: 'hist-1',
      title: 'Study React API Architecture',
      attribute: 'Intellect',
      xp: 50,
      gold: 15,
      completedAt: 'Today, 09:45 AM',
    },
    {
      id: 'hist-2',
      title: '30 minute morning workout',
      attribute: 'Strength',
      xp: 20,
      gold: 5,
      completedAt: 'Yesterday, 07:30 AM',
    },
    {
      id: 'hist-3',
      title: 'Read 20 pages of non-fiction',
      attribute: 'Discipline',
      xp: 20,
      gold: 5,
      completedAt: 'Sep 11, 2026',
    },
    {
      id: 'hist-4',
      title: 'Design retro typography tokens',
      attribute: 'Creativity',
      xp: 100,
      gold: 30,
      completedAt: 'Sep 10, 2026',
    },
  ];

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
          </div>
        </div>
      </main>
    </div>
  );
}
