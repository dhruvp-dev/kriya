'use client';

import React, { useState } from 'react';
import { Check, CheckSquare, Square, Gauge, Zap, Coins, CheckCircle2 } from 'lucide-react';
import { Sword, Brain, ShieldCheck, Sparkle } from '@phosphor-icons/react';
import { cn } from '../../lib/utils/cn';

export interface Subtask {
  id: string;
  title: string;
  completed: boolean;
}

export interface QuestItem {
  id: string;
  title: string;
  description?: string;
  attribute: 'strength' | 'intellect' | 'discipline' | 'creativity';
  difficulty: 'EASY' | 'MEDIUM' | 'HARD' | 'EPIC';
  xp: number;
  gold: number;
  completed: boolean;
  subtasks?: Subtask[];
}

export interface QuestCardProps {
  quest: QuestItem;
  onComplete?: (questId: string) => void;
  onToggleSubtask?: (questId: string, subtaskId: string) => void;
  onEdit?: (quest: QuestItem) => void;
  onDelete?: (questId: string) => void;
}

const ATTRIBUTE_CONFIG = {
  strength: {
    name: 'STRENGTH',
    color: 'text-[#C85A3D]',
    bg: 'bg-[#C85A3D]/10',
    border: 'border-[#C85A3D]/20',
    icon: <Sword weight="fill" className="w-3.5 h-3.5 text-[#C85A3D]" />,
  },
  intellect: {
    name: 'INTELLECT',
    color: 'text-[#344653]',
    bg: 'bg-[#344653]/10',
    border: 'border-[#344653]/20',
    icon: <Brain weight="fill" className="w-3.5 h-3.5 text-[#344653]" />,
  },
  discipline: {
    name: 'DISCIPLINE',
    color: 'text-[#668F72]',
    bg: 'bg-[#668F72]/10',
    border: 'border-[#668F72]/20',
    icon: <ShieldCheck weight="fill" className="w-3.5 h-3.5 text-[#668F72]" />,
  },
  creativity: {
    name: 'CREATIVITY',
    color: 'text-[#D9A441]',
    bg: 'bg-[#D9A441]/10',
    border: 'border-[#D9A441]/20',
    icon: <Sparkle weight="fill" className="w-3.5 h-3.5 text-[#D9A441]" />,
  },
};

const DIFFICULTY_CONFIG = {
  EASY: { label: 'Easy', color: 'text-[#668F72] bg-[#668F72]/10 border-[#668F72]/20' },
  MEDIUM: { label: 'Medium', color: 'text-[#D9A441] bg-[#D9A441]/10 border-[#D9A441]/20' },
  HARD: { label: 'Hard', color: 'text-[#C85A3D] bg-[#C85A3D]/10 border-[#C85A3D]/20' },
  EPIC: { label: 'Epic', color: 'text-[#344653] bg-[#344653]/10 border-[#344653]/20' },
};

