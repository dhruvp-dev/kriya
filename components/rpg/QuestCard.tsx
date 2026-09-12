'use client';

import React, { useState } from 'react';
import { Check } from 'lucide-react';
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

export function QuestCard({
  quest,
  onComplete,
}: QuestCardProps) {
  const [isCompleting, setIsCompleting] = useState(false);
  const [showRewardToast, setShowRewardToast] = useState(false);

  const formatCapital = (s: string) => s.charAt(0).toUpperCase() + s.slice(1).toLowerCase();

  const handleCompleteClick = () => {
    if (quest.completed || isCompleting) return;
    setIsCompleting(true);
    setShowRewardToast(true);

    setTimeout(() => {
      if (onComplete) onComplete(quest.id);
      setIsCompleting(false);
    }, 250);

    setTimeout(() => {
      setShowRewardToast(false);
    }, 2000);
  };

  return (
    <div
      className={cn(
        'relative bg-[#FFFFFF] border rounded-xl p-4 sm:p-5 transition-all duration-150 font-sans group',
        quest.completed
          ? 'bg-[#FAF8F5]/60 border-[#E6E6E8] opacity-75'
          : 'border-[#E6E6E8] hover:border-[#D0D1D4] shadow-2xs hover:shadow-subtle-elevation'
      )}
    >
      {/* Subtle completion reward toast */}
      {showRewardToast && (
        <div className="absolute -top-3 right-6 z-20 flex items-center gap-2 px-3 py-1 bg-[#070709] text-white text-xs font-semibold rounded-lg shadow-md animate-fadeIn">
          <span className="text-[#668F72]">+{quest.xp} XP</span>
          <span className="text-[#D9A441]">+{quest.gold} Gold</span>
        </div>
      )}

      <div className="flex items-center justify-between gap-4">
        
        {/* Left: Checkbox & Quest Content */}
        <div className="flex items-start gap-3.5 flex-1 min-w-0">
          <button
            type="button"
            onClick={handleCompleteClick}
            disabled={quest.completed}
            className={cn(
              'mt-0.5 w-5 h-5 rounded-md border flex items-center justify-center transition-colors shrink-0 cursor-pointer',
              quest.completed
                ? 'bg-[#668F72] border-[#668F72] text-white'
                : 'border-[#D0D1D4] bg-[#FFFFFF] hover:border-[#070709]'
            )}
            aria-label="Toggle quest completion"
          >
            {quest.completed && <Check className="w-3.5 h-3.5 stroke-[2.5]" />}
          </button>

          <div className="flex flex-col min-w-0 flex-1 space-y-0.5">
            <h3
              className={cn(
                'text-sm sm:text-base font-semibold text-[#151515] leading-snug tracking-tight truncate',
                quest.completed && 'line-through text-[#8B8B8B]'
              )}
            >
              {quest.title}
            </h3>

            {quest.description && (
              <p
                className={cn(
                  'text-xs text-[#60606C] leading-relaxed line-clamp-1',
                  quest.completed && 'line-through opacity-70'
                )}
              >
                {quest.description}
              </p>
            )}

            {/* Restrained Metadata: Attribute · Difficulty */}
            <div className="flex items-center gap-1.5 text-xs text-[#8B8B8B] pt-0.5">
              <span>{formatCapital(quest.attribute)}</span>
              <span>·</span>
              <span>{formatCapital(quest.difficulty)}</span>
            </div>
          </div>
        </div>

        {/* Right: Reward Numbers + Complete Action Button */}
        <div className="flex items-center gap-4 shrink-0">
          {/* Rewards */}
          <div className="hidden sm:flex items-center gap-2.5 text-xs font-semibold tabular-nums">
            <span className="text-[#070709]">+{quest.xp} XP</span>
            <span className="text-[#D9A441]">+{quest.gold} Gold</span>
          </div>

          {/* Action Button */}
          {!quest.completed ? (
            <button
              type="button"
              onClick={handleCompleteClick}
              disabled={isCompleting}
              className="px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-[#F3F4F5] hover:bg-[#070709] hover:text-[#FFFFFF] text-[#070709] transition-all cursor-pointer active:scale-[0.98]"
            >
              Complete
            </button>
          ) : (
            <span className="inline-flex items-center gap-1 text-xs font-medium text-[#668F72] px-2.5 py-1 bg-[#F1F6F3] rounded-md">
              <Check className="w-3.5 h-3.5 stroke-[2]" />
              <span>Done</span>
            </span>
          )}
        </div>

      </div>
    </div>
  );
}
