'use client';

import React, { useState } from 'react';
import { Modal } from '../ui/Modal';
import { Coins, Sparkles, X, Gauge, Shield, Brain, Zap, Palette } from 'lucide-react';
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
    icon: Shield,
    color: 'text-[#C85A3D]',
    activeBg: 'bg-[#FDF4F2] border-[#C85A3D]',
  },
  {
    id: 'intellect',
    label: 'Intellect',
    icon: Brain,
    color: 'text-[#344653]',
    activeBg: 'bg-[#F0F4F7] border-[#344653]',
  },
  {
    id: 'discipline',
    label: 'Discipline',
    icon: Zap,
    color: 'text-[#668F72]',
    activeBg: 'bg-[#F2F7F4] border-[#668F72]',
  },
  {
    id: 'creativity',
    label: 'Creativity',
    icon: Palette,
    color: 'text-[#D9A441]',
    activeBg: 'bg-[#FDF8EC] border-[#D9A441]',
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
        attribute: attribute.toLowerCase(),
        difficulty: difficulty.toLowerCase(),
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
      <form onSubmit={handleSubmit} className="space-y-4 font-sans text-[#070709]">
        {/* Title */}
        <div>
          <label className="text-xs font-semibold text-[#070709] block mb-1.5">
            Quest Title <span className="text-[#C85A3D]">*</span>
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Build API integration module"
            className="w-full px-3.5 py-2.5 bg-[#FFFFFF] border border-[#E6E6E8] rounded-xl text-sm text-[#070709] placeholder-[#8B8B8B] focus:outline-none focus:border-[#070709] focus:ring-1 focus:ring-[#070709] transition-colors"
            required
          />
        </div>

        {/* Description */}
        <div>
          <label className="text-xs font-semibold text-[#070709] block mb-1.5">Description (Optional)</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Define objectives and notes..."
            rows={2}
            className="w-full px-3.5 py-2.5 bg-[#FFFFFF] border border-[#E6E6E8] rounded-xl text-sm text-[#070709] placeholder-[#8B8B8B] focus:outline-none focus:border-[#070709] focus:ring-1 focus:ring-[#070709] transition-colors resize-none"
          />
        </div>

        {/* Subtasks */}
        <div>
          <label className="text-xs font-semibold text-[#070709] block mb-1.5">Subtasks / Checklist</label>
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
              className="flex-1 px-3.5 py-2 bg-[#FFFFFF] border border-[#E6E6E8] rounded-xl text-xs text-[#070709] placeholder-[#8B8B8B] focus:outline-none focus:border-[#070709]"
            />
            <button
              type="button"
              onClick={handleAddSubtask}
              className="px-3.5 py-2 bg-[#F7F7F8] border border-[#E6E6E8] hover:bg-[#F3F4F5] text-xs font-semibold text-[#070709] rounded-xl transition-colors cursor-pointer"
            >
              Add
            </button>
          </div>

          {subtasks.length > 0 && (
            <div className="space-y-1.5">
              {subtasks.map((st, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between text-xs text-[#60606C] bg-[#F7F7F8] px-3 py-1.5 rounded-lg border border-[#E6E6E8]"
                >
                  <span>• {st}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveSubtask(idx)}
                    className="text-[#8B8B8B] hover:text-[#C85A3D] cursor-pointer"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Attribute Selector */}
        <div>
          <label className="text-xs font-semibold text-[#070709] block mb-1.5">Target Attribute</label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {ATTRIBUTES_OPTIONS.map((attr) => {
              const IconComp = attr.icon;
              const isSelected = attribute === attr.id;
              return (
                <button
                  key={attr.id}
                  type="button"
                  onClick={() => setAttribute(attr.id as any)}
                  className={`flex items-center justify-center gap-2 p-2.5 rounded-xl border text-xs font-semibold transition-all cursor-pointer ${
                    isSelected
                      ? attr.activeBg
                      : 'bg-[#FFFFFF] border-[#E6E6E8] text-[#60606C] hover:border-[#D0D1D4]'
                  }`}
                >
                  <IconComp className={`w-3.5 h-3.5 ${attr.color}`} />
                  <span className={isSelected ? 'text-[#070709] font-bold' : 'text-[#60606C]'}>
                    {attr.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Difficulty Selector */}
        <div>
          <label className="text-xs font-semibold text-[#070709] block mb-1.5">Difficulty</label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {DIFFICULTY_OPTIONS.map((diff) => {
              const isSelected = difficulty === diff.id;
              return (
                <button
                  key={diff.id}
                  type="button"
                  onClick={() => setDifficulty(diff.id as any)}
                  className={`flex items-center justify-center gap-1.5 p-2 rounded-xl border text-xs font-semibold transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[#070709] border-[#070709] text-white font-bold'
                      : 'bg-[#FFFFFF] border-[#E6E6E8] text-[#60606C] hover:border-[#D0D1D4]'
                  }`}
                >
                  <Gauge className={`w-3.5 h-3.5 ${isSelected ? 'text-white' : diff.color}`} />
                  <span>{diff.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Reward Output Preview */}
        <div className="p-3 bg-[#F7F7F8] border border-[#E6E6E8] rounded-xl flex items-center justify-between text-xs font-medium">
          <span className="text-[#60606C]">Reward preview:</span>
          <div className="flex items-center gap-3 tabular-nums font-bold text-[#070709]">
            <span className="flex items-center gap-1 text-[#070709]">
              <Sparkles className="w-3.5 h-3.5 text-[#C85A3D]" />
              +{currentRewards.xp} XP
            </span>
            <span className="flex items-center gap-1 text-[#D9A441]">
              <Coins className="w-3.5 h-3.5" />
              +{currentRewards.gold} Gold
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#E6E6E8]">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-[#60606C] hover:text-[#070709] transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-5 py-2.5 bg-[#070709] hover:bg-[#202025] text-white text-xs font-bold rounded-xl transition-all shadow-xs cursor-pointer"
          >
            Create Quest
          </button>
        </div>
      </form>
    </Modal>
  );
}
