'use client';

import React, { useState } from 'react';
import type { QuestDifficulty, AttributeType } from '../../types/database.types';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { createQuestAction } from '../../lib/actions/quests';
import { useToast } from '../ui/Toast';
import { Coins, Sparkle } from '@phosphor-icons/react';

export interface CreateQuestModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreated?: () => void;
}

const REWARD_MAP = {
  easy: { xp: 20, gold: 5 },
  medium: { xp: 50, gold: 15 },
  hard: { xp: 100, gold: 30 },
  epic: { xp: 200, gold: 60 },
};

export function CreateQuestModal({ isOpen, onClose, onCreated }: CreateQuestModalProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('general');
  const [difficulty, setDifficulty] = useState<QuestDifficulty>('medium');
  const [attribute, setAttribute] = useState<AttributeType>('intellect');
  const [isRecurring, setIsRecurring] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { showToast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      showToast('Quest title cannot be empty.', 'error');
      return;
    }

    setIsSubmitting(true);
    const res = await createQuestAction({
      title: title.trim(),
      description: description.trim(),
      category: category.trim() || 'general',
      difficulty,
      attribute,
      is_recurring: isRecurring,
      recurrence: isRecurring ? 'daily' : 'none',
    });

    setIsSubmitting(false);

    if (!res.success) {
      showToast(res.error || 'Failed to create quest.', 'error');
      return;
    }

    showToast('Quest created successfully!', 'success');
    setTitle('');
    setDescription('');
    setCategory('general');
    setDifficulty('medium');
    setAttribute('intellect');
    setIsRecurring(false);
    onClose();
    if (onCreated) onCreated();
  };

  const currentRewards = REWARD_MAP[difficulty];

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Create New Quest">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1">
            Quest Title <span className="text-rose-400">*</span>
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Read 30 minutes of technical book"
            className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
            required
            maxLength={120}
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1">
            Description (Optional)
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Details or notes about your task..."
            rows={2}
            className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Category</label>
            <input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder="coding, fitness, health..."
              className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 capitalize"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Target Attribute
            </label>
            <select
              value={attribute}
              onChange={(e) => setAttribute(e.target.value as AttributeType)}
              className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-sm text-slate-100 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 capitalize"
            >
              <option value="strength">Strength</option>
              <option value="intellect">Intellect</option>
              <option value="discipline">Discipline</option>
              <option value="creativity">Creativity</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1.5">
            Difficulty Level (Reward Tier)
          </label>
          <div className="grid grid-cols-4 gap-2">
            {(['easy', 'medium', 'hard', 'epic'] as QuestDifficulty[]).map((d) => (
              <button
                key={d}
                type="button"
                onClick={() => setDifficulty(d)}
                className={`py-2 px-1 text-center rounded-xl text-xs font-semibold border capitalize transition-all ${
                  difficulty === d
                    ? d === 'easy'
                      ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300 shadow-md shadow-emerald-500/10'
                      : d === 'medium'
                      ? 'bg-blue-500/20 border-blue-500 text-blue-300 shadow-md shadow-blue-500/10'
                      : d === 'hard'
                      ? 'bg-purple-500/20 border-purple-500 text-purple-300 shadow-md shadow-purple-500/10'
                      : 'bg-amber-500/20 border-amber-500 text-amber-300 shadow-md shadow-amber-500/10'
                    : 'bg-slate-950 border-slate-800 text-slate-400 hover:bg-slate-800'
                }`}
              >
                {d}
              </button>
            ))}
          </div>
        </div>

        <div className="p-3 bg-slate-950/60 border border-slate-800 rounded-xl flex items-center justify-between text-xs">
          <span className="text-slate-400 font-medium">Server Reward Preview:</span>
          <div className="flex items-center gap-3 font-semibold">
            <span className="text-purple-400">+{currentRewards.xp} XP</span>
            <span className="text-amber-400 flex items-center gap-1">
              <Coins weight="fill" size={14} /> +{currentRewards.gold} Gold
            </span>
            <span className="text-emerald-400 flex items-center gap-1">
              <Sparkle weight="fill" size={14} /> +1 {attribute}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 pt-1">
          <input
            type="checkbox"
            id="is_recurring"
            checked={isRecurring}
            onChange={(e) => setIsRecurring(e.target.checked)}
            className="w-4 h-4 rounded border-slate-700 bg-slate-950 text-indigo-600 focus:ring-indigo-500"
          />
          <label htmlFor="is_recurring" className="text-xs text-slate-300 cursor-pointer">
            Make this a Daily Recurring Quest (resets status daily)
          </label>
        </div>

        <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
          <Button type="button" variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" variant="primary" isLoading={isSubmitting}>
            Create Quest
          </Button>
        </div>
      </form>
    </Modal>
  );
}
