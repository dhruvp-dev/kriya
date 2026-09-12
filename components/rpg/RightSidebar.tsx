'use client';

import React from 'react';
import { Trophy, CheckCircle2, Lock } from 'lucide-react';
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

import { Avatar } from './avatar/Avatar';

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

  return (
    <aside className="w-full xl:w-80 space-y-6 shrink-0 select-none font-sans">
      {/* 1. CHARACTER PANEL */}
      <div className="bg-[#FFFFFF] border border-[#E5E1D9] rounded-2xl p-6 shadow-2xs space-y-5">
        <div className="flex items-center justify-between pb-3 border-b border-[#E5E1D9]">
          <h3 className="text-xs font-bold text-[#171A21] tracking-wider uppercase">
            CHARACTER
          </h3>
          <span className="text-xs font-bold text-[#171A21] font-technical">
            LV. {level}
          </span>
        </div>

        {/* Minimal Pixel Character Portrait */}
        <div className="flex flex-col items-center justify-center p-4 bg-[#F7F5F0] border border-[#E5E1D9] rounded-xl text-center">
          <Avatar
            size="lg"
            config={{
              baseModel: 'warrior',
              tint: '#F05A3C',
              hat: 'none',
              weapon: 'none',
              back: 'none',
            }}
            animate={false}
            className="w-20 h-20 rounded-2xl bg-[#202B3C] border-2 border-[#E5E1D9] shadow-2xs"
          />

          <div className="mt-3">
            <h4 className="text-base font-extrabold text-[#171A21] tracking-tight">DHRUV</h4>
            <p className="text-[10px] font-bold text-[#686C73] uppercase tracking-wider mt-0.5">
              ARCHITECT
            </p>
          </div>
        </div>

        {/* 4 Core Attributes with Thin Progress Bars & Divider Lines */}
        <div className="space-y-4 pt-1">
          {/* STRENGTH */}
          <div className="space-y-1">
            <div className="flex justify-between items-center text-xs font-semibold">
              <span className="text-[#DC2626]">STRENGTH</span>
              <span className="font-technical font-bold text-[#171A21]">
                {String(attributes.strength).padStart(2, '0')}
              </span>
            </div>
            <div className="h-1.5 w-full bg-[#F7F5F0] border border-[#E5E1D9] rounded-full overflow-hidden">
              <div
                className="h-full bg-[#EF4444] rounded-full transition-all duration-500"
                style={{ width: `${Math.min(100, (attributes.strength / maxAttribute) * 100)}%` }}
              />
            </div>
            <div className="border-b border-[#E5E1D9] pt-1" />
          </div>

          {/* INTELLECT */}
          <div className="space-y-1">
            <div className="flex justify-between items-center text-xs font-semibold">
              <span className="text-[#2563EB]">INTELLECT</span>
              <span className="font-technical font-bold text-[#171A21]">
                {String(attributes.intellect).padStart(2, '0')}
              </span>
            </div>
            <div className="h-1.5 w-full bg-[#F7F5F0] border border-[#E5E1D9] rounded-full overflow-hidden">
              <div
                className="h-full bg-[#3B82F6] rounded-full transition-all duration-500"
                style={{ width: `${Math.min(100, (attributes.intellect / maxAttribute) * 100)}%` }}
              />
            </div>
            <div className="border-b border-[#E5E1D9] pt-1" />
          </div>

          {/* DISCIPLINE */}
          <div className="space-y-1">
            <div className="flex justify-between items-center text-xs font-semibold">
              <span className="text-[#2E9B72]">DISCIPLINE</span>
              <span className="font-technical font-bold text-[#171A21]">
                {String(attributes.discipline).padStart(2, '0')}
              </span>
            </div>
            <div className="h-1.5 w-full bg-[#F7F5F0] border border-[#E5E1D9] rounded-full overflow-hidden">
              <div
                className="h-full bg-[#2E9B72] rounded-full transition-all duration-500"
                style={{ width: `${Math.min(100, (attributes.discipline / maxAttribute) * 100)}%` }}
              />
            </div>
            <div className="border-b border-[#E5E1D9] pt-1" />
          </div>

          {/* CREATIVITY */}
          <div className="space-y-1">
            <div className="flex justify-between items-center text-xs font-semibold">
              <span className="text-[#7C3AED]">CREATIVITY</span>
              <span className="font-technical font-bold text-[#171A21]">
                {String(attributes.creativity).padStart(2, '0')}
              </span>
            </div>
            <div className="h-1.5 w-full bg-[#F7F5F0] border border-[#E5E1D9] rounded-full overflow-hidden">
              <div
                className="h-full bg-[#8B5CF6] rounded-full transition-all duration-500"
                style={{ width: `${Math.min(100, (attributes.creativity / maxAttribute) * 100)}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* 2. ACHIEVEMENTS SECTION */}
      <div className="bg-[#FFFFFF] border border-[#E5E1D9] rounded-xl p-5 shadow-2xs space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-[#E5E1D9]">
          <h3 className="text-xs font-bold text-[#171A21] tracking-wider uppercase">
            ACHIEVEMENTS
          </h3>
          <Trophy className="w-4 h-4 text-[#FFB547]" />
        </div>

        <div className="space-y-2.5">
          {achievements.map((item) => (
            <div
              key={item.id}
              className={cn(
                'flex items-center gap-3 p-2.5 rounded-lg border transition-colors',
                item.unlocked
                  ? 'bg-[#FFFFFF] border-[#E5E1D9]'
                  : 'bg-[#F7F5F0] border-[#E5E1D9] opacity-50'
              )}
            >
              {/* Clean Collectible Icon */}
              <div
                className={cn(
                  'w-8 h-8 rounded-md flex items-center justify-center shrink-0 border text-xs font-bold',
                  item.unlocked
                    ? 'bg-[#FFFBEB] border-[#FDE68A] text-[#D97706]'
                    : 'bg-[#F7F5F0] border-[#E5E1D9] text-[#A8A29E]'
                )}
              >
                <Trophy className="w-4 h-4" />
              </div>

              <div className="flex flex-col min-w-0 flex-1">
                <span
                  className={cn(
                    'text-xs font-bold truncate',
                    item.unlocked ? 'text-[#171A21]' : 'text-[#686C73]'
                  )}
                >
                  {item.title}
                </span>
                <span className="text-[11px] text-[#686C73] truncate">{item.description}</span>
              </div>

              {item.unlocked ? (
                <CheckCircle2 className="w-4 h-4 text-[#2E9B72] shrink-0" />
              ) : (
                <Lock className="w-3.5 h-3.5 text-[#A8A29E] shrink-0" />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* 3. RECENT ACTIVITY SECTION */}
      <div className="bg-[#FFFFFF] border border-[#E5E1D9] rounded-xl p-5 shadow-2xs space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-[#E5E1D9]">
          <h3 className="text-xs font-bold text-[#171A21] tracking-wider uppercase">
            RECENT ACTIVITY
          </h3>
        </div>

        <div className="space-y-3">
          {activities.map((act) => (
            <div
              key={act.id}
              className="flex items-start justify-between text-xs pb-2 border-b border-[#E5E1D9] last:border-0 last:pb-0"
            >
              <div className="flex flex-col">
                <span className="font-semibold text-[#171A21]">{act.title}</span>
                {act.subtext && <span className="text-[11px] text-[#686C73]">{act.subtext}</span>}
                {act.xp && act.gold && (
                  <div className="flex items-center gap-2 mt-0.5 font-technical text-[10px] font-bold text-[#D97706]">
                    <span>+{act.xp} XP</span>
                    <span>•</span>
                    <span>+{act.gold} GOLD</span>
                  </div>
                )}
              </div>

              <span className="font-technical text-[10px] text-[#A8A29E] shrink-0">
                {act.timeAgo}
              </span>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
}
