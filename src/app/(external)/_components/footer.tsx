'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

const footerGroups = [
  {
    title: 'Product',
    links: [
      { label: 'Boards', href: '/solutions' },
      { label: 'Workspace', href: '/onboarding/workspace' },
      { label: 'Realtime', href: '/solutions' },
      { label: 'Pricing', href: '/pricing' },
      { label: 'Security', href: '/security' },
    ],
  },
  {
    title: 'Solutions',
    links: [
      { label: 'Product Teams', href: '/solutions/product-teams' },
      { label: 'Engineering', href: '/solutions/engineering' },
      { label: 'Startups', href: '/solutions/startups' },
      { label: 'Case Studies', href: '/customers' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'Blog', href: '/resources/blog' },
      { label: 'Changelog', href: '/resources/changelog' },
      { label: 'Help Center', href: '/resources/help-center' },
      { label: 'Documentation', href: '/resources' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Privacy Policy', href: '/legal/privacy' },
      { label: 'Terms of Service', href: '/legal/terms' },
      { label: 'Cookie Policy', href: '/legal/privacy' },
      { label: 'Compliance', href: '/security' },
    ],
  },
];

export default function Footer() {
  return (
    <footer className='relative overflow-hidden border-t border-border bg-background pt-24'>
      <div className='pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-primary/50 to-transparent' />

      <div className='mx-auto grid max-w-7xl gap-16 px-6 lg:grid-cols-[1.2fr_2fr]'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className='space-y-8'
        >
          <div className='flex items-center gap-4'>
            <span className='flex size-14 items-center justify-center rounded-2xl border border-border bg-card shadow-lg'>
              <span className='size-4 rounded-full bg-primary animate-pulse' />
            </span>
            <div>
              <p className='text-xl font-bold uppercase tracking-[0.2em] text-foreground'>
                Arclino
              </p>
              <p className='text-xs font-bold uppercase tracking-[0.1em] text-primary'>
                The Flow Behind the Work
              </p>
            </div>
          </div>

          <p className='max-w-md text-lg leading-relaxed text-muted-foreground'>
            Secure, realtime workspace infrastructure for teams that need shared board state, clear permissions, and fast collaboration.
          </p>

          <div className='flex flex-wrap gap-4'>
            <Link
              href='/signup'
              className='rounded-2xl bg-primary px-8 py-4 text-sm font-bold text-primary-foreground transition-all hover:scale-[1.05] hover:shadow-[0_0_20px_rgba(34,211,238,0.3)]'
            >
              Get started for free
            </Link>
          </div>
        </motion.div>

        <div className='grid gap-12 sm:grid-cols-2 lg:grid-cols-4'>
          {footerGroups.map((group, index) => (
            <motion.div
              key={group.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: index * 0.08 }}
              className='space-y-6'
            >
              <p className='text-xs font-bold uppercase tracking-[0.2em] text-primary'>
                {group.title}
              </p>
              <div className='space-y-4'>
                {group.links.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    className='block text-sm font-medium text-muted-foreground transition-all hover:text-foreground hover:translate-x-1'
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

              <div className='mt-8 flex w-full max-w-7xl mx-auto items-center justify-between border-t border-border/50 px-6 pt-8 text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground/50'>
          <p>© 2026 Arclino Technologies. All rights reserved.</p>
          <div className='flex gap-8'>
            <Link href='/legal/privacy' className='hover:text-primary transition-colors'>Privacy</Link>
            <Link href='/legal/terms' className='hover:text-primary transition-colors'>Terms</Link>
          </div>
        </div>

      {/* Large Subtle Watermark */}
      <div className='relative mt-20 flex flex-col items-center justify-center'>
        <motion.h2 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.05 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5 }}
          className='pointer-events-none select-none text-[25vw] font-black uppercase tracking-[-0.05em] text-foreground leading-none'
        >
          Arclino
        </motion.h2>
      </div>
    </footer>
  );
}
