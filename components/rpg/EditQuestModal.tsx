'use client';

import React, { useState, useEffect } from 'react';
import type { Quest, QuestDifficulty, AttributeType } from '../../types/database.types';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { Gauge } from 'lucide-react';
import { Sword, Brain, ShieldCheck, Sparkle } from '@phosphor-icons/react';
import { editQuestAction } from '../../lib/actions/quests';
import { useToast } from '../ui/Toast';

export interface EditQuestModalProps {
  quest: Quest | null;
  isOpen: boolean;
  onClose: () => void;
  onUpdated?: () => void;
}

const ATTRIBUTES_OPTIONS = [
  {
    id: 'strength',
    label: 'Strength',
    icon: Sword,
    color: 'text-rose-400',
    activeBg: 'bg-rose-500/20 border-rose-500 text-rose-300',
  },
  {
    id: 'intellect',
    label: 'Intellect',
    icon: Brain,
    color: 'text-sky-400',
    activeBg: 'bg-sky-500/20 border-sky-500 text-sky-300',
  },
  {
    id: 'discipline',
    label: 'Discipline',
    icon: ShieldCheck,
    color: 'text-teal-400',
    activeBg: 'bg-teal-500/20 border-teal-500 text-teal-300',
  },
  {
    id: 'creativity',
    label: 'Creativity',
    icon: Sparkle,
    color: 'text-pink-400',
    activeBg: 'bg-pink-500/20 border-pink-500 text-pink-300',
  },
] as const;

export function EditQuestModal({ quest, isOpen, onClose, onUpdated }: EditQuestModalProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [difficulty, setDifficulty] = useState<QuestDifficulty>('medium');
  const [attribute, setAttribute] = useState<AttributeType>('intellect');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { showToast } = useToast();

  useEffect(() => {
    if (quest) {
      setTitle(quest.title);
      setDescription(quest.description || '');
      setCategory(quest.category);
      setDifficulty(quest.difficulty);
      setAttribute(quest.attribute);
    }
  }, [quest]);

  if (!quest) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      showToast('Quest title cannot be empty.', 'error');
      return;
    }

    setIsSubmitting(true);
    const res = await editQuestAction(quest.id, {
      title: title.trim(),
      description: description.trim(),
      category: category.trim(),
      difficulty,
      attribute,
    });

    setIsSubmitting(false);

    if (!res.success) {
      showToast(res.error || 'Failed to update quest.', 'error');
      return;
    }

    showToast('Quest updated successfully!', 'success');
    onClose();
    if (onUpdated) onUpdated();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Edit Quest">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1">
            Quest Title <span className="text-rose-400">*</span>
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
            required
            maxLength={120}
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={2}
            className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1">Category</label>
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-sm text-slate-100 focus:outline-none focus:border-indigo-500 capitalize"
          />
        </div>

        {/* Target Attribute Visual Selector */}
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1.5">Attribute</label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {ATTRIBUTES_OPTIONS.map((attr) => {
              const IconComp = attr.icon;
              const isSelected = attribute === attr.id;
              return (
                <button
                  key={attr.id}
                  type="button"
                  onClick={() => setAttribute(attr.id as AttributeType)}
                  className={`flex items-center justify-center gap-1.5 py-2 px-2 rounded-xl text-xs font-semibold border transition-all ${
                    isSelected
                      ? attr.activeBg
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:bg-slate-800'
                  }`}
                >
                  <IconComp weight="fill" className={`w-3.5 h-3.5 ${attr.color}`} />
                  <span>{attr.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Difficulty Visual Selector */}
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1.5">Difficulty</label>
          <div className="grid grid-cols-4 gap-2">
            {(['easy', 'medium', 'hard', 'epic'] as QuestDifficulty[]).map((d) => (
              <button
                key={d}
                type="button"
                onClick={() => setDifficulty(d)}
                className={`flex items-center justify-center gap-1 py-2 px-1 text-center rounded-xl text-xs font-semibold border capitalize transition-all ${
                  difficulty === d
                    ? 'bg-indigo-600/20 border-indigo-500 text-indigo-300'
                    : 'bg-slate-950 border-slate-800 text-slate-400 hover:bg-slate-800'
                }`}
              >
                <Gauge className="w-3 h-3 text-indigo-400" />
                <span>{d}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
          <Button type="button" variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" variant="primary" isLoading={isSubmitting}>
            Save Changes
          </Button>
        </div>
      </form>
    </Modal>
  );
}

