'use client';

import React, { useState } from 'react';
import { Sidebar } from '../../components/navigation/Sidebar';
import { Header } from '../../components/navigation/Header';
import { History as HistoryIcon, Search, Calendar, CheckCircle2 } from 'lucide-react';

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
    <div className="min-h-screen bg-[#F3F1E8] text-[#20231F] flex flex-col lg:flex-row font-sans">
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

        <div className="p-4 sm:p-6 lg:p-8 max-w-6xl w-full mx-auto space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-[#20231F] tracking-tight">
                Completion History
              </h1>
              <p className="text-sm text-[#70736B] mt-1 font-medium">
                Audit log of all completed quests and earned XP / Gold.
              </p>
            </div>

            <div className="relative min-w-[220px]">
              <Search className="w-4 h-4 text-[#70736B] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search audit log..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 bg-[#FFFDF7] border border-[#DFDDD2] rounded-xl text-xs text-[#20231F] placeholder-[#70736B] focus:outline-none focus:border-[#C85A3D] shadow-2xs"
              />
            </div>
          </div>

          <div className="bg-[#FFFDF7] border border-[#DFDDD2] rounded-2xl shadow-2xs overflow-hidden">
            <div className="divide-y divide-[#DFDDD2]">
              {filteredEntries.map((entry) => (
                <div
                  key={entry.id}
                  className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-[#F3F1E8] transition-colors"
                >
                  <div className="flex items-center gap-3.5">
                    <div className="w-8 h-8 rounded-full bg-[#F4F8F5] text-[#668F72] flex items-center justify-center shrink-0 border border-[#668F72]/20">
                      <CheckCircle2 className="w-4 h-4" />
                    </div>

                    <div>
                      <h4 className="text-sm font-extrabold text-[#20231F]">{entry.title}</h4>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-xs font-semibold text-[#70736B]">
                          {entry.attribute}
                        </span>
                        <span className="text-xs text-[#70736B]">•</span>
                        <span className="text-xs text-[#70736B] flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {entry.completedAt}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 font-technical text-xs font-bold text-right self-end sm:self-center">
                    <span className="px-2.5 py-1 bg-[#F3F1E8] border border-[#DFDDD2] rounded-lg text-[#20231F]">
                      +{entry.xp} XP
                    </span>
                    <span className="px-2.5 py-1 bg-[#FAF4E6] border border-[#D9A441]/30 rounded-lg text-[#D9A441]">
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
