'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface StripeButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
  stripesSpeed?: number;
  variant?: 'default' | 'compact';
  size?: 'default' | 'sm' | 'lg' | 'icon';
}

const StripeButton = React.forwardRef<HTMLButtonElement, StripeButtonProps>(
  (
    {
      children,
      className = '',
      stripesSpeed = 500,
      variant = 'default',
      size = 'default',
      ...props
    },
    ref,
  ) => {
    const [isHovered, setIsHovered] = React.useState(false);

    const sizeClasses = {
      default: 'h-10 px-10',
      sm: 'h-8 px-10 text-xs',
      lg: 'h-12 px-8',
      icon: 'h-10 w-10 p-0',
    };

    return (
      <button
        ref={ref}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={cn(
          'group relative cursor-pointer border-0 bg-transparent p-0 outline-hidden',
          size === 'icon' && 'w-11',
          className,
        )}
        {...props}
      >
        <div className='relative h-full w-full overflow-hidden rounded-2xl bg-border p-0.5 transition-all duration-300 ease-in-out'>
          <div className='absolute inset-0 overflow-hidden rounded-2xl'>
            <motion.div
              className='absolute h-10 w-20 -translate-x-1/2 -translate-y-1/2 blur-xs
                         [background:linear-gradient(to_right,transparent_20%,var(--foreground)_50%,var(--foreground)_60%,transparent_80%)]'
              animate={{
                top: ['0%', '0%', '100%', '100%', '0%'],
                left: ['0%', '100%', '100%', '0%', '0%'],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: 'linear',
              }}
            />

            <motion.div
              className='absolute h-10 w-20 -translate-x-1/2 -translate-y-1/2 blur-xs
                         [background:linear-gradient(to_right,transparent_20%,var(--foreground)_50%,var(--foreground)_60%,transparent_80%)]'
              animate={{
                top: ['100%', '100%', '0%', '0%', '100%'],
                left: ['100%', '0%', '0%', '100%', '100%'],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: 'linear',
              }}
            />
          </div>

          <div
            className={cn(
              'relative z-10 flex items-center justify-center gap-2 rounded-2xl transition-all duration-300 ease-in-out bg-white dark:bg-black overflow-hidden',
              'relative z-10 flex items-center justify-center gap-2 overflow-hidden rounded-2xl bg-card transition-all duration-300 ease-in-out',
              variant === 'compact' ? 'h-full px-10' : sizeClasses[size],
            )}
          >
            <span
              className='absolute inset-0 pointer-events-none dark:hidden'
              style={{
                backgroundImage:
                  'repeating-linear-gradient(120deg, color-mix(in oklab, var(--card) 92%, white), color-mix(in oklab, var(--card) 92%, white) 10px, color-mix(in oklab, var(--border) 80%, black) 10px, color-mix(in oklab, var(--border) 80%, black) 20px)',
                backgroundPosition: isHovered ? '40px 0' : '0 0',
                backgroundSize: '28.28px 100%',
                transition: `background-position ${stripesSpeed}ms ease-out`,
                opacity: 0.22,
              }}
            />

            <span className='pointer-events-none absolute left-4 right-4 top-0 h-0.5 rounded-2xl bg-linear-to-r from-transparent via-primary/60 to-transparent' />
            <span className='relative z-10 text-base font-semibold text-foreground'>
              {children}
            </span>
            <span className='pointer-events-none absolute inset-0 rounded-2xl shadow-[inset_0_1px_0_color-mix(in_oklab,var(--foreground)_15%,transparent)]' />
          </div>
        </div>
      </button>
    );
  },
);

StripeButton.displayName = 'StripeButton';

export { StripeButton };