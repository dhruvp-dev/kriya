'use client';

import React, { useState, useEffect } from 'react';
import type { Quest, QuestDifficulty, AttributeType } from '../../types/database.types';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { editQuestAction } from '../../lib/actions/quests';
import { useToast } from '../ui/Toast';

export interface EditQuestModalProps {
  quest: Quest | null;
  isOpen: boolean;
  onClose: () => void;
  onUpdated?: () => void;
}

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

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Category</label>
            <input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-sm text-slate-100 focus:outline-none focus:border-indigo-500 capitalize"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Attribute</label>
            <select
              value={attribute}
              onChange={(e) => setAttribute(e.target.value as AttributeType)}
              className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-sm text-slate-100 focus:outline-none focus:border-indigo-500 capitalize"
            >
              <option value="strength">Strength</option>
              <option value="intellect">Intellect</option>
              <option value="discipline">Discipline</option>
              <option value="creativity">Creativity</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1.5">Difficulty</label>
          <div className="grid grid-cols-4 gap-2">
            {(['easy', 'medium', 'hard', 'epic'] as QuestDifficulty[]).map((d) => (
              <button
                key={d}
                type="button"
                onClick={() => setDifficulty(d)}
                className={`py-2 px-1 text-center rounded-xl text-xs font-semibold border capitalize transition-all ${
                  difficulty === d
                    ? 'bg-indigo-600/20 border-indigo-500 text-indigo-300'
                    : 'bg-slate-950 border-slate-800 text-slate-400 hover:bg-slate-800'
                }`}
              >
                {d}
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
