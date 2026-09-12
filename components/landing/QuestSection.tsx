'use client';

import React, { useState } from 'react';
import { Check, BookOpen, Activity, Code, Sparkles, RotateCcw } from 'lucide-react';

interface QuestItem {
  id: string;
  title: string;
  category: string;
  categoryColor: string;
  xp: number;
  gold: number;
  desc: string;
  icon: any;
}

const SAMPLE_QUESTS: QuestItem[] = [
  {
    id: 'read',
    title: 'Read 20 pages of non-fiction',
    category: 'Intellect',
    categoryColor: 'text-[#344653] bg-[#F0F4F7]',
    xp: 50,
    gold: 15,
    desc: 'Quiet morning reading and intentional study.',
    icon: BookOpen,
  },
  {
    id: 'run',
    title: 'Interval run or strength training',
    category: 'Strength',
    categoryColor: 'text-[#C85A3D] bg-[#FDF4F2]',
    xp: 100,
    gold: 30,
    desc: 'Physical endurance, fresh air, and morning momentum.',
    icon: Activity,
  },
  {
    id: 'ship',
    title: 'Ship key feature module',
    category: 'Discipline',
    categoryColor: 'text-[#668F72] bg-[#F2F7F4]',
    xp: 200,
    gold: 60,
    desc: 'Uninterrupted focus block to push creative work forward.',
    icon: Code,
  },
  {
    id: 'clean',
    title: 'Declutter workspace and notes',
    category: 'Creativity',
    categoryColor: 'text-[#D9A441] bg-[#FDF8EC]',
    xp: 50,
    gold: 10,
    desc: 'Organize physical desk and clear mental friction.',
    icon: Sparkles,
  },
];

export function QuestSection() {
  const [completedQuests, setCompletedQuests] = useState<Record<string, boolean>>({});
  const [lastReward, setLastReward] = useState<{ id: string; xp: number; gold: number } | null>(null);

  const handleComplete = (quest: QuestItem) => {
    if (completedQuests[quest.id]) return;
    setCompletedQuests((prev) => ({ ...prev, [quest.id]: true }));
    setLastReward({ id: quest.id, xp: quest.xp, gold: quest.gold });

    setTimeout(() => {
      setLastReward(null);
    }, 2200);
  };

  const handleReset = () => {
    setCompletedQuests({});
    setLastReward(null);
  };

  const completedCount = Object.values(completedQuests).filter(Boolean).length;

  return (
    <section id="quests" className="py-20 bg-white border-t border-[#E6E6E8] font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-2xl mb-12 space-y-3">
          <div className="text-xs font-bold uppercase tracking-wider text-[#C85A3D]">
            Relatable Daily Action
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#070709] tracking-tight">
            Your day is already full of quests.
          </h2>
          <p className="text-base text-[#60606C]">
            No artificial gaming chores. Real commitments that matter to your daily progress and momentum.
          </p>
        </div>

        {/* Quests Container */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl">
          {SAMPLE_QUESTS.map((quest) => {
            const isCompleted = !!completedQuests[quest.id];
            const isRewarding = lastReward?.id === quest.id;
            const IconComponent = quest.icon;

            return (
              <div
                key={quest.id}
                className={`relative rounded-2xl border p-5 transition-all flex flex-col justify-between ${
                  isCompleted
                    ? 'bg-[#F7F7F8] border-[#E6E6E8]'
                    : 'bg-white border-[#E6E6E8] hover:border-[#D0D1D4] shadow-xs'
                }`}
              >
                {/* Floating Reward Animation on Click */}
                {isRewarding && (
                  <div className="absolute -top-3 right-4 z-20 flex items-center gap-2 px-3 py-1 bg-[#070709] text-white text-xs font-bold rounded-lg shadow-lg animate-bounce tabular-nums">
                    <Sparkles className="w-3.5 h-3.5 text-[#D9A441]" />
                    <span className="text-[#668F72]">+{quest.xp} XP</span>
                    <span className="text-[#D9A441]">+{quest.gold} GOLD</span>
                  </div>
                )}

                <div>
                  <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#E6E6E8]">
                    <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-md ${quest.categoryColor}`}>
                      {quest.category}
                    </span>
                    <div className="flex items-center gap-2 tabular-nums text-xs">
                      <span className="font-bold text-[#070709]">+{quest.xp} XP</span>
                      <span className="text-[#D9A441] font-semibold">+{quest.gold} Gold</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3.5">
                    <div className="w-9 h-9 rounded-xl bg-[#F7F7F8] border border-[#E6E6E8] flex items-center justify-center text-[#070709] shrink-0 mt-0.5">
                      <IconComponent className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className={`text-sm font-bold tracking-tight ${isCompleted ? 'line-through text-[#8B8B8B]' : 'text-[#070709]'}`}>
                        {quest.title}
                      </h3>
                      <p className="text-xs text-[#60606C] mt-1 leading-relaxed">
                        {quest.desc}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Complete Quest Trigger Button */}
                <div className="mt-5 pt-3 border-t border-[#E6E6E8] flex items-center justify-between">
                  <span className="text-xs text-[#8B8B8B]">
                    {isCompleted ? 'Action logged' : 'Click to test completion'}
                  </span>

                  <button
                    type="button"
                    onClick={() => handleComplete(quest)}
                    disabled={isCompleted}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-xl transition-all cursor-pointer ${
                      isCompleted
                        ? 'bg-[#F2F7F4] text-[#668F72] cursor-default border border-[#668F72]/30'
                        : 'bg-[#070709] hover:bg-[#202025] text-white shadow-xs active:scale-[0.98]'
                    }`}
                  >
                    {isCompleted ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>Completed</span>
                      </>
                    ) : (
                      <span>Complete</span>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Reset Interactive Demo State */}
        {completedCount > 0 && (
          <div className="max-w-4xl mt-3 flex justify-end">
            <button
              type="button"
              onClick={handleReset}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#60606C] hover:text-[#070709] transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset demo quests</span>
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
