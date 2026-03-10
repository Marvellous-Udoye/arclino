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
    <section className='bg-background py-32 relative overflow-hidden'>
      <div className='absolute inset-0 opacity-[0.02] pointer-events-none'>
        <div className='absolute inset-0 bg-[linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] bg-[size:64px_64px]' />
      </div>

      <div className='relative mx-auto max-w-7xl px-6'>
        <div className='mb-20 flex flex-col gap-6 text-center'>
          <p className='text-[10px] font-bold uppercase tracking-[0.3em] text-primary'>
            Built for different teams
          </p>
          <h2 className='text-4xl font-black tracking-tight text-foreground md:text-6xl'>
            Same system.<br />Different operational pressure.
          </h2>
          <p className='mx-auto max-w-2xl text-lg leading-relaxed text-muted-foreground'>
            Arclino is opinionated about structure, not about department silos. The interface stays consistent while the framing adapts to how each team works.
          </p>
        </div>

        <div className='grid gap-6 lg:grid-cols-3'>
          {audiences.map((audience, index) => (
            <motion.div
              key={audience.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ 
                duration: 0.8, 
                delay: index * 0.15, 
                ease: [0.22, 1, 0.36, 1] 
              }}
              className='group relative flex flex-col rounded-[2.5rem] border border-border bg-card/40 p-10 transition-all hover:border-primary/30 hover:bg-card/60 backdrop-blur-sm'
            >
              <div className='mb-12 flex size-16 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-all duration-500 group-hover:scale-110 group-hover:-rotate-6 group-hover:bg-primary/20'>
                <audience.icon className='size-8' />
              </div>
              <h3 className='text-3xl font-bold tracking-tight text-foreground'>
                {audience.title}
              </h3>
              <p className='mt-5 text-base leading-relaxed text-muted-foreground flex-1'>
                {audience.description}
              </p>
              <Link
                href={audience.href}
                className='mt-10 inline-flex items-center justify-center rounded-2xl border border-border bg-background/50 px-6 py-3 text-sm font-bold text-foreground transition-all hover:bg-foreground hover:text-background'
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
