import React from 'react';
import { cn } from '../../lib/utils/cn';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hoverEffect?: boolean;
}

export function Card({ className, hoverEffect = false, children, ...props }: CardProps) {
  return (
    <div
      className={cn(
        'bg-[#FFFFFF] rounded-xl p-6 border border-[#E5E1D9] shadow-2xs transition-all font-sans',
        hoverEffect && 'hover:border-[#C8C3B8] hover:shadow-xs',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
