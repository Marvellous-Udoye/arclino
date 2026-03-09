'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

const footerGroups = [
  {
    title: 'Product',
    links: [
      { label: 'Solutions', href: '/solutions' },
      { label: 'Pricing', href: '/pricing' },
      { label: 'Security', href: '/security' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About', href: '/about' },
      { label: 'Customers', href: '/customers' },
      { label: 'Contact', href: '/contact' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'Resources', href: '/resources' },
      { label: 'Blog', href: '/resources/blog' },
      { label: 'Help center', href: '/resources/help-center' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Privacy', href: '/legal/privacy' },
      { label: 'Terms', href: '/legal/terms' },
    ],
  },
];

export default function Footer() {
  return (
    <footer className='relative overflow-hidden border-t border-border bg-background'>
      <div className='pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-primary/50 to-transparent' />

      <div className='mx-auto grid max-w-7xl gap-12 px-6 py-16 lg:grid-cols-[1.3fr_2fr]'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className='space-y-6'
        >
          <div className='flex items-center gap-3'>
            <span className='flex size-11 items-center justify-center rounded-2xl border border-border bg-card'>
              <span className='size-3 rounded-full bg-primary' />
            </span>
            <div>
              <p className='text-sm font-semibold uppercase tracking-[0.24em] text-foreground'>
                Arclino
              </p>
              <p className='text-sm text-muted-foreground'>
                Realtime boards for teams that need clear systems.
              </p>
            </div>
          </div>

          <p className='max-w-md text-sm leading-7 text-muted-foreground'>
            Map workflows, align product and engineering, and keep every board auditable with shared state, presence, and secure permissions.
          </p>

          <div className='flex flex-wrap gap-3'>
            <Link
              href='/signup'
              className='rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-transform duration-300 hover:-translate-y-0.5'
            >
              Start free
            </Link>
            <Link
              href='/login'
              className='rounded-xl border border-border px-4 py-2 text-sm font-semibold text-foreground transition-colors hover:bg-card'
            >
              Sign in
            </Link>
          </div>
        </motion.div>

        <div className='grid gap-10 sm:grid-cols-2 lg:grid-cols-4'>
          {footerGroups.map((group, index) => (
            <motion.div
              key={group.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: index * 0.08 }}
              className='space-y-4'
            >
              <p className='text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground'>
                {group.title}
              </p>
              <div className='space-y-3'>
                {group.links.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className='block text-sm text-foreground/80 transition-colors hover:text-foreground'
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </footer>
  );
}
