'use client';

import React, { useState } from 'react';
import {
  ArrowRight,
  Check,
  Sparkle,
  BookOpen,
  PersonSimpleRun,
  Broom,
  Code,
  Plus,
  Coins,
  Lightning,
  X,
  ArrowClockwise,
} from '@phosphor-icons/react';

interface QuestItem {
  id: string;
  title: string;
  domain: string;
  difficulty: 'Quick' | 'Medium' | 'High';
  xp: number;
  gold: number;
  desc: string;
  icon: any;
  domainColor: string;
  completed: boolean;
}

const INITIAL_QUESTS: QuestItem[] = [
  {
    id: '1',
    title: 'Read 20 pages of non-fiction',
    domain: 'Intellect',
    difficulty: 'Medium',
    xp: 50,
    gold: 15,
    desc: 'Daily non-fiction focus block & deep concept capture.',
    icon: BookOpen,
    domainColor: 'bg-[#F3F4F5] text-[#070709] border-[#E6E6E8]',
    completed: false,
  },
  {
    id: '2',
    title: '5km interval run or strength circuit',
    domain: 'Strength',
    difficulty: 'High',
    xp: 100,
    gold: 30,
    desc: 'Aerobic threshold training and core stamina maintenance.',
    icon: PersonSimpleRun,
    domainColor: 'bg-[#FDF4F2] text-[#C85A3D] border-[#C85A3D]/20',
    completed: false,
  },
  {
    id: '3',
    title: 'Clean workspace & zero desk clutter',
    domain: 'Discipline',
    difficulty: 'Quick',
    xp: 20,
    gold: 5,
    desc: 'Physical environment reset and quiet mental clarity.',
    icon: Broom,
    domainColor: 'bg-[#F1F6F3] text-[#668F72] border-[#668F72]/20',
    completed: false,
  },
  {
    id: '4',
    title: 'Ship feature module & write specs',
    domain: 'Creativity',
    difficulty: 'High',
    xp: 200,
    gold: 60,
    desc: 'Uninterrupted deep work sprint pushing production code.',
    icon: Code,
    domainColor: 'bg-[#FBF5EA] text-[#D9A441] border-[#D9A441]/20',
    completed: false,
  },
];

