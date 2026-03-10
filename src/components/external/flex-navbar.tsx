'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { type ComponentType } from 'react';
import { ChevronDown, Sparkles, Layout, Shield, Book, MessageSquare, Zap, type LucideProps } from 'lucide-react';

import { cn } from '@/lib/utils';
import { SeparatorPro } from '@/components/ui/seperatorpro';

export interface ExternalNavLink {
  label: string;
  href: string;
  description?: string;
  icon: ComponentType<LucideProps>;
}

const SOLUTIONS: ExternalNavLink[] = [
  { label: 'Product Teams', href: '/solutions/product-teams', description: 'Align roadmaps and visual execution.', icon: Sparkles },
  { label: 'Engineering', href: '/solutions/engineering', description: 'Map systems and infrastructure live.', icon: Zap },
  { label: 'Startups', href: '/solutions/startups', description: 'Move fast without losing context.', icon: Layout },
];

const RESOURCES: ExternalNavLink[] = [
  { label: 'Help Center', href: '/resources/help-center', description: 'Guides and operational support.', icon: Book },
  { label: 'Blog', href: '/resources/blog', description: 'The latest from the Arclino team.', icon: MessageSquare },
  { label: 'Changelog', href: '/resources/changelog', description: 'Updates and product improvements.', icon: Sparkles },
  { label: 'Security', href: '/security', description: 'Our commitment to data protection.', icon: Shield },
];

interface FlexNavbarProps {
  primaryCtaLabel: string;
  primaryCtaHref: string;
  variant?: 'hero' | 'page';
}

