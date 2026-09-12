'use client';

import React, { useState } from 'react';
import { Check, BookOpen, PersonSimpleRun, Code, Sparkle, ArrowClockwise } from '@phosphor-icons/react';

interface QuestItem {
  id: string;
  title: string;
  category: string;
  categoryColor: string;
  xp: number;
  gold: number;
  desc: string;
  icon: React.ElementType;
}

const SAMPLE_QUESTS: QuestItem[] = [
  {
    id: 'read',
    title: 'READ 20 PAGES',
    category: 'INTELLECT',
    categoryColor: 'text-[#2A7A78] bg-[#E6F3F2]',
    xp: 50,
    gold: 15,
    desc: 'Quiet morning reading and intentional study.',
    icon: BookOpen,
  },
  {
    id: 'run',
    title: 'GO FOR A RUN',
    category: 'STRENGTH',
    categoryColor: 'text-[#C85A3D] bg-[#FAECE7]',
    xp: 100,
    gold: 30,
    desc: 'Physical endurance, fresh air, and morning vitality.',
    icon: PersonSimpleRun,
  },
  {
    id: 'ship',
    title: 'SHIP THE FEATURE',
    category: 'DISCIPLINE',
    categoryColor: 'text-[#1B4332] bg-[#E8F1EC]',
    xp: 200,
    gold: 60,
    desc: 'Focus block to push your creative project forward.',
    icon: Code,
  },
  {
    id: 'clean',
    title: 'CLEAN YOUR DESK',
    category: 'CREATIVITY',
    categoryColor: 'text-[#D97706] bg-[#FEF3C7]',
    xp: 200,
    gold: 5,
    desc: 'Declutter your physical space to clarify your mind.',
    icon: Sparkle,
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
    <section id="quests" className="py-20 bg-[#FAF8F5] border-t border-[#E8E1D3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-2xl mb-12 space-y-3">
          <div className="text-xs font-semibold uppercase tracking-wider text-[#1B4332]">
            RELATABLE REAL LIFE
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-[#192420] tracking-tight">
            YOUR DAY IS ALREADY FULL OF QUESTS
          </h2>
          <p className="text-base sm:text-lg text-[#667770]">
            No fabricated gaming chores. Real commitments that matter to your daily life.
          </p>
        </div>

        {/* Quests Container */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-4xl">
          {SAMPLE_QUESTS.map((quest) => {
            const isCompleted = !!completedQuests[quest.id];
            const isRewarding = lastReward?.id === quest.id;
            const IconComponent = quest.icon;

            return (
              <div
                key={quest.id}
                className={`relative rounded-2xl border p-5 transition-all flex flex-col justify-between ${
                  isCompleted
                    ? 'bg-[#F9F7F2] border-[#D8CEBC]'
                    : 'bg-[#FFFFFF] border-[#E8E1D3] hover:border-[#D8CEBC] shadow-2xs'
                }`}
              >
                {/* Floating Reward Animation on Click */}
                {isRewarding && (
                  <div className="absolute -top-4 right-4 z-20 flex items-center gap-2 px-3 py-1 bg-[#192420] text-[#FAF8F5] text-xs font-technical font-bold rounded-lg shadow-lg animate-bounce">
                    <Sparkle weight="fill" className="w-3.5 h-3.5 text-[#D97706]" />
                    <span className="text-[#34D399]">+{quest.xp} XP</span>
                    <span className="text-[#D97706]">+{quest.gold} GOLD</span>
                  </div>
                )}

                <div>
                  <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#E8E1D3]/60">
                    <span className={`text-[10px] font-technical uppercase font-bold px-2 py-0.5 rounded ${quest.categoryColor}`}>
                      {quest.category}
                    </span>
                    <div className="flex items-center gap-2 font-technical text-xs">
                      <span className="font-bold text-[#1B4332]">+{quest.xp} XP</span>
                      <span className="text-[#D97706] font-semibold">+{quest.gold} GOLD</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3.5">
                    <div className="w-9 h-9 rounded-lg bg-[#FAF8F5] border border-[#E8E1D3] flex items-center justify-center text-[#192420] shrink-0 mt-0.5">
                      <IconComponent weight="bold" className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-base font-extrabold text-[#192420] tracking-tight">
                        {quest.title}
                      </h3>
                      <p className="text-xs text-[#667770] mt-1 leading-relaxed">
                        {quest.desc}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Complete Quest Trigger Button */}
                <div className="mt-5 pt-3 border-t border-[#E8E1D3]/60 flex items-center justify-between">
                  <span className="text-[11px] text-[#667770]">
                    {isCompleted ? 'Marked as completed' : 'Try completing this quest'}
                  </span>

                  <button
                    type="button"
                    onClick={() => handleComplete(quest)}
                    disabled={isCompleted}
                    className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                      isCompleted
                        ? 'bg-[#E8F1EC] text-[#1B4332] cursor-default'
                        : 'bg-[#1B4332] hover:bg-[#133226] text-[#FAF8F5] shadow-xs active:scale-[0.98]'
                    }`}
                  >
                    {isCompleted ? (
                      <>
                        <Check weight="bold" className="w-3.5 h-3.5" />
                        <span>DONE</span>
                      </>
                    ) : (
                      <span>COMPLETE</span>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Reset Interactive Demo State */}
        {completedCount > 0 && (
          <div className="max-w-4xl mt-4 flex justify-end">
            <button
              type="button"
              onClick={handleReset}
              className="inline-flex items-center gap-1.5 text-xs font-medium text-[#667770] hover:text-[#192420] transition-colors"
            >
              <ArrowClockwise weight="bold" className="w-3.5 h-3.5" />
              <span>Reset demo quests</span>
            </button>
          </div>
        )}

      </div>
    </section>
  );
}
