'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Repeat, Pencil, Trash2 } from 'lucide-react'; // Lucide for UI chrome per rule!
import { Coins, Sparkle } from '@phosphor-icons/react'; // Phosphor for game icons per rule!
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

    // Optimistic UI state
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
      showToast(`Quest Completed! +${res.data.xp_gained} XP, +${res.data.gold_gained} Gold`, 'success');

      if (onCompleteSuccess) {
        onCompleteSuccess(res.data);
      }
    } catch {
      setIsCompleting(false);
      showToast('An unexpected error occurred.', 'error');
    }
  };

  const handleDelete = async () => {
    if (isDeleting) return;
    if (!confirm(`Are you sure you want to delete "${quest.title}"?`)) return;

    setIsDeleting(true);
    const res = await deleteQuestAction(quest.id);
    setIsDeleting(false);

    if (!res.success) {
      showToast(res.error || 'Failed to delete quest.', 'error');
      return;
    }

    showToast('Quest deleted successfully.', 'info');
    if (onDeleted) {
      onDeleted(quest.id);
    }
  };

  return (
    <motion.div layout initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
      <Card
        className={`relative flex flex-col md:flex-row items-start md:items-center justify-between gap-4 p-5 transition-all ${
          isCompletedState
            ? 'opacity-60 bg-slate-900/40 border-slate-800'
            : 'hover:border-slate-700'
        }`}
      >
        <div className="flex-1 space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant={quest.difficulty}>{quest.difficulty}</Badge>
            <Badge variant={quest.attribute}>{quest.attribute}</Badge>
            {quest.is_recurring && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-indigo-500/10 text-indigo-400 border border-indigo-500/30">
                <Repeat className="w-3 h-3" /> Daily
              </span>
            )}
            <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">
              {quest.category}
            </span>
          </div>

          <h3
            className={`text-lg font-bold transition-colors ${
              isCompletedState ? 'line-through text-slate-400' : 'text-slate-100'
            }`}
          >
            {quest.title}
          </h3>

          {quest.description && (
            <p className="text-sm text-slate-400 line-clamp-2">{quest.description}</p>
          )}

          <div className="flex items-center gap-3 pt-1 text-xs font-semibold">
            <span className="text-purple-400 inline-flex items-center gap-1">
              +{rewards.xp} XP
            </span>
            <span className="text-amber-400 inline-flex items-center gap-1">
              <Coins weight="fill" size={14} /> +{rewards.gold} Gold
            </span>
            <span className="text-emerald-400 inline-flex items-center gap-1">
              <Sparkle weight="fill" size={14} /> +1 {quest.attribute}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 self-end md:self-center shrink-0">
          {!isCompletedState && (
            <>
              {onEdit && (
                <button
                  onClick={() => onEdit(quest)}
                  className="p-2 text-slate-400 hover:text-slate-200 hover:bg-slate-800 rounded-xl transition-colors"
                  title="Edit quest"
                >
                  <Pencil className="w-4 h-4" />
                </button>
              )}
              <button
                onClick={handleDelete}
                disabled={isDeleting}
                className="p-2 text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 rounded-xl transition-colors disabled:opacity-50"
                title="Delete quest"
              >
                <Trash2 className="w-4 h-4" />
              </button>

              <Button
                variant="primary"
                size="md"
                onClick={handleComplete}
                isLoading={isCompleting}
                className="bg-emerald-600 hover:bg-emerald-500 shadow-emerald-600/25"
              >
                <Check className="w-4 h-4 stroke-[3]" /> Complete
              </Button>
            </>
          )}

          {isCompletedState && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/30">
              <Check className="w-4 h-4" /> Completed
            </span>
          )}
        </div>
      </Card>
    </motion.div>
  );
}
