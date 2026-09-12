'use client';

import React from 'react';
import { Trophy, CheckCircle2, Lock, Zap, Check, TrendingUp } from 'lucide-react';
import { Sword, Brain, ShieldCheck, Sparkle } from '@phosphor-icons/react';
import { cn } from '../../lib/utils/cn';

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

import { Avatar } from '../avatars';

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
      title: 'FIRST STEP',
      description: 'Complete 1 quest',
      unlocked: true,
    },
    {
      id: '2',
      title: 'CONSISTENT',
      description: '7-day streak',
      unlocked: true,
    },
    {
      id: '3',
      title: 'SCHOLAR',
      description: 'Reach Level 10',
      unlocked: true,
    },
    {
      id: '4',
      title: 'DISCIPLINE MASTER',
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

  const getActivityIcon = (type: 'quest' | 'level' | 'achievement') => {
    switch (type) {
      case 'quest':
        return <CheckCircle2 className="w-3.5 h-3.5 text-[#668F72]" />;
      case 'level':
        return <TrendingUp className="w-3.5 h-3.5 text-[#C85A3D]" />;
      case 'achievement':
        return <Trophy className="w-3.5 h-3.5 text-[#D9A441]" />;
    }
  };

  return (
    <aside className="w-full xl:w-80 space-y-6 shrink-0 select-none font-sans">
      {/* 1. CHARACTER PANEL */}
      <div className="bg-[#FFFDF7] border border-[#DFDDD2] rounded-2xl p-6 shadow-2xs space-y-5">
        <div className="flex items-center justify-between pb-3 border-b border-[#DFDDD2]">
          <h3 className="text-xs font-bold text-[#20231F] tracking-wider uppercase flex items-center gap-1.5">
            <Zap className="w-3.5 h-3.5 text-[#C85A3D]" />
            CHARACTER
          </h3>
          <span className="text-xs font-bold text-[#20231F] font-technical">
            LV. {level}
          </span>
        </div>

        {/* Minimal Pixel Character Portrait */}
        <div className="flex flex-col items-center justify-center p-4 bg-[#F3F1E8] border border-[#DFDDD2] rounded-xl text-center">
          <Avatar
            variant="architect"
            size={80}
            frame="gold"
          />

          <div className="mt-3">
            <h4 className="text-base font-extrabold text-[#20231F] tracking-tight">DHRUV</h4>
            <p className="text-[10px] font-bold text-[#70736B] uppercase tracking-wider mt-0.5">
              ARCHITECT
            </p>
          </div>
        </div>

        {/* 4 Core Attributes with Icons & Progress Bars */}
        <div className="space-y-4 pt-1">
          {/* STRENGTH */}
          <div className="space-y-1">
            <div className="flex justify-between items-center text-xs font-semibold">
              <span className="text-[#C85A3D] flex items-center gap-1.5">
                <Sword weight="fill" className="w-3.5 h-3.5" />
                STRENGTH
              </span>
              <span className="font-technical font-bold text-[#20231F]">
                {String(attributes.strength).padStart(2, '0')}
              </span>
            </div>
            <div className="h-1.5 w-full bg-[#F3F1E8] border border-[#DFDDD2] rounded-full overflow-hidden">
              <div
                className="h-full bg-[#C85A3D] rounded-full transition-all duration-500"
                style={{ width: `${Math.min(100, (attributes.strength / maxAttribute) * 100)}%` }}
              />
            </div>
            <div className="border-b border-[#DFDDD2] pt-1" />
          </div>

          {/* INTELLECT */}
          <div className="space-y-1">
            <div className="flex justify-between items-center text-xs font-semibold">
              <span className="text-[#344653] flex items-center gap-1.5">
                <Brain weight="fill" className="w-3.5 h-3.5" />
                INTELLECT
              </span>
              <span className="font-technical font-bold text-[#20231F]">
                {String(attributes.intellect).padStart(2, '0')}
              </span>
            </div>
            <div className="h-1.5 w-full bg-[#F3F1E8] border border-[#DFDDD2] rounded-full overflow-hidden">
              <div
                className="h-full bg-[#344653] rounded-full transition-all duration-500"
                style={{ width: `${Math.min(100, (attributes.intellect / maxAttribute) * 100)}%` }}
              />
            </div>
            <div className="border-b border-[#DFDDD2] pt-1" />
          </div>

          {/* DISCIPLINE */}
          <div className="space-y-1">
            <div className="flex justify-between items-center text-xs font-semibold">
              <span className="text-[#668F72] flex items-center gap-1.5">
                <ShieldCheck weight="fill" className="w-3.5 h-3.5" />
                DISCIPLINE
              </span>
              <span className="font-technical font-bold text-[#20231F]">
                {String(attributes.discipline).padStart(2, '0')}
              </span>
            </div>
            <div className="h-1.5 w-full bg-[#F3F1E8] border border-[#DFDDD2] rounded-full overflow-hidden">
              <div
                className="h-full bg-[#668F72] rounded-full transition-all duration-500"
                style={{ width: `${Math.min(100, (attributes.discipline / maxAttribute) * 100)}%` }}
              />
            </div>
            <div className="border-b border-[#DFDDD2] pt-1" />
          </div>

          {/* CREATIVITY */}
          <div className="space-y-1">
            <div className="flex justify-between items-center text-xs font-semibold">
              <span className="text-[#D9A441] flex items-center gap-1.5">
                <Sparkle weight="fill" className="w-3.5 h-3.5" />
                CREATIVITY
              </span>
              <span className="font-technical font-bold text-[#20231F]">
                {String(attributes.creativity).padStart(2, '0')}
              </span>
            </div>
            <div className="h-1.5 w-full bg-[#F3F1E8] border border-[#DFDDD2] rounded-full overflow-hidden">
              <div
                className="h-full bg-[#D9A441] rounded-full transition-all duration-500"
                style={{ width: `${Math.min(100, (attributes.creativity / maxAttribute) * 100)}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* 2. ACHIEVEMENTS SECTION */}
      <div className="bg-[#FFFDF7] border border-[#DFDDD2] rounded-xl p-5 shadow-2xs space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-[#DFDDD2]">
          <h3 className="text-xs font-bold text-[#20231F] tracking-wider uppercase flex items-center gap-1.5">
            <Trophy className="w-3.5 h-3.5 text-[#D9A441]" />
            ACHIEVEMENTS
          </h3>
          <Trophy className="w-4 h-4 text-[#D9A441]" />
        </div>

        <div className="space-y-2.5">
          {achievements.map((item) => (
            <div
              key={item.id}
              className={cn(
                'flex items-center gap-3 p-2.5 rounded-lg border transition-colors',
                item.unlocked
                  ? 'bg-[#FFFDF7] border-[#DFDDD2]'
                  : 'bg-[#F3F1E8] border-[#DFDDD2] opacity-50'
              )}
            >
              {/* Clean Collectible Icon */}
              <div
                className={cn(
                  'w-8 h-8 rounded-md flex items-center justify-center shrink-0 border text-xs font-bold',
                  item.unlocked
                    ? 'bg-[#FAF4E6] border-[#F2DEB6] text-[#D9A441]'
                    : 'bg-[#F3F1E8] border-[#DFDDD2] text-[#A8A29E]'
                )}
              >
                <Trophy className="w-4 h-4" />
              </div>

              <div className="flex flex-col min-w-0 flex-1">
                <span
                  className={cn(
                    'text-xs font-bold truncate',
                    item.unlocked ? 'text-[#20231F]' : 'text-[#70736B]'
                  )}
                >
                  {item.title}
                </span>
                <span className="text-[11px] text-[#70736B] truncate">{item.description}</span>
              </div>

              {item.unlocked ? (
                <CheckCircle2 className="w-4 h-4 text-[#668F72] shrink-0" />
              ) : (
                <Lock className="w-3.5 h-3.5 text-[#A8A29E] shrink-0" />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* 3. RECENT ACTIVITY SECTION */}
      <div className="bg-[#FFFDF7] border border-[#DFDDD2] rounded-xl p-5 shadow-2xs space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-[#DFDDD2]">
          <h3 className="text-xs font-bold text-[#20231F] tracking-wider uppercase">
            RECENT ACTIVITY
          </h3>
        </div>

        <div className="space-y-3">
          {activities.map((act) => (
            <div
              key={act.id}
              className="flex items-start gap-2.5 text-xs pb-2 border-b border-[#DFDDD2] last:border-0 last:pb-0"
            >
              <div className="p-1 rounded bg-[#F3F1E8] border border-[#DFDDD2] shrink-0 mt-0.5">
                {getActivityIcon(act.type)}
              </div>
              <div className="flex flex-col flex-1 min-w-0">
                <div className="flex items-center justify-between gap-1">
                  <span className="font-semibold text-[#20231F] truncate">{act.title}</span>
                  <span className="font-technical text-[10px] text-[#A8A29E] shrink-0">
                    {act.timeAgo}
                  </span>
                </div>
                {act.subtext && <span className="text-[11px] text-[#70736B] truncate">{act.subtext}</span>}
                {act.xp && act.gold && (
                  <div className="flex items-center gap-2 mt-0.5 font-technical text-[10px] font-bold text-[#D9A441]">
                    <span>+{act.xp} XP</span>
                    <span>•</span>
                    <span>+{act.gold} GOLD</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
}

