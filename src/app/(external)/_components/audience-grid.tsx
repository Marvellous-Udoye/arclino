'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Boxes, Cpu, Rocket } from 'lucide-react';

const audiences = [
  {
    title: 'Product teams',
    href: '/solutions/product-teams',
    icon: Boxes,
    description:
      'Turn roadmap and delivery conversations into one shared visual workspace with live board context.',
  },
  {
    title: 'Engineering',
    href: '/solutions/engineering',
    icon: Cpu,
    description:
      'Map services, dependencies, incidents, and handoffs with the same permission model the system already requires.',
  },
  {
    title: 'Startups',
    href: '/solutions/startups',
    icon: Rocket,
    description:
      'Move fast without losing the thread. Keep planning, execution, and board history in one realtime surface.',
  },
];

export default function AudienceGrid() {
  return (
    <section className='bg-background py-24'>
      <div className='mx-auto max-w-7xl px-6'>
        <div className='mb-12 flex flex-col gap-4 text-center'>
          <p className='text-xs font-semibold uppercase tracking-[0.24em] text-primary'>
            Built for different teams
          </p>
          <h2 className='text-4xl font-black tracking-tight text-foreground md:text-5xl'>
            Same system. Different operational pressure.
          </h2>
          <p className='mx-auto max-w-3xl text-base leading-7 text-muted-foreground'>
            Arclino is opinionated about structure, not about department silos. The interface stays consistent while the framing adapts to how each team works.
          </p>
        </div>

        <div className='grid gap-4 lg:grid-cols-3'>
          {audiences.map((audience, index) => (
            <motion.div
              key={audience.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: index * 0.08 }}
              className='group rounded-[2rem] border border-border bg-card p-7 transition-colors hover:border-primary/40'
            >
              <div className='mb-14 flex size-14 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-105'>
                <audience.icon className='size-6' />
              </div>
              <h3 className='text-2xl font-semibold tracking-tight text-foreground'>
                {audience.title}
              </h3>
              <p className='mt-4 text-sm leading-7 text-muted-foreground'>
                {audience.description}
              </p>
              <Link
                href={audience.href}
                className='mt-8 inline-flex items-center rounded-full border border-border px-4 py-2 text-sm font-semibold text-foreground transition-colors hover:bg-background'
              >
                Explore solution
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
