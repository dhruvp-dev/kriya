'use client';

import React, { useState } from 'react';
import { Modal } from '../ui/Modal';
import { Coins, Sparkles, X, Gauge } from 'lucide-react';
import { Sword, Brain, ShieldCheck, Sparkle } from '@phosphor-icons/react';
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

const ATTRIBUTES_OPTIONS = [
  {
    id: 'strength',
    label: 'Strength',
    icon: Sword,
    color: 'text-[#C85A3D]',
    activeBg: 'bg-[#C85A3D]/10 border-[#C85A3D]',
  },
  {
    id: 'intellect',
    label: 'Intellect',
    icon: Brain,
    color: 'text-[#344653]',
    activeBg: 'bg-[#344653]/10 border-[#344653]',
  },
  {
    id: 'discipline',
    label: 'Discipline',
    icon: ShieldCheck,
    color: 'text-[#668F72]',
    activeBg: 'bg-[#668F72]/10 border-[#668F72]',
  },
  {
    id: 'creativity',
    label: 'Creativity',
    icon: Sparkle,
    color: 'text-[#D9A441]',
    activeBg: 'bg-[#D9A441]/10 border-[#D9A441]',
  },
] as const;

const DIFFICULTY_OPTIONS = [
  { id: 'EASY', label: 'Easy', color: 'text-[#668F72]' },
  { id: 'MEDIUM', label: 'Medium', color: 'text-[#D9A441]' },
  { id: 'HARD', label: 'Hard', color: 'text-[#C85A3D]' },
  { id: 'EPIC', label: 'Epic', color: 'text-[#344653]' },
] as const;

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
          <label className="text-xs font-semibold text-[#20231F] block mb-1">
            Quest Title <span className="text-[#C85A3D]">*</span>
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Build API integration module"
            className="w-full px-3.5 py-2.5 bg-[#FFFDF7] border border-[#DFDDD2] rounded-lg text-sm text-[#20231F] placeholder-[#A8A29E] focus:outline-none focus:border-[#C85A3D] focus:ring-1 focus:ring-[#C85A3D]"
            required
          />
        </div>

        {/* Description */}
        <div>
          <label className="text-xs font-semibold text-[#20231F] block mb-1">Description (Optional)</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Define objectives and notes..."
            rows={2}
            className="w-full px-3.5 py-2.5 bg-[#FFFDF7] border border-[#DFDDD2] rounded-lg text-sm text-[#20231F] placeholder-[#A8A29E] focus:outline-none focus:border-[#C85A3D] focus:ring-1 focus:ring-[#C85A3D]"
          />
        </div>

        {/* Subtasks */}
        <div>
          <label className="text-xs font-semibold text-[#20231F] block mb-1">Subtasks / Checklist</label>
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
              className="flex-1 px-3 py-1.5 bg-[#FFFDF7] border border-[#DFDDD2] rounded-md text-xs text-[#20231F] placeholder-[#A8A29E] focus:outline-none focus:border-[#C85A3D]"
            />
            <button
              type="button"
              onClick={handleAddSubtask}
              className="px-3 py-1.5 bg-[#F3F1E8] border border-[#DFDDD2] hover:bg-[#EBE8DD] text-xs font-bold text-[#20231F] rounded-md transition-colors"
            >
              Add
            </button>
          </div>

          {subtasks.length > 0 && (
            <div className="space-y-1 pl-1">
              {subtasks.map((st, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between text-xs text-[#70736B] bg-[#F3F1E8] px-2.5 py-1 rounded border border-[#DFDDD2]"
                >
                  <span>• {st}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveSubtask(idx)}
                    className="text-[#70736B] hover:text-[#C85A3D]"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Iconic Target Attribute Selector */}
        <div>
          <label className="text-xs font-semibold text-[#20231F] block mb-1.5">Target Attribute</label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {ATTRIBUTES_OPTIONS.map((attr) => {
              const IconComp = attr.icon;
              const isSelected = attribute === attr.id;
              return (
                <button
                  key={attr.id}
                  type="button"
                  onClick={() => setAttribute(attr.id as any)}
                  className={`flex items-center justify-center gap-2 p-2.5 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                    isSelected
                      ? attr.activeBg
                      : 'bg-[#FFFDF7] border-[#DFDDD2] text-[#70736B] hover:border-[#C5C3B8]'
                  }`}
                >
                  <IconComp weight="fill" className={`w-4 h-4 ${attr.color}`} />
                  <span className={isSelected ? 'text-[#20231F]' : 'text-[#70736B]'}>
                    {attr.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Iconic Difficulty Selector */}
        <div>
          <label className="text-xs font-semibold text-[#20231F] block mb-1.5">Difficulty</label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {DIFFICULTY_OPTIONS.map((diff) => {
              const isSelected = difficulty === diff.id;
              return (
                <button
                  key={diff.id}
                  type="button"
                  onClick={() => setDifficulty(diff.id as any)}
                  className={`flex items-center justify-center gap-1.5 p-2 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[#C85A3D]/10 border-[#C85A3D] text-[#20231F]'
                      : 'bg-[#FFFDF7] border-[#DFDDD2] text-[#70736B] hover:border-[#C5C3B8]'
                  }`}
                >
                  <Gauge className={`w-3.5 h-3.5 ${diff.color}`} />
                  <span>{diff.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Reward Output Preview */}
        <div className="p-3 bg-[#F3F1E8] border border-[#DFDDD2] rounded-lg flex items-center justify-between text-xs font-medium">
          <span className="text-[#70736B]">Reward preview:</span>
          <div className="flex items-center gap-3 font-technical font-bold text-[#D9A441]">
            <span className="flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-[#D9A441]" />
              +{currentRewards.xp} XP
            </span>
            <span className="flex items-center gap-1">
              <Coins className="w-3.5 h-3.5 text-[#D9A441]" />
              +{currentRewards.gold} Gold
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#DFDDD2]">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-bold text-[#70736B] hover:text-[#20231F] transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-5 py-2 bg-[#C85A3D] hover:bg-[#A94730] text-white text-xs font-bold rounded-lg transition-colors shadow-2xs"
          >
            Create Quest
          </button>
        </div>
      </form>
    </Modal>
  );
}

