import React from 'react';
import { cn } from '../../lib/utils/cn';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'easy' | 'medium' | 'hard' | 'epic' | 'strength' | 'intellect' | 'discipline' | 'creativity' | 'default';
  children: React.ReactNode;
}

export function Badge({ variant = 'default', className, children, ...props }: BadgeProps) {
  const variants = {
    default: 'bg-[#F3F1E8] text-[#20231F] border-[#DFDDD2]',
    easy: 'bg-[#F4F8F5] text-[#668F72] border-[#C3D9C9]',
    medium: 'bg-[#EFF6FF] text-[#2563EB] border-[#BFDBFE]',
    hard: 'bg-[#F5F3FF] text-[#7C3AED] border-[#DDD6FE]',
    epic: 'bg-[#FAF4E6] text-[#D9A441] border-[#F2DEB6] font-bold',
    strength: 'bg-[#FBF0EC] text-[#C85A3D] border-[#F4CEB9]',
    intellect: 'bg-[#F0F4F7] text-[#344653] border-[#C3D1DC]',
    discipline: 'bg-[#F4F8F5] text-[#668F72] border-[#C3D9C9]',
    creativity: 'bg-[#FAF4E6] text-[#D9A441] border-[#F2DEB6]',
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
