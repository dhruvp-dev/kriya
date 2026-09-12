'use client';

import React, { useState } from 'react';
import { Modal } from '../ui/Modal';
import { Coins, Sparkles, X } from 'lucide-react';
import { useToast } from '../ui/Toast';

export interface CreateQuestModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreated?: (newQuest: any) => void;
  onCreateQuest?: (newQuest: any) => void;
}

const REWARD_MAP = {
  EASY: { xp: 20, gold: 5 },
  MEDIUM: { xp: 50, gold: 15 },
  HARD: { xp: 100, gold: 30 },
  EPIC: { xp: 200, gold: 60 },
};

export function CreateQuestModal({ isOpen, onClose, onCreated, onCreateQuest }: CreateQuestModalProps) {
  const handleQuestCreated = onCreated || onCreateQuest;
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [attribute, setAttribute] = useState<'strength' | 'intellect' | 'discipline' | 'creativity'>('intellect');
  const [difficulty, setDifficulty] = useState<'EASY' | 'MEDIUM' | 'HARD' | 'EPIC'>('MEDIUM');
  const [subtaskInput, setSubtaskInput] = useState('');
  const [subtasks, setSubtasks] = useState<string[]>([]);
  const { showToast } = useToast();

  const handleAddSubtask = () => {
    if (!subtaskInput.trim()) return;
    setSubtasks([...subtasks, subtaskInput.trim()]);
    setSubtaskInput('');
  };

  const handleRemoveSubtask = (index: number) => {
    setSubtasks(subtasks.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      showToast('Quest title is required.', 'error');
      return;
    }

    const reward = REWARD_MAP[difficulty];

    if (handleQuestCreated) {
      handleQuestCreated({
        title: title.trim(),
        description: description.trim(),
        attribute,
        difficulty,
        xp: reward.xp,
        gold: reward.gold,
        subtasks: subtasks.length > 0 ? subtasks : undefined,
      });
    }

    showToast('New Quest created!', 'success');
    setTitle('');
    setDescription('');
    setSubtasks([]);
    onClose();
  };

  const currentRewards = REWARD_MAP[difficulty];

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Create New Quest">
      <form onSubmit={handleSubmit} className="space-y-4 font-sans">
        {/* Title */}
        <div>
          <label className="text-xs font-semibold text-[#171A21] block mb-1">
            Quest Title <span className="text-[#F05A3C]">*</span>
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Build API integration module"
            className="w-full px-3.5 py-2.5 bg-[#FFFFFF] border border-[#E5E1D9] rounded-lg text-sm text-[#171A21] placeholder-[#A8A29E] focus:outline-none focus:border-[#F05A3C] focus:ring-1 focus:ring-[#F05A3C]"
            required
          />
        </div>

        {/* Description */}
        <div>
          <label className="text-xs font-semibold text-[#171A21] block mb-1">Description (Optional)</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Define objectives and notes..."
            rows={2}
            className="w-full px-3.5 py-2.5 bg-[#FFFFFF] border border-[#E5E1D9] rounded-lg text-sm text-[#171A21] placeholder-[#A8A29E] focus:outline-none focus:border-[#F05A3C] focus:ring-1 focus:ring-[#F05A3C]"
          />
        </div>

        {/* Subtasks */}
        <div>
          <label className="text-xs font-semibold text-[#171A21] block mb-1">Subtasks / Checklist</label>
          <div className="flex items-center gap-2 mb-2">
            <input
              type="text"
              value={subtaskInput}
              onChange={(e) => setSubtaskInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleAddSubtask();
                }
              }}
              placeholder="e.g. Setup authentication endpoints"
              className="flex-1 px-3 py-1.5 bg-[#FFFFFF] border border-[#E5E1D9] rounded-md text-xs text-[#171A21] placeholder-[#A8A29E] focus:outline-none focus:border-[#F05A3C]"
            />
            <button
              type="button"
              onClick={handleAddSubtask}
              className="px-3 py-1.5 bg-[#F7F5F0] border border-[#E5E1D9] hover:bg-[#EFECE6] text-xs font-bold text-[#171A21] rounded-md transition-colors"
            >
              Add
            </button>
          </div>

          {subtasks.length > 0 && (
            <div className="space-y-1 pl-1">
              {subtasks.map((st, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between text-xs text-[#686C73] bg-[#F7F5F0] px-2.5 py-1 rounded border border-[#E5E1D9]"
                >
                  <span>• {st}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveSubtask(idx)}
                    className="text-[#686C73] hover:text-[#DC2626]"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Attribute & Difficulty Grid */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-semibold text-[#171A21] block mb-1">Target Attribute</label>
            <select
              value={attribute}
              onChange={(e) => setAttribute(e.target.value as any)}
              className="w-full px-3 py-2 bg-[#FFFFFF] border border-[#E5E1D9] rounded-lg text-xs font-semibold text-[#171A21] focus:outline-none focus:border-[#F05A3C]"
            >
              <option value="strength">Strength (Red)</option>
              <option value="intellect">Intellect (Blue)</option>
              <option value="discipline">Discipline (Green)</option>
              <option value="creativity">Creativity (Purple)</option>
            </select>
          </div>

          <div>
            <label className="text-xs font-semibold text-[#171A21] block mb-1">Difficulty</label>
            <select
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value as any)}
              className="w-full px-3 py-2 bg-[#FFFFFF] border border-[#E5E1D9] rounded-lg text-xs font-semibold text-[#171A21] focus:outline-none focus:border-[#F05A3C]"
            >
              <option value="EASY">Easy (+20 XP)</option>
              <option value="MEDIUM">Medium (+50 XP)</option>
              <option value="HARD">Hard (+100 XP)</option>
              <option value="EPIC">Epic (+200 XP)</option>
            </select>
          </div>
        </div>

        {/* Reward Output Preview */}
        <div className="p-3 bg-[#F7F5F0] border border-[#E5E1D9] rounded-lg flex items-center justify-between text-xs font-medium">
          <span className="text-[#686C73]">Reward preview:</span>
          <div className="flex items-center gap-3 font-technical font-bold text-[#D97706]">
            <span className="flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-[#FFB547]" />
              +{currentRewards.xp} XP
            </span>
            <span className="flex items-center gap-1">
              <Coins className="w-3.5 h-3.5 text-[#FFB547]" />
              +{currentRewards.gold} Gold
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#E5E1D9]">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-bold text-[#686C73] hover:text-[#171A21] transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-5 py-2 bg-[#F05A3C] hover:bg-[#D9482D] text-white text-xs font-bold rounded-lg transition-colors shadow-2xs"
          >
            Create Quest
          </button>
        </div>
      </form>
    </Modal>
  );
}
