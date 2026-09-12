import React from 'react';
import { cn } from '../../lib/utils/cn';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'easy' | 'medium' | 'hard' | 'epic' | 'strength' | 'intellect' | 'discipline' | 'creativity' | 'default';
  children: React.ReactNode;
}

export function Badge({ variant = 'default', className, children, ...props }: BadgeProps) {
  const variants = {
    default: 'bg-[#F7F5F0] text-[#171A21] border-[#E5E1D9]',
    easy: 'bg-[#ECFDF5] text-[#2E9B72] border-[#A7F3D0]',
    medium: 'bg-[#EFF6FF] text-[#2563EB] border-[#BFDBFE]',
    hard: 'bg-[#F5F3FF] text-[#7C3AED] border-[#DDD6FE]',
    epic: 'bg-[#FFFBEB] text-[#D97706] border-[#FDE68A] font-bold',
    strength: 'bg-[#FEF2F2] text-[#DC2626] border-[#FCA5A5]',
    intellect: 'bg-[#EFF6FF] text-[#2563EB] border-[#BFDBFE]',
    discipline: 'bg-[#ECFDF5] text-[#2E9B72] border-[#A7F3D0]',
    creativity: 'bg-[#F5F3FF] text-[#7C3AED] border-[#DDD6FE]',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-semibold border capitalize font-sans',
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
