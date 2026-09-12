'use client';

import React, { useEffect, useState } from 'react';
import { Award } from 'lucide-react';
import type { LeaderboardEntry } from '../../types/database.types';
import { getLeaderboardData } from '../../lib/queries/leaderboard';
import { getDashboardData } from '../../lib/queries/dashboard';
import { Sidebar } from '../../components/navigation/Sidebar';
import { Header } from '../../components/navigation/Header';
import { LeaderboardTable } from '../../components/rpg/LeaderboardTable';

export default function LeaderboardPage() {
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [characterData, setCharacterData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    async function load() {
      const [lbList, dashRes] = await Promise.all([
        getLeaderboardData(),
        getDashboardData(),
      ]);
      setEntries(lbList);
      setCharacterData(dashRes);
      setIsLoading(false);
    }
    load();
  }, []);

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
              <div className="flex items-center gap-2">
                <Award className="w-6 h-6 text-amber-400" />
                <h1 className="text-2xl font-black text-slate-100">Global Leaderboard</h1>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Competitive progression rank based on Level DESC, Total XP DESC, and level attainment time.
              </p>
            </div>
          </div>

          {isLoading ? (
            <div className="py-12 text-center text-slate-400 text-sm">Loading Leaderboard...</div>
          ) : (
            <LeaderboardTable
              entries={entries}
              currentUserId={characterData?.profile?.id}
            />
          )}
        </main>
      </div>
    </div>
  );
}
