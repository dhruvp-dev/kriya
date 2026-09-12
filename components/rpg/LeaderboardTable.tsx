'use client';

import React from 'react';
import { Trophy, Medal } from '@phosphor-icons/react'; // Phosphor for game badges per rule!
import type { LeaderboardEntry } from '../../types/database.types';
import { Avatar } from './avatar';
import { LevelBadge } from './LevelBadge';

export interface LeaderboardTableProps {
  entries: LeaderboardEntry[];
  currentUserId?: string;
}

export function LeaderboardTable({ entries, currentUserId }: LeaderboardTableProps) {
  if (!entries || entries.length === 0) {
    return (
      <div className="p-8 text-center text-slate-400 glass-panel rounded-2xl">
        No opt-in leaderboard entries yet. Be the first to turn on Leaderboard visibility in Settings!
      </div>
    );
  }

  const getRankBadge = (rank: number) => {
    if (rank === 1) return <Trophy weight="fill" className="w-6 h-6 text-amber-400" />;
    if (rank === 2) return <Medal weight="fill" className="w-6 h-6 text-slate-300" />;
    if (rank === 3) return <Medal weight="fill" className="w-6 h-6 text-amber-700" />;
    return <span className="font-bold text-slate-500 text-sm">#{rank}</span>;
  };

  return (
    <div className="glass-panel rounded-2xl overflow-hidden border border-slate-800">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-950/60 text-slate-400 text-xs font-semibold uppercase tracking-wider border-b border-slate-800">
            <tr>
              <th className="px-6 py-4 w-16 text-center">Rank</th>
              <th className="px-6 py-4">Hero</th>
              <th className="px-6 py-4 text-center">Level</th>
              <th className="px-6 py-4 text-right">Total XP</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60">
            {entries.map((entry) => {
              const isCurrentUser = currentUserId === entry.user_id;

              return (
                <tr
                  key={entry.user_id}
                  className={`transition-colors ${
                    isCurrentUser ? 'bg-indigo-500/10 hover:bg-indigo-500/20' : 'hover:bg-slate-800/40'
                  }`}
                >
                  <td className="px-6 py-4 text-center font-bold">
                    <div className="flex items-center justify-center">{getRankBadge(entry.rank)}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <Avatar config={entry.avatar_config} size="sm" />
                      <span
                        className={`font-semibold ${
                          isCurrentUser ? 'text-indigo-300 font-bold' : 'text-slate-200'
                        }`}
                      >
                        {entry.display_name} {isCurrentUser && '(You)'}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <LevelBadge level={entry.level} size="sm" />
                  </td>
                  <td className="px-6 py-4 text-right font-extrabold text-purple-400">
                    {entry.total_xp.toLocaleString()} XP
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
