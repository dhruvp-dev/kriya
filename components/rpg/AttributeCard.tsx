'use client';

import React from 'react';
import { Sword, Brain, ShieldCheck, Sparkle } from '@phosphor-icons/react'; // Phosphor Icons for game attributes per rule!
import type { AttributeType } from '../../types/database.types';
import { Card } from '../ui/Card';

export interface AttributeCardProps {
  type: AttributeType;
  value: number;
}

export function AttributeCard({ type, value }: AttributeCardProps) {
  const configs: Record<
    AttributeType,
    { title: string; icon: React.ReactNode; color: string; border: string; bg: string }
  > = {
    strength: {
      title: 'Strength',
      icon: <Sword weight="fill" className="w-5 h-5 text-rose-400" />,
      color: 'text-rose-400',
      border: 'border-rose-500/20',
      bg: 'bg-rose-500/10',
    },
    intellect: {
      title: 'Intellect',
      icon: <Brain weight="fill" className="w-5 h-5 text-sky-400" />,
      color: 'text-sky-400',
      border: 'border-sky-500/20',
      bg: 'bg-sky-500/10',
    },
    discipline: {
      title: 'Discipline',
      icon: <ShieldCheck weight="fill" className="w-5 h-5 text-teal-400" />,
      color: 'text-teal-400',
      border: 'border-teal-500/20',
      bg: 'bg-teal-500/10',
    },
    creativity: {
      title: 'Creativity',
      icon: <Sparkle weight="fill" className="w-5 h-5 text-pink-400" />,
      color: 'text-pink-400',
      border: 'border-pink-500/20',
      bg: 'bg-pink-500/10',
    },
  };

  const config = configs[type];

  return (
    <Card className={`flex items-center gap-4 p-4 border ${config.border}`}>
      <div className={`p-3 rounded-xl ${config.bg} border ${config.border} shrink-0`}>
        {config.icon}
      </div>
      <div>
        <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
          {config.title}
        </span>
        <div className={`text-2xl font-black ${config.color}`}>+{value}</div>
      </div>
    </Card>
  );
}
