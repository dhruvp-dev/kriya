import React from 'react';
import { cn } from '../../lib/utils/cn';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hoverEffect?: boolean;
}

export function Card({ className, hoverEffect = false, children, ...props }: CardProps) {
  return (
    <div
      className={cn(
        'glass-panel rounded-2xl p-5 border border-slate-800/80',
        hoverEffect && 'glass-panel-hover',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