export function QuestCard({
  quest,
  onComplete,
  onToggleSubtask,
}: QuestCardProps) {
  const [isCompleting, setIsCompleting] = useState(false);

  const attrInfo = ATTRIBUTE_CONFIG[quest.attribute] || ATTRIBUTE_CONFIG.intellect;
  const diffInfo = DIFFICULTY_CONFIG[quest.difficulty] || DIFFICULTY_CONFIG.MEDIUM;

  const handleCompleteClick = () => {
    if (quest.completed || isCompleting) return;
    setIsCompleting(true);
    setTimeout(() => {
      if (onComplete) onComplete(quest.id);
      setIsCompleting(false);
    }, 200);
  };

  return (
    <div
      className={cn(
        'relative bg-[#FFFDF7] border rounded-xl p-5 transition-all duration-150 shadow-2xs group font-sans',
        quest.completed
          ? 'bg-[#F3F1E8] border-[#DFDDD2] opacity-70'
          : 'border-[#DFDDD2] hover:border-[#C5C3B8] hover:shadow-xs'
      )}
    >
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
        {/* Checkbox & Details */}
        <div className="flex items-start gap-3.5 flex-1 min-w-0">
          {/* Checkbox */}
          <button
            onClick={handleCompleteClick}
            disabled={quest.completed}
            className={cn(
              'mt-0.5 w-5 h-5 rounded border flex items-center justify-center transition-colors shrink-0',
              quest.completed
                ? 'bg-[#668F72] border-[#668F72] text-white'
                : 'border-[#C5C3B8] bg-[#F3F1E8] hover:border-[#C85A3D]'
            )}
            aria-label="Toggle complete"
          >
            {quest.completed && <Check className="w-3.5 h-3.5 stroke-[3]" />}
          </button>

          <div className="flex flex-col min-w-0 flex-1 space-y-1">
            {/* 1. Quest Title */}
            <h3
              className={cn(
                'text-base font-bold text-[#20231F] tracking-tight leading-snug',
                quest.completed && 'line-through text-[#70736B]'
              )}
            >
              {quest.title}
            </h3>

            {/* 2. Description */}
            {quest.description && (
              <p
                className={cn(
                  'text-xs text-[#70736B] leading-relaxed',
                  quest.completed && 'line-through opacity-70'
                )}
              >
                {quest.description}
              </p>
            )}

            {/* Subtasks if present */}
            {quest.subtasks && quest.subtasks.length > 0 && (
              <div className="mt-2.5 space-y-1 pl-1 border-l-2 border-[#DFDDD2]">
                {quest.subtasks.map((subtask) => (
                  <button
                    key={subtask.id}
                    onClick={() => onToggleSubtask && onToggleSubtask(quest.id, subtask.id)}
                    className="flex items-center gap-2 text-xs text-[#70736B] hover:text-[#20231F] transition-colors text-left"
                  >
                    {subtask.completed ? (
                      <CheckSquare className="w-3.5 h-3.5 text-[#668F72] shrink-0" />
                    ) : (
                      <Square className="w-3.5 h-3.5 text-[#A8A29E] shrink-0" />
                    )}
                    <span className={subtask.completed ? 'line-through text-[#A8A29E]' : ''}>
                      {subtask.title}
                    </span>
                  </button>
                ))}
              </div>
            )}

            {/* 3. Attribute + Difficulty & 4. Rewards (Iconic) */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-[#DFDDD2]/70 text-xs font-semibold">
              <div className="flex items-center gap-2">
                {/* Attribute Icon Badge */}
                <div
                  className={cn(
                    'inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md border text-[11px] font-extrabold uppercase tracking-wide',
                    attrInfo.bg,
                    attrInfo.border,
                    attrInfo.color
                  )}
                  title={`Attribute: ${attrInfo.name}`}
                >
                  {attrInfo.icon}
                  <span>{attrInfo.name}</span>
                </div>

                {/* Difficulty Gauge Badge */}
                <div
                  className={cn(
                    'inline-flex items-center gap-1 px-2 py-0.5 rounded-md border text-[11px] font-bold',
                    diffInfo.color
                  )}
                  title={`Difficulty: ${diffInfo.label}`}
                >
                  <Gauge className="w-3 h-3 shrink-0" />
                  <span>{diffInfo.label}</span>
                </div>
              </div>

              {/* Iconic Rewards */}
              <div className="flex items-center gap-3 font-technical text-xs font-bold">
                <span className="flex items-center gap-1 text-[#20231F]" title="Experience Points">
                  <Zap className="w-3.5 h-3.5 text-[#C85A3D] fill-[#C85A3D]" />
                  +{quest.xp} XP
                </span>
                <span className="flex items-center gap-1 text-[#D9A441]" title="Gold Reward">
                  <Coins className="w-3.5 h-3.5 text-[#D9A441]" />
                  +{quest.gold}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* 5. Primary Action: Complete Button with Icon */}
        <div className="flex flex-col items-end shrink-0 sm:self-center">
          {!quest.completed ? (
            <button
              onClick={handleCompleteClick}
              disabled={isCompleting}
              className="flex items-center gap-1.5 bg-[#C85A3D] hover:bg-[#A94730] text-white px-4 py-2 rounded-xl font-extrabold text-xs transition-all shadow-2xs active:translate-y-0.5 cursor-pointer"
            >
              <CheckCircle2 className="w-3.5 h-3.5 stroke-[2.5]" />
              <span>Complete</span>
            </button>
          ) : (
            <span className="inline-flex items-center gap-1 text-xs font-bold text-[#668F72] bg-[#F4F8F5] px-3 py-1.5 rounded-xl border border-[#668F72]/20">
              <Check className="w-3.5 h-3.5 stroke-[2.5]" />
              Completed
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

