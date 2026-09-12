'use client';

import React, { useState } from 'react';
import {
  BookOpen,
  PersonSimpleRun,
  GraduationCap,
  Hammer,
  Palette,
  Check,
  Sparkle,
  ArrowRight,
  Lightning,
} from '@phosphor-icons/react';

interface GoalTemplate {
  id: string;
  label: string;
  questTitle: string;
  domain: string;
  difficulty: 'Quick' | 'Medium' | 'High';
  xp: number;
  gold: number;
  desc: string;
  icon: any;
  domainColor: string;
}

const GOALS: GoalTemplate[] = [
  {
    id: 'read',
    label: 'Read more',
    questTitle: 'Read 25 pages of non-fiction',
    domain: 'Intellect',
    difficulty: 'Medium',
    xp: 50,
    gold: 15,
    desc: 'Quiet morning reading session and intentional core note capture.',
    icon: BookOpen,
    domainColor: 'text-[#070709] bg-[#F3F4F5] border-[#E6E6E8]',
  },
  {
    id: 'exercise',
    label: 'Exercise',
    questTitle: '5km tempo interval run',
    domain: 'Strength',
    difficulty: 'High',
    xp: 100,
    gold: 30,
    desc: 'Aerobic pacing threshold, mobility cool-down, and stamina builder.',
    icon: PersonSimpleRun,
    domainColor: 'text-[#C85A3D] bg-[#FDF4F2] border-[#C85A3D]/30',
  },
  {
    id: 'learn',
    label: 'Learn something',
    questTitle: 'Study distributed consensus algorithms',
    domain: 'Intellect',
    difficulty: 'High',
    xp: 120,
    gold: 35,
    desc: 'Uninterrupted 60-minute deep study block with synthesized notes.',
    icon: GraduationCap,
    domainColor: 'text-[#070709] bg-[#F3F4F5] border-[#E6E6E8]',
  },
  {
    id: 'build',
    label: 'Build something',
    questTitle: 'Ship auth middleware & test suite',
    domain: 'Discipline',
    difficulty: 'High',
    xp: 150,
    gold: 45,
    desc: 'Focus block executing clean production logic and verified test specs.',
    icon: Hammer,
    domainColor: 'text-[#668F72] bg-[#F1F6F3] border-[#668F72]/30',
  },
  {
    id: 'create',
    label: 'Create',
    questTitle: 'Draft editorial chapter & typography layout',
    domain: 'Creativity',
    difficulty: 'Medium',
    xp: 80,
    gold: 25,
    desc: 'Creative synthesis turning raw ideas into a polished publishable piece.',
    icon: Palette,
    domainColor: 'text-[#D9A441] bg-[#FBF5EA] border-[#D9A441]/30',
  },
];