export function FlexNavbar({
  primaryCtaLabel,
  primaryCtaHref,
  variant = 'page',
}: FlexNavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 24);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
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
            'mx-auto flex max-w-7xl items-center justify-between rounded-3xl px-4 py-3 transition-all duration-300 md:px-6',
            chromeVisible
              ? 'border border-border bg-background/90 shadow-[0_24px_80px_rgba(0,0,0,0.35)] backdrop-blur-xl'
              : 'border border-transparent bg-transparent',
          )}
        >
          <div className='flex items-center gap-12'>
            <Link
              href='/'
              className='flex items-center gap-3 text-sm font-bold tracking-[0.24em] uppercase text-foreground'
            >
              <span className='flex size-10 items-center justify-center rounded-xl border border-border bg-card shadow-sm'>
                <span className='size-3 rounded-full bg-primary animate-pulse' />
              </span>
              <span className='hidden sm:inline'>Arclino</span>
            </Link>

            <nav className='hidden items-center gap-2 lg:flex'>
              <div 
                className="relative"
                onMouseEnter={() => setActiveDropdown('solutions')}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button className='flex items-center gap-1.5 px-4 py-2 text-sm font-bold text-muted-foreground transition-all hover:text-foreground hover:bg-card/50 rounded-xl'>
                  Solutions <ChevronDown className={cn("size-3.5 transition-transform", activeDropdown === 'solutions' && "rotate-180")} />
                </button>
                <AnimatePresence>
                  {activeDropdown === 'solutions' && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      className="absolute left-0 top-full pt-4 w-72"
                    >
                      <div className="rounded-2xl border border-border bg-card p-2 shadow-2xl backdrop-blur-xl">
                        {SOLUTIONS.map((item) => (
                          <Link
                            key={item.href}
                            href={item.href}
                            className="flex items-start gap-4 p-3 rounded-xl transition-all hover:bg-background group"
                          >
                            <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                              <item.icon className="size-5" />
                            </div>
                            <div>
                              <p className="text-sm font-bold text-foreground">{item.label}</p>
                              <p className="text-xs text-muted-foreground leading-tight">{item.description}</p>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <Link
                href="/pricing"
                className='px-4 py-2 text-sm font-bold text-muted-foreground transition-all hover:text-foreground hover:bg-card/50 rounded-xl'
              >
                Pricing
              </Link>

              <div 
                className="relative"
                onMouseEnter={() => setActiveDropdown('resources')}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button className='flex items-center gap-1.5 px-4 py-2 text-sm font-bold text-muted-foreground transition-all hover:text-foreground hover:bg-card/50 rounded-xl'>
                  Resources <ChevronDown className={cn("size-3.5 transition-transform", activeDropdown === 'resources' && "rotate-180")} />
                </button>
                <AnimatePresence>
                  {activeDropdown === 'resources' && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      className="absolute left-0 top-full pt-4 w-80"
                    >
                      <div className="rounded-2xl border border-border bg-card p-2 shadow-2xl backdrop-blur-xl">
                        <div className="grid grid-cols-1 gap-1">
                          {RESOURCES.map((item) => (
                            <Link
                              key={item.href}
                              href={item.href}
                              className="flex items-start gap-4 p-3 rounded-xl transition-all hover:bg-background group"
                            >
                              <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                                <item.icon className="size-5" />
                              </div>
                              <div>
                                <p className="text-sm font-bold text-foreground">{item.label}</p>
                                <p className="text-xs text-muted-foreground leading-tight">{item.description}</p>
                              </div>
                            </Link>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <Link
                href="/customers"
                className='px-4 py-2 text-sm font-bold text-muted-foreground transition-all hover:text-foreground hover:bg-card/50 rounded-xl'
              >
                Customers
              </Link>
            </nav>
          </div>

          <div className='hidden items-center gap-6 md:flex'>
            <Link
              href='/login'
              className='text-sm font-bold text-muted-foreground transition-all hover:text-foreground'
            >
              Sign in
            </Link>
            <Link
              href={primaryCtaHref}
              className='rounded-2xl bg-foreground px-6 py-3 text-sm font-black text-background transition-all hover:scale-[1.05] hover:shadow-[0_0_20px_rgba(255,255,255,0.2)]'
            >
              {primaryCtaLabel}
            </Link>
          </div>

          <button
            type='button'
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
            onClick={() => setIsOpen((open) => !open)}
            className='relative flex size-12 items-center justify-center rounded-xl border border-border bg-card text-foreground md:hidden'
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
              <div className='flex flex-col gap-6'>
                <div className='space-y-4'>
                  <p className="text-[10px] font-black uppercase tracking-widest text-primary px-4">Solutions</p>
                  {SOLUTIONS.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className='flex items-center gap-4 px-4 py-2 text-base font-bold text-foreground'
                    >
                      <item.icon className="size-5 text-primary" />
                      {item.label}
                    </Link>
                  ))}
                  
                  <SeparatorPro variant="dots" className="my-2" />
                  
                  <Link href="/pricing" onClick={() => setIsOpen(false)} className='block px-4 py-2 text-base font-bold text-foreground'>Pricing</Link>
                  <Link href="/customers" onClick={() => setIsOpen(false)} className='block px-4 py-2 text-base font-bold text-foreground'>Customers</Link>
                  
                  <SeparatorPro variant="dots" className="my-2" />
                  
                  <p className="text-[10px] font-black uppercase tracking-widest text-primary px-4">Resources</p>
                  {RESOURCES.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className='flex items-center gap-4 px-4 py-2 text-base font-bold text-foreground'
                    >
                      <item.icon className="size-5 text-primary" />
                      {item.label}
                    </Link>
                  ))}
                </div>
                <div className='grid grid-cols-2 gap-4'>
                  <Link
                    href='/login'
                    onClick={() => setIsOpen(false)}
                    className='rounded-2xl border border-border px-4 py-4 text-center text-sm font-bold text-foreground'
                  >
                    Sign in
                  </Link>
                  <Link
                    href={primaryCtaHref}
                    onClick={() => setIsOpen(false)}
                    className='rounded-2xl bg-primary px-4 py-4 text-center text-sm font-bold text-primary-foreground shadow-lg'
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
