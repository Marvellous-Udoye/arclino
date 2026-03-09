'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

import { cn } from '@/lib/utils';

export interface ExternalNavLink {
  label: string;
  href: string;
}

interface FlexNavbarProps {
  links: ExternalNavLink[];
  primaryCtaLabel: string;
  primaryCtaHref: string;
  variant?: 'hero' | 'page';
}

export function FlexNavbar({
  links,
  primaryCtaLabel,
  primaryCtaHref,
  variant = 'page',
}: FlexNavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 24);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const closeMenu = () => setIsOpen(false);
    window.addEventListener('resize', closeMenu);
    return () => window.removeEventListener('resize', closeMenu);
  }, []);

  const chromeVisible = variant === 'page' || isScrolled || isOpen;

  return (
    <>
      <AnimatePresence>
        {isOpen ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className='fixed inset-0 z-40 bg-background/70 backdrop-blur-sm md:hidden'
            onClick={() => setIsOpen(false)}
          />
        ) : null}
      </AnimatePresence>

      <motion.header
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className='fixed inset-x-0 top-0 z-50 px-4 pt-4 md:px-6 md:pt-6'
      >
        <div
          className={cn(
            'mx-auto flex max-w-7xl items-center justify-between rounded-2xl px-4 py-3 transition-all duration-300 md:px-6',
            chromeVisible
              ? 'border border-border bg-background/90 shadow-[0_24px_80px_rgba(0,0,0,0.35)] backdrop-blur-xl'
              : 'border border-transparent bg-transparent',
          )}
        >
          <div className='flex items-center gap-3'>
            <Link
              href='/'
              className='flex items-center gap-3 text-sm font-semibold tracking-[0.24em] uppercase text-foreground'
            >
              <span className='flex size-9 items-center justify-center rounded-xl border border-border bg-card'>
                <span className='size-3 rounded-full bg-primary' />
              </span>
              <span className='hidden sm:inline'>Arclino</span>
            </Link>
          </div>

          <nav className='hidden items-center gap-6 lg:flex'>
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className='text-sm font-medium text-muted-foreground transition-colors hover:text-foreground'
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className='hidden items-center gap-3 md:flex'>
            <Link
              href='/login'
              className='text-sm font-medium text-muted-foreground transition-colors hover:text-foreground'
            >
              Sign in
            </Link>
            <Link
              href={primaryCtaHref}
              className='rounded-xl bg-foreground px-4 py-2 text-sm font-semibold text-background transition-transform duration-300 hover:-translate-y-0.5 hover:bg-foreground/90'
            >
              {primaryCtaLabel}
            </Link>
          </div>

          <button
            type='button'
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
            onClick={() => setIsOpen((open) => !open)}
            className='relative flex size-11 items-center justify-center rounded-xl border border-border bg-card text-foreground md:hidden'
          >
            <span
              className={cn(
                'absolute h-0.5 w-5 rounded-full bg-current transition-all duration-300',
                isOpen ? 'rotate-45' : '-translate-y-1.5',
              )}
            />
            <span
              className={cn(
                'absolute h-0.5 w-5 rounded-full bg-current transition-all duration-200',
                isOpen ? 'opacity-0' : 'opacity-100',
              )}
            />
            <span
              className={cn(
                'absolute h-0.5 w-5 rounded-full bg-current transition-all duration-300',
                isOpen ? '-rotate-45' : 'translate-y-1.5',
              )}
            />
          </button>
        </div>

        <AnimatePresence>
          {isOpen ? (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className='mx-auto mt-3 max-w-7xl rounded-3xl border border-border bg-card/95 p-5 shadow-[0_32px_80px_rgba(0,0,0,0.45)] backdrop-blur-xl md:hidden'
            >
              <div className='flex flex-col gap-5'>
                <div className='space-y-2'>
                  {links.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className='block rounded-2xl border border-transparent px-4 py-3 text-base font-semibold text-foreground transition-colors hover:border-border hover:bg-background'
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
                <div className='grid grid-cols-2 gap-3'>
                  <Link
                    href='/login'
                    onClick={() => setIsOpen(false)}
                    className='rounded-2xl border border-border px-4 py-3 text-center text-sm font-semibold text-foreground'
                  >
                    Sign in
                  </Link>
                  <Link
                    href={primaryCtaHref}
                    onClick={() => setIsOpen(false)}
                    className='rounded-2xl bg-primary px-4 py-3 text-center text-sm font-semibold text-primary-foreground'
                  >
                    {primaryCtaLabel}
                  </Link>
                </div>
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </motion.header>
    </>
  );
}