export function HabitToQuestGenerator() {
  const [selectedGoalId, setSelectedGoalId] = useState<string>('read');
  const [completed, setCompleted] = useState<Record<string, boolean>>({});
  const [showToast, setShowToast] = useState(false);

  const activeGoal = GOALS.find((g) => g.id === selectedGoalId) || GOALS[0];
  const isDone = !!completed[activeGoal.id];

  const handleToggleComplete = () => {
    if (!isDone) {
      setCompleted((prev) => ({ ...prev, [activeGoal.id]: true }));
      setShowToast(true);
      setTimeout(() => setShowToast(false), 2200);
    } else {
      setCompleted((prev) => ({ ...prev, [activeGoal.id]: false }));
      setShowToast(false);
    }
  };

  return (
    <section className="py-16 md:py-24 bg-[#FFFFFF] border-y border-[#E6E6E8]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header Prompt */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.18em] text-[#C85A3D]">
            <Sparkle weight="fill" className="w-3.5 h-3.5 text-[#D9A441]" />
            <span>REAL-WORLD TRANSFORMATION</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#070709] tracking-[-0.03em]">
            WHAT ARE YOU WORKING ON?
          </h2>

          <p className="text-sm sm:text-base text-[#60606C] max-w-lg mx-auto leading-relaxed">
            Pick a focus area below. See how KRIYA instantly translates everyday discipline into calibrated progression.
          </p>
        </div>

        {/* Interactive Goal Pills */}
        <div className="flex items-center justify-center gap-2.5 flex-wrap">
          {GOALS.map((goal) => {
            const isSelected = selectedGoalId === goal.id;
            return (
              <button
                key={goal.id}
                type="button"
                onClick={() => setSelectedGoalId(goal.id)}
                className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#070709] ${
                  isSelected
                    ? 'bg-[#070709] text-white shadow-md scale-105'
                    : 'bg-[#F7F7F8] hover:bg-[#F3F4F5] text-[#60606C] hover:text-[#070709] border border-[#E6E6E8]'
                }`}
              >
                {goal.label}
              </button>
            );
          })}
        </div>

        {/* Live Generated Quest Card Preview */}
        <div className="max-w-2xl mx-auto">
          <div
            className={`relative rounded-3xl border p-6 sm:p-7 transition-all duration-300 ${
              isDone
                ? 'bg-[#F1F6F3] border-[#668F72]/40 shadow-md'
                : 'bg-[#F7F7F8] border-[#E6E6E8] shadow-sm'
            }`}
          >
            {/* Reward Toast Animation */}
            {showToast && (
              <div className="absolute -top-4 right-6 z-30 flex items-center gap-2 px-3.5 py-1.5 bg-[#070709] text-white text-xs font-bold rounded-full shadow-xl animate-bounce">
                <Sparkle weight="fill" className="w-3.5 h-3.5 text-[#D9A441]" />
                <span className="text-[#668F72] tabular-nums">+{activeGoal.xp} XP</span>
                <span className="text-[#D9A441] tabular-nums">+{activeGoal.gold} Gold</span>
              </div>
            )}

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E6E6E8]">
              <div className="flex items-center gap-3">
                <span className="text-xs font-extrabold uppercase tracking-widest text-[#8B8B8B]">
                  Generated Quest
                </span>
                <span
                  className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md border ${activeGoal.domainColor}`}
                >
                  {activeGoal.domain}
                </span>
                <span className="text-[11px] font-semibold text-[#8B8B8B]">
                  {activeGoal.difficulty}
                </span>
              </div>

              <div className="flex items-center gap-2 text-xs font-extrabold tabular-nums self-end sm:self-auto">
                <span className="text-[#C85A3D]">+{activeGoal.xp} XP</span>
                <span className="text-[#D9A441]">+{activeGoal.gold} Gold</span>
              </div>
            </div>

            {/* Quest Content */}
            <div className="py-4 space-y-2">
              <h3
                className={`text-lg sm:text-xl font-black tracking-tight transition-colors ${
                  isDone ? 'line-through text-[#8B8B8B]' : 'text-[#070709]'
                }`}
              >
                {activeGoal.questTitle}
              </h3>
              <p className="text-xs sm:text-sm text-[#60606C] leading-relaxed">
                {activeGoal.desc}
              </p>
            </div>

            {/* Interactive Action Bar */}
            <div className="pt-4 border-t border-[#E6E6E8] flex items-center justify-between">
              <span className="text-xs text-[#8B8B8B]">
                {isDone ? 'Quest marked completed' : 'Click to test real-world validation'}
              </span>

              <button
                type="button"
                onClick={handleToggleComplete}
                className={`inline-flex items-center gap-2 text-xs font-bold px-4 py-2 rounded-xl transition-all cursor-pointer shadow-xs active:scale-[0.98] ${
                  isDone
                    ? 'bg-white border border-[#E6E6E8] text-[#60606C] hover:text-[#070709]'
                    : 'bg-[#070709] hover:bg-[#202025] text-white'
                }`}
              >
                {isDone ? (
                  <>
                    <Check weight="bold" className="w-3.5 h-3.5 text-[#668F72]" />
                    <span>Reset Quest</span>
                  </>
                ) : (
                  <>
                    <Lightning weight="fill" className="w-3.5 h-3.5 text-[#D9A441]" />
                    <span>Complete Quest</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