export function QuestShowcase() {
  const [quests, setQuests] = useState<QuestItem[]>(INITIAL_QUESTS);
  const [sessionXP, setSessionXP] = useState(2430);
  const [sessionGold, setSessionGold] = useState(680);
  const [isCreating, setIsCreating] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newDomain, setNewDomain] = useState<'Intellect' | 'Strength' | 'Discipline' | 'Creativity'>('Intellect');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const toggleQuest = (id: string) => {
    setQuests((prev) =>
      prev.map((q) => {
        if (q.id === id) {
          const nextState = !q.completed;
          if (nextState) {
            setSessionXP((xp) => xp + q.xp);
            setSessionGold((gold) => gold + q.gold);
            setToastMessage(`+${q.xp} XP · +${q.gold} Gold`);
            setTimeout(() => setToastMessage(null), 2400);
          } else {
            setSessionXP((xp) => Math.max(2430, xp - q.xp));
            setSessionGold((gold) => Math.max(680, gold - q.gold));
          }
          return { ...q, completed: nextState };
        }
        return q;
      })
    );
  };

  const handleAddQuest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const colors = {
      Intellect: 'bg-[#F3F4F5] text-[#070709] border-[#E6E6E8]',
      Strength: 'bg-[#FDF4F2] text-[#C85A3D] border-[#C85A3D]/20',
      Discipline: 'bg-[#F1F6F3] text-[#668F72] border-[#668F72]/20',
      Creativity: 'bg-[#FBF5EA] text-[#D9A441] border-[#D9A441]/20',
    };

    const newQuestItem: QuestItem = {
      id: Date.now().toString(),
      title: newTitle.trim(),
      domain: newDomain,
      difficulty: 'Medium',
      xp: 50,
      gold: 15,
      desc: 'Custom habit added to your daily progress queue.',
      icon: BookOpen,
      domainColor: colors[newDomain],
      completed: false,
    };

    setQuests((prev) => [newQuestItem, ...prev]);
    setNewTitle('');
    setIsCreating(false);
  };

  const handleReset = () => {
    setQuests(INITIAL_QUESTS);
    setSessionXP(2430);
    setSessionGold(680);
    setIsCreating(false);
  };

  const nextLevelXP = 3162;
  const progressPercent = Math.min(100, Math.round((sessionXP / nextLevelXP) * 100));

  return (
    <section id="how-it-works" className="py-24 md:py-36 bg-[#F7F7F8] border-t border-[#E6E6E8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-14">
          <div className="max-w-2xl space-y-4">
            <h2 className="text-4xl sm:text-5xl font-extrabold text-[#070709] tracking-[-0.03em] leading-tight">
              MAKE THE THINGS <br />
              YOU ALREADY DO <br />
              COUNT.
            </h2>
            <p className="text-base sm:text-lg text-[#60606C] leading-relaxed">
              No artificial chores or fantasy distractions. Complete real tasks below or add your own custom quest to test the engine.
            </p>
          </div>

          <div className="inline-flex items-center gap-2.5 px-4 py-2 bg-white border border-[#E6E6E8] rounded-2xl text-xs font-bold text-[#070709] shadow-xs self-start lg:self-auto">
            <span>REAL ACTION</span>
            <ArrowRight weight="bold" className="w-3.5 h-3.5 text-[#8B8B8B]" />
            <span className="text-[#C85A3D]">QUEST</span>
            <ArrowRight weight="bold" className="w-3.5 h-3.5 text-[#8B8B8B]" />
            <span className="text-[#D9A441]">REWARD</span>
          </div>
        </div>

        {/* Live Functional Quest Board Sandbox (680px Desktop) */}
        <div className="max-w-[700px] mx-auto">
          <div className="bg-[#FFFFFF] border border-[#E6E6E8] rounded-3xl shadow-xl overflow-hidden">
            {/* Window Title Bar with Status and Actions */}
            <div className="px-6 py-4 bg-[#F7F7F8] border-b border-[#E6E6E8] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#E6E6E8]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#E6E6E8]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#E6E6E8]" />
                <span className="ml-2 text-xs font-bold text-[#070709]">Daily Action Board</span>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5 text-xs font-bold text-[#D9A441] tabular-nums">
                  <Coins weight="fill" className="w-4 h-4" />
                  <span>{sessionGold} Gold</span>
                </div>

                <button
                  type="button"
                  onClick={() => setIsCreating(!isCreating)}
                  className="inline-flex items-center gap-1 text-xs font-bold px-3 py-1.5 rounded-xl bg-[#070709] text-white hover:bg-[#202025] transition-all cursor-pointer shadow-xs active:scale-[0.98]"
                >
                  <Plus weight="bold" className="w-3 h-3" />
                  <span>New Quest</span>
                </button>
              </div>
            </div>

            {/* Live Progress Bar inside Board */}
            <div className="px-6 py-3.5 bg-white border-b border-[#E6E6E8] space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-extrabold text-[#070709]">Level 12 Progression</span>
                <span className="font-bold text-[#60606C] tabular-nums">
                  {sessionXP.toLocaleString()} / {nextLevelXP.toLocaleString()} XP ({progressPercent}%)
                </span>
              </div>
              <div className="h-2 w-full bg-[#F3F4F5] rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#070709] rounded-full transition-all duration-500 ease-out"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>

            {/* Inline Mini Quest Creator */}
            {isCreating && (
              <form
                onSubmit={handleAddQuest}
                className="p-5 bg-[#FBF5EA] border-b border-[#D9A441]/30 space-y-3 animate-fadeIn"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#070709]">
                    Add Custom Habit or Task
                  </span>
                  <button
                    type="button"
                    onClick={() => setIsCreating(false)}
                    className="text-xs text-[#8B8B8B] hover:text-[#070709]"
                  >
                    <X weight="bold" className="w-4 h-4" />
                  </button>
                </div>

                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    placeholder="e.g. Write 500 words of daily journal..."
                    className="flex-1 px-3.5 py-2 text-xs rounded-xl bg-white border border-[#E6E6E8] text-[#070709] placeholder:text-[#8B8B8B] focus:outline-none focus:border-[#070709]"
                    autoFocus
                  />
                  <select
                    value={newDomain}
                    onChange={(e: any) => setNewDomain(e.target.value)}
                    className="px-3 py-2 text-xs rounded-xl bg-white border border-[#E6E6E8] text-[#070709] focus:outline-none"
                  >
                    <option value="Intellect">Intellect</option>
                    <option value="Strength">Strength</option>
                    <option value="Discipline">Discipline</option>
                    <option value="Creativity">Creativity</option>
                  </select>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-[#070709] text-white text-xs font-bold rounded-xl shadow-xs hover:bg-[#202025] transition-all cursor-pointer"
                  >
                    Add
                  </button>
                </div>
              </form>
            )}

            {/* Quests List */}
            <div className="p-6 space-y-3.5 relative">
              {/* Reward Toast Float */}
              {toastMessage && (
                <div className="absolute top-2 right-6 z-30 flex items-center gap-2 px-3.5 py-1.5 bg-[#070709] text-white text-xs font-bold rounded-full shadow-xl animate-bounce">
                  <Sparkle weight="fill" className="w-3.5 h-3.5 text-[#D9A441]" />
                  <span className="text-[#668F72]">{toastMessage}</span>
                </div>
              )}

              {quests.map((quest) => (
                <div
                  key={quest.id}
                  onClick={() => toggleQuest(quest.id)}
                  className={`p-4 sm:p-5 rounded-2xl border transition-all cursor-pointer flex items-start gap-4 ${
                    quest.completed
                      ? 'bg-[#F1F6F3] border-[#668F72]/40 shadow-xs'
                      : 'bg-[#FFFFFF] border-[#E6E6E8] hover:border-[#D0D1D4] hover:shadow-xs'
                  }`}
                >
                  {/* Interactive Button */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleQuest(quest.id);
                    }}
                    className={`w-6 h-6 rounded-lg border flex items-center justify-center shrink-0 mt-0.5 transition-all cursor-pointer ${
                      quest.completed
                        ? 'bg-[#668F72] border-[#668F72] text-white scale-105'
                        : 'bg-[#F7F7F8] border-[#D0D1D4] hover:border-[#070709]'
                    }`}
                    aria-label={quest.completed ? 'Reset quest' : 'Complete quest'}
                  >
                    {quest.completed && <Check weight="bold" className="w-4 h-4" />}
                  </button>

                  {/* Body Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3
                        className={`text-sm sm:text-base font-bold transition-colors ${
                          quest.completed ? 'line-through text-[#8B8B8B]' : 'text-[#070709]'
                        }`}
                      >
                        {quest.title}
                      </h3>
                      <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md border ${quest.domainColor}`}>
                        {quest.domain}
                      </span>
                      <span className="text-[11px] font-semibold text-[#8B8B8B]">
                        {quest.difficulty}
                      </span>
                    </div>
                    <p className="text-xs text-[#60606C] mt-1 leading-relaxed">
                      {quest.desc}
                    </p>
                  </div>

                  {/* Rewards */}
                  <div className="text-right shrink-0 text-xs font-bold tabular-nums">
                    <div className="text-[#C85A3D]">+{quest.xp} XP</div>
                    <div className="text-[#D9A441]">+{quest.gold} Gold</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Footer Replay Bar */}
            <div className="px-6 py-3.5 bg-[#F7F7F8] border-t border-[#E6E6E8] flex items-center justify-between text-xs text-[#8B8B8B]">
              <span>Click any quest to toggle completion state</span>
              <button
                type="button"
                onClick={handleReset}
                className="inline-flex items-center gap-1 font-semibold text-[#60606C] hover:text-[#070709] transition-colors cursor-pointer"
              >
                <ArrowClockwise weight="bold" className="w-3.5 h-3.5" />
                <span>Reset board</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
