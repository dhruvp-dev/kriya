'use client';

import React from 'react';
import { motion, type HTMLMotionProps } from 'framer-motion';
import { cn } from '../../lib/utils/cn';

export interface ButtonProps extends HTMLMotionProps<'button'> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger' | 'gold';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  children: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'primary',
      size = 'md',
      isLoading = false,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      'inline-flex items-center justify-center font-semibold rounded-xl transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#161310] disabled:opacity-50 disabled:cursor-not-allowed select-none';

    const variants = {
      primary:
        'bg-[#EA580C] hover:bg-[#C2410C] text-white shadow-sm shadow-[#EA580C]/20 focus:ring-[#EA580C]',
      secondary:
        'bg-[#26221D] hover:bg-[#2E2822] text-[#F5F2ED] border border-[#453D33] focus:ring-[#453D33]',
      ghost: 'bg-transparent hover:bg-[#26221D]/60 text-[#A89F8F] focus:ring-[#453D33]',
      danger:
        'bg-rose-600 hover:bg-rose-500 text-white shadow-sm shadow-rose-600/20 focus:ring-rose-500',
      gold: 'bg-[#F59E0B] hover:bg-[#D97706] text-[#161310] font-bold shadow-sm shadow-[#F59E0B]/20 focus:ring-[#F59E0B]',
    };

    const sizes = {
      sm: 'px-3 py-1.5 h-9 text-xs gap-1.5',
      md: 'px-4 py-2.5 h-11 text-sm gap-2',
      lg: 'px-6 py-3.5 h-12 text-base gap-2.5',
    };

    return (
      <motion.button
        ref={ref}
        whileTap={{ scale: disabled || isLoading ? 1 : 0.98 }}
        whileHover={{ scale: disabled || isLoading ? 1 : 1.01 }}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading ? (
          <span className="inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-1" />
        ) : null}
        {children}
      </motion.button>
    );
  }
);

Button.displayName = 'Button';
