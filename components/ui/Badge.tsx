import React from 'react';
import { cn } from '../../lib/utils/cn';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'easy' | 'medium' | 'hard' | 'epic' | 'strength' | 'intellect' | 'discipline' | 'creativity' | 'default';
  children: React.ReactNode;
}

export function Badge({ variant = 'default', className, children, ...props }: BadgeProps) {
  const variants = {
    default: 'bg-slate-800 text-slate-300 border-slate-700',
    easy: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
    medium: 'bg-blue-500/10 text-blue-400 border-blue-500/30',
    hard: 'bg-purple-500/10 text-purple-400 border-purple-500/30',
    epic: 'bg-amber-500/10 text-amber-400 border-amber-500/30 font-semibold',
    strength: 'bg-rose-500/10 text-rose-400 border-rose-500/30',
    intellect: 'bg-sky-500/10 text-sky-400 border-sky-500/30',
    discipline: 'bg-teal-500/10 text-teal-400 border-teal-500/30',
    creativity: 'bg-pink-500/10 text-pink-400 border-pink-500/30',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border capitalize',
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
