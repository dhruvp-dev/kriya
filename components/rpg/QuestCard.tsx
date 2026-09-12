'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Pencil, Trash2, Repeat } from 'lucide-react';
import { Coins } from '@phosphor-icons/react';
import type { Quest, CompleteQuestResult } from '../../types/database.types';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { completeQuestAction, deleteQuestAction } from '../../lib/actions/quests';
import { useToast } from '../ui/Toast';

export interface QuestCardProps {
  quest: Quest;
  onEdit?: (quest: Quest) => void;
  onDeleted?: (questId: string) => void;
  onCompleteSuccess?: (result: CompleteQuestResult) => void;
}

const REWARD_MAP = {
  easy: { xp: 20, gold: 5 },
  medium: { xp: 50, gold: 15 },
  hard: { xp: 100, gold: 30 },
  epic: { xp: 200, gold: 60 },
};

export function QuestCard({ quest, onEdit, onDeleted, onCompleteSuccess }: QuestCardProps) {
  const [isCompleting, setIsCompleting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isCompletedState, setIsCompletedState] = useState(quest.status === 'completed');
  const { showToast } = useToast();

  const rewards = REWARD_MAP[quest.difficulty] || REWARD_MAP.easy;

  const handleComplete = async () => {
    if (isCompleting || isCompletedState) return;

    setIsCompleting(true);

    try {
      const res = await completeQuestAction(quest.id);

      if (!res.success) {
        setIsCompleting(false);
        showToast(res.error || 'Failed to complete quest.', 'error');
        return;
      }

      setIsCompletedState(true);
      setIsCompleting(false);

      if (onCompleteSuccess && res.data) {
        onCompleteSuccess(res.data);
      }
    } catch {
      setIsCompleting(false);
      showToast('Network error while completing quest.', 'error');
    }
  };

  const handleDelete = async () => {
    if (isDeleting) return;
    setIsDeleting(true);

    try {
      const res = await deleteQuestAction(quest.id);
      setIsDeleting(false);

      if (!res.success) {
        showToast(res.error || 'Failed to delete quest.', 'error');
        return;
      }

      showToast('Quest deleted.', 'info');
      if (onDeleted) {
        onDeleted(quest.id);
      }
    } catch {
      setIsDeleting(false);
      showToast('Network error while deleting quest.', 'error');
    }
  };

  return (
    <motion.div layout initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
      <Card
        className={`relative flex flex-col justify-between gap-5 p-6 transition-all ${
          isCompletedState
            ? 'opacity-60 bg-[#1F1B17]/40 border-[#332D26]'
            : 'hover:border-[#453D33]'
        }`}
      >
        {/* Header Row: Title & XP Reward */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-3">
            <div
              className={`w-5 h-5 rounded-full border-2 mt-0.5 shrink-0 flex items-center justify-center transition-colors ${
                isCompletedState
                  ? 'bg-emerald-500 border-emerald-500 text-white'
                  : 'border-[#453D33] bg-[#161310]'
              }`}
            >
              {isCompletedState && <Check className="w-3 h-3 stroke-[3]" />}
            </div>
            <div>
              <h3
                className={`text-base font-bold transition-colors ${
                  isCompletedState ? 'line-through text-[#A89F8F]' : 'text-[#F5F2ED]'
                }`}
              >
                {quest.title}
              </h3>

              {quest.description && (
                <p className="text-xs text-[#A89F8F] mt-1 line-clamp-2 leading-relaxed">
                  {quest.description}
                </p>
              )}
            </div>
          </div>

          <div className="flex flex-col items-end shrink-0">
            <span className="tabular-stat text-xs font-bold text-[#EA580C] bg-[#EA580C]/10 border border-[#EA580C]/20 px-2.5 py-1 rounded-lg">
              +{rewards.xp} XP
            </span>
          </div>
        </div>

        {/* Metadata Row: Category/Attribute, Difficulty, and Gold */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-[#332D26]/60">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant={quest.attribute}>{quest.attribute}</Badge>
            <Badge variant={quest.difficulty}>{quest.difficulty}</Badge>
            {quest.is_recurring && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
                <Repeat className="w-3 h-3" /> Daily
              </span>
            )}
          </div>

          <div className="flex items-center gap-3 text-xs font-bold">
            <span className="tabular-stat text-[#F59E0B] inline-flex items-center gap-1">
              <Coins weight="fill" size={14} /> +{rewards.gold} Gold
            </span>
          </div>
        </div>

        {/* Action Button Row */}
        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center gap-1">
            {!isCompletedState && onEdit && (
              <button
                onClick={() => onEdit(quest)}
                className="p-2 text-[#A89F8F] hover:text-[#F5F2ED] hover:bg-[#26221D] rounded-xl transition-colors"
                title="Edit quest"
              >
                <Pencil className="w-4 h-4" />
              </button>
            )}
            {!isCompletedState && (
              <button
                onClick={handleDelete}
                disabled={isDeleting}
                className="p-2 text-[#A89F8F] hover:text-rose-400 hover:bg-rose-500/10 rounded-xl transition-colors disabled:opacity-50"
                title="Delete quest"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
          </div>

          {!isCompletedState ? (
            <Button
              variant="primary"
              size="md"
              onClick={handleComplete}
              isLoading={isCompleting}
              className="w-full sm:w-auto"
            >
              <Check className="w-4 h-4 stroke-[3]" /> Complete Quest
            </Button>
          ) : (
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20">
              <Check className="w-4 h-4" /> Completed
            </span>
          )}
        </div>
      </Card>
    </motion.div>
  );
}
