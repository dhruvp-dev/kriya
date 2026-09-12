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
      'inline-flex items-center justify-center font-bold rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#F3F1E8] disabled:opacity-50 disabled:cursor-not-allowed select-none font-sans';

    const variants = {
      primary:
        'bg-[#C85A3D] hover:bg-[#A94730] text-white shadow-2xs focus:ring-[#C85A3D]',
      secondary:
        'bg-[#FFFDF7] hover:bg-[#F3F1E8] text-[#20231F] border border-[#DFDDD2] focus:ring-[#344653]',
      ghost: 'bg-transparent hover:bg-[#EBE8DD] text-[#70736B] hover:text-[#20231F] focus:ring-[#DFDDD2]',
      danger:
        'bg-[#DC2626] hover:bg-[#B91C1C] text-white shadow-2xs focus:ring-[#DC2626]',
      gold: 'bg-[#D9A441] hover:bg-[#C28F2F] text-[#20231F] font-bold shadow-2xs focus:ring-[#D9A441]',
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
