'use client';

import React from 'react';
import { Trophy, CheckCircle2, Lock, ArrowUpRight, Clock } from 'lucide-react';
import { cn } from '../../lib/utils/cn';
import { Avatar } from '../avatars/Avatar';

export interface AttributeData {
  strength: number;
  intellect: number;
  discipline: number;
  creativity: number;
}

export interface AchievementItem {
  id: string;
  title: string;
  description: string;
  unlocked: boolean;
}

export interface ActivityItem {
  id: string;
  title: string;
  subtext?: string;
  xp?: number;
  gold?: number;
  timeAgo: string;
  type: 'quest' | 'level' | 'achievement';
}

export interface RightSidebarProps {
  level?: number;
  attributes?: AttributeData;
  achievements?: AchievementItem[];
  activities?: ActivityItem[];
}

export function RightSidebar({
  level = 12,
  attributes = {
    strength: 8,
    intellect: 12,
    discipline: 15,
    creativity: 10,
  },
  achievements = [
    {
      id: '1',
      title: 'First Step',
      description: 'Complete 1 quest',
      unlocked: true,
    },
    {
      id: '2',
      title: 'Consistent',
      description: '7-day streak',
      unlocked: true,
    },
    {
      id: '3',
      title: 'Scholar',
      description: 'Reach Level 10',
      unlocked: true,
    },
    {
      id: '4',
      title: 'Discipline Master',
      description: 'Complete 25 Discipline quests',
      unlocked: false,
    },
  ],
  activities = [
    {
      id: 'act-1',
      title: 'Completed quest',
      subtext: 'Study React API Architecture',
      xp: 50,
      gold: 15,
      timeAgo: '12m ago',
      type: 'quest',
    },
    {
      id: 'act-2',
      title: 'Reached Level 12',
      timeAgo: 'Yesterday',
      type: 'level',
    },
    {
      id: 'act-3',
      title: 'Achievement unlocked',
      subtext: 'Scholar',
      timeAgo: '2d ago',
      type: 'achievement',
    },
  ],
}: RightSidebarProps) {
  const maxAttribute = 25;

  return (
    <aside className="w-full xl:w-80 space-y-6 shrink-0 select-none font-sans">
      
      {/* 1. CHARACTER & ATTRIBUTES PANEL */}
      <div className="bg-[#FFFFFF] border border-[#E6E6E8] rounded-2xl p-6 shadow-2xs space-y-5">
        
        {/* Blob Avatar & Name Header */}
        <div className="flex items-center gap-4 pb-4 border-b border-[#E6E6E8]">
          <Avatar variant="architect" size={54} />
          <div className="min-w-0">
            <h4 className="text-base font-bold text-[#151515] tracking-tight">Dhruv</h4>
            <div className="flex items-center gap-1.5 text-xs text-[#60606C] mt-0.5">
              <span className="font-semibold text-[#070709]">Architect</span>
              <span>·</span>
              <span className="tabular-nums font-medium text-[#8B8B8B]">Level {level}</span>
            </div>
          </div>
        </div>

        {/* 4 Core Attributes (Clean minimal bars) */}
        <div className="space-y-3.5 pt-1">
          {/* Strength */}
          <div className="space-y-1">
            <div className="flex justify-between items-center text-xs">
              <span className="font-semibold text-[#151515]">Strength</span>
              <span className="font-semibold text-[#8B8B8B] tabular-nums">{attributes.strength}</span>
            </div>
            <div className="h-1.5 w-full bg-[#F3F4F5] rounded-full overflow-hidden">
              <div
                className="h-full bg-[#C85A3D] rounded-full transition-all duration-500"
                style={{ width: `${Math.min(100, (attributes.strength / maxAttribute) * 100)}%` }}
              />
            </div>
          </div>

          {/* Intellect */}
          <div className="space-y-1">
            <div className="flex justify-between items-center text-xs">
              <span className="font-semibold text-[#151515]">Intellect</span>
              <span className="font-semibold text-[#8B8B8B] tabular-nums">{attributes.intellect}</span>
            </div>
            <div className="h-1.5 w-full bg-[#F3F4F5] rounded-full overflow-hidden">
              <div
                className="h-full bg-[#070709] rounded-full transition-all duration-500"
                style={{ width: `${Math.min(100, (attributes.intellect / maxAttribute) * 100)}%` }}
              />
            </div>
          </div>

          {/* Discipline */}
          <div className="space-y-1">
            <div className="flex justify-between items-center text-xs">
              <span className="font-semibold text-[#151515]">Discipline</span>
              <span className="font-semibold text-[#8B8B8B] tabular-nums">{attributes.discipline}</span>
            </div>
            <div className="h-1.5 w-full bg-[#F3F4F5] rounded-full overflow-hidden">
              <div
                className="h-full bg-[#668F72] rounded-full transition-all duration-500"
                style={{ width: `${Math.min(100, (attributes.discipline / maxAttribute) * 100)}%` }}
              />
            </div>
          </div>

          {/* Creativity */}
          <div className="space-y-1">
            <div className="flex justify-between items-center text-xs">
              <span className="font-semibold text-[#151515]">Creativity</span>
              <span className="font-semibold text-[#8B8B8B] tabular-nums">{attributes.creativity}</span>
            </div>
            <div className="h-1.5 w-full bg-[#F3F4F5] rounded-full overflow-hidden">
              <div
                className="h-full bg-[#D9A441] rounded-full transition-all duration-500"
                style={{ width: `${Math.min(100, (attributes.creativity / maxAttribute) * 100)}%` }}
              />
            </div>
          </div>
        </div>

      </div>

      {/* 2. ACHIEVEMENTS PREVIEW */}
      <div className="bg-[#FFFFFF] border border-[#E6E6E8] rounded-2xl p-5 shadow-2xs space-y-3.5">
        <div className="flex items-center justify-between pb-2.5 border-b border-[#E6E6E8]">
          <h3 className="text-xs font-semibold text-[#8B8B8B] tracking-wider uppercase">
            Achievements
          </h3>
          <span className="text-xs font-semibold text-[#070709] tabular-nums">3/4</span>
        </div>

        <div className="space-y-2">
          {achievements.map((item) => (
            <div
              key={item.id}
              className={cn(
                'flex items-center justify-between p-2.5 rounded-xl border text-xs transition-colors',
                item.unlocked
                  ? 'bg-[#FFFFFF] border-[#E6E6E8]'
                  : 'bg-[#F7F7F8] border-transparent opacity-60'
              )}
            >
              <div className="min-w-0 pr-2">
                <div className="font-semibold text-[#151515] truncate">{item.title}</div>
                <div className="text-[11px] text-[#8B8B8B] truncate mt-0.5">{item.description}</div>
              </div>

              {item.unlocked ? (
                <CheckCircle2 className="w-4 h-4 text-[#668F72] shrink-0" />
              ) : (
                <Lock className="w-3.5 h-3.5 text-[#8B8B8B] shrink-0" />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* 3. RECENT ACTIVITY */}
      <div className="bg-[#FFFFFF] border border-[#E6E6E8] rounded-2xl p-5 shadow-2xs space-y-3.5">
        <div className="flex items-center justify-between pb-2.5 border-b border-[#E6E6E8]">
          <h3 className="text-xs font-semibold text-[#8B8B8B] tracking-wider uppercase">
            Recent Activity
          </h3>
        </div>

        <div className="space-y-3 text-xs">
          {activities.map((act) => (
            <div
              key={act.id}
              className="flex items-start justify-between gap-2 pb-2.5 border-b border-[#E6E6E8] last:border-0 last:pb-0"
            >
              <div className="min-w-0">
                <div className="font-medium text-[#151515] truncate">{act.title}</div>
                {act.subtext && (
                  <div className="text-[11px] text-[#8B8B8B] truncate mt-0.5">{act.subtext}</div>
                )}
                {act.xp && act.gold && (
                  <div className="flex items-center gap-2 mt-1 text-[11px] font-semibold text-[#D9A441] tabular-nums">
                    <span>+{act.xp} XP</span>
                    <span>·</span>
                    <span>+{act.gold} Gold</span>
                  </div>
                )}
              </div>
              <span className="text-[10px] text-[#8B8B8B] shrink-0 tabular-nums">{act.timeAgo}</span>
            </div>
          ))}
        </div>
      </div>

    </aside>
  );
}
