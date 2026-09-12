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
      'inline-flex items-center justify-center font-bold rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#F7F5F0] disabled:opacity-50 disabled:cursor-not-allowed select-none font-sans';

    const variants = {
      primary:
        'bg-[#F05A3C] hover:bg-[#D9482D] text-white shadow-2xs focus:ring-[#F05A3C]',
      secondary:
        'bg-[#FFFFFF] hover:bg-[#F7F5F0] text-[#171A21] border border-[#E5E1D9] focus:ring-[#202B3C]',
      ghost: 'bg-transparent hover:bg-[#EFECE6] text-[#686C73] hover:text-[#171A21] focus:ring-[#E5E1D9]',
      danger:
        'bg-[#DC2626] hover:bg-[#B91C1C] text-white shadow-2xs focus:ring-[#DC2626]',
      gold: 'bg-[#FFB547] hover:bg-[#D97706] text-[#171A21] font-bold shadow-2xs focus:ring-[#FFB547]',
    };

    const sizes = {
      sm: 'px-3 py-1.5 h-8 text-xs gap-1.5',
      md: 'px-4 py-2 h-10 text-xs uppercase tracking-wider gap-2',
      lg: 'px-5 py-2.5 h-11 text-xs uppercase tracking-wider gap-2.5',
    };

    return (
      <motion.button
        ref={ref}
        whileTap={{ scale: disabled || isLoading ? 1 : 0.98 }}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading ? (
          <span className="inline-block w-3.5 h-3.5 border-2 border-current border-t-transparent rounded-full animate-spin mr-1" />
        ) : null}
        {children}
      </motion.button>
    );
  }
);

Button.displayName = 'Button';
