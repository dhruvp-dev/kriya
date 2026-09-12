'use client';

import React, { useEffect, useState } from 'react';
import { History, Calendar } from 'lucide-react';
import { Coins, Sparkle } from '@phosphor-icons/react';
import type { QuestCompletion } from '../../types/database.types';
import { getHistoryData } from '../../lib/queries/history';
import { getDashboardData } from '../../lib/queries/dashboard';
import { Sidebar } from '../../components/navigation/Sidebar';
import { Header } from '../../components/navigation/Header';
import { Badge } from '../../components/ui/Badge';

export default function HistoryPage() {
  const [completions, setCompletions] = useState<QuestCompletion[]>([]);
  const [characterData, setCharacterData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    async function load() {
      const [histList, dashRes] = await Promise.all([
        getHistoryData(),
        getDashboardData(),
      ]);
      setCompletions(histList);
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
          <div>
            <h1 className="text-2xl font-black text-slate-100">Activity History</h1>
            <p className="text-xs text-slate-400">
              Chronological persistent audit trail of your completed quests and earned rewards.
            </p>
          </div>

          {isLoading ? (
            <div className="py-12 text-center text-slate-400 text-sm">Loading History...</div>
          ) : completions.length === 0 ? (
            <div className="py-16 text-center glass-panel rounded-2xl border border-slate-800 p-8 space-y-2">
              <History className="w-8 h-8 text-slate-600 mx-auto" />
              <p className="text-sm font-semibold text-slate-400">No completion records found.</p>
              <p className="text-xs text-slate-500">Complete quests to build your persistent audit log!</p>
            </div>
          ) : (
            <div className="glass-panel rounded-2xl border border-slate-800 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="bg-slate-950/60 text-slate-400 text-xs font-semibold uppercase tracking-wider border-b border-slate-800">
                    <tr>
                      <th className="px-6 py-4">Completed Quest</th>
                      <th className="px-6 py-4 text-center">Attribute Boost</th>
                      <th className="px-6 py-4 text-center">XP Gained</th>
                      <th className="px-6 py-4 text-center">Gold Gained</th>
                      <th className="px-6 py-4 text-right">Timestamp</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60">
                    {completions.map((item) => (
                      <tr key={item.id} className="hover:bg-slate-800/30 transition-colors">
                        <td className="px-6 py-4 font-semibold text-slate-100">
                          {item.quest_title}
                        </td>
                        <td className="px-6 py-4 text-center">
                          <Badge variant={item.attribute_increased}>
                            +{item.attribute_amount} {item.attribute_increased}
                          </Badge>
                        </td>
                        <td className="px-6 py-4 text-center font-bold text-purple-400">
                          +{item.xp_gained} XP
                        </td>
                        <td className="px-6 py-4 text-center font-bold text-amber-400">
                          <span className="inline-flex items-center gap-1">
                            <Coins weight="fill" size={14} /> +{item.gold_gained}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right text-xs text-slate-400">
                          <span className="inline-flex items-center gap-1">
                            <Calendar className="w-3.5 h-3.5 text-slate-500" />
                            {new Date(item.completed_at).toLocaleString()}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
