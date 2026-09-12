'use client';

import React, { useState } from 'react';
import { Check, CheckSquare, Square } from 'lucide-react';
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

const ATTRIBUTE_COLOR = {
  strength: { name: 'STRENGTH', color: 'text-[#DC2626]', dotBg: 'bg-[#DC2626]' },
  intellect: { name: 'INTELLECT', color: 'text-[#2563EB]', dotBg: 'bg-[#2563EB]' },
  discipline: { name: 'DISCIPLINE', color: 'text-[#2E9B72]', dotBg: 'bg-[#2E9B72]' },
  creativity: { name: 'CREATIVITY', color: 'text-[#7C3AED]', dotBg: 'bg-[#7C3AED]' },
};

export function QuestCard({
  quest,
  onComplete,
  onToggleSubtask,
}: QuestCardProps) {
  const [isCompleting, setIsCompleting] = useState(false);

  const attrInfo = ATTRIBUTE_COLOR[quest.attribute] || ATTRIBUTE_COLOR.intellect;

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
        'relative bg-[#FFFFFF] border rounded-xl p-5 transition-all duration-150 shadow-2xs group font-sans',
        quest.completed
          ? 'bg-[#F7F5F0] border-[#E5E1D9] opacity-70'
          : 'border-[#E5E1D9] hover:border-[#C8C3B8] hover:shadow-xs'
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
                ? 'bg-[#2E9B72] border-[#2E9B72] text-white'
                : 'border-[#C8C3B8] bg-[#F7F5F0] hover:border-[#F05A3C]'
            )}
            aria-label="Toggle complete"
          >
            {quest.completed && <Check className="w-3.5 h-3.5 stroke-[3]" />}
          </button>

          <div className="flex flex-col min-w-0 flex-1 space-y-1">
            {/* 1. Quest Title */}
            <h3
              className={cn(
                'text-base font-bold text-[#171A21] tracking-tight leading-snug',
                quest.completed && 'line-through text-[#686C73]'
              )}
            >
              {quest.title}
            </h3>

            {/* 2. Description */}
            {quest.description && (
              <p
                className={cn(
                  'text-xs text-[#686C73] leading-relaxed',
                  quest.completed && 'line-through opacity-70'
                )}
              >
                {quest.description}
              </p>
            )}

            {/* Subtasks if present */}
            {quest.subtasks && quest.subtasks.length > 0 && (
              <div className="mt-2.5 space-y-1 pl-1 border-l-2 border-[#E5E1D9]">
                {quest.subtasks.map((subtask) => (
                  <button
                    key={subtask.id}
                    onClick={() => onToggleSubtask && onToggleSubtask(quest.id, subtask.id)}
                    className="flex items-center gap-2 text-xs text-[#686C73] hover:text-[#171A21] transition-colors text-left"
                  >
                    {subtask.completed ? (
                      <CheckSquare className="w-3.5 h-3.5 text-[#2E9B72] shrink-0" />
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

            {/* 3. Attribute + Difficulty & 4. Rewards */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-[#E5E1D9]/70 text-xs font-semibold">
              <div className="flex items-center gap-2 text-[#686C73]">
                <span className={cn('w-2 h-2 rounded-full', attrInfo.dotBg)} />
                <span className={attrInfo.color}>{attrInfo.name}</span>
                <span className="text-[#E5E1D9]">·</span>
                <span className="capitalize">{quest.difficulty.toLowerCase()}</span>
              </div>

              {/* Rewards */}
              <div className="flex items-center gap-3 font-technical text-xs font-bold">
                <span className="text-[#171A21]">+{quest.xp} XP</span>
                <span className="text-[#FFB547]">+{quest.gold} Gold</span>
              </div>
            </div>
          </div>
        </div>

        {/* 5. Primary Action: Complete Button (Action Coral #F05A3C) */}
        <div className="flex flex-col items-end shrink-0 sm:self-center">
          {!quest.completed ? (
            <button
              onClick={handleCompleteClick}
              disabled={isCompleting}
              className="bg-[#F05A3C] hover:bg-[#D9482B] text-white px-4 py-2 rounded-xl font-extrabold text-xs transition-all shadow-2xs active:translate-y-0.5 cursor-pointer"
            >
              Complete
            </button>
          ) : (
            <span className="text-xs font-bold text-[#2E9B72] bg-[#F0FDF4] px-3 py-1.5 rounded-xl border border-[#2E9B72]/20">
              Completed
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
