'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Lock, MessageSquare, Workflow } from 'lucide-react';

const steps = [
  {
    title: 'Start a workspace',
    description:
      'Create one shared place for product, engineering, and operations with SSR-safe auth and workspace roles.',
    icon: Workflow,
  },
  {
    title: 'Map the system',
    description:
      'Build flowcharts with structured nodes, connected edges, and activity history that makes every change inspectable.',
    icon: ArrowRight,
  },
  {
    title: 'Collaborate live',
    description:
      'Presence, chat, locks, and realtime board events keep everyone in sync without losing control of edits.',
    icon: MessageSquare,
  },
  {
    title: 'Protect the board',
    description:
      'Strict workspace permissions, invite flows, and RLS-backed reads keep access aligned with how the team works.',
    icon: Lock,
  },
];

export default function HowItWorks() {
  return (
    <section className='bg-background py-24'>
      <div className='mx-auto max-w-7xl px-6'>
        <div className='grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start'>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className='space-y-5 lg:sticky lg:top-28'
          >
            <p className='text-xs font-semibold uppercase tracking-[0.24em] text-primary'>
              How it works
            </p>
            <h2 className='text-4xl font-black tracking-tight text-foreground md:text-5xl'>
              One workspace for the flow behind the work.
            </h2>
            <p className='max-w-xl text-base leading-7 text-muted-foreground'>
              The landing-page language is cinematic, but the product promise is operational: clear structure, shared context, and safe collaboration from first board to shipped system.
            </p>
          </motion.div>

          <div className='grid gap-4 md:grid-cols-2'>
            {steps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: index * 0.08 }}
                className='rounded-3xl border border-border bg-card p-6 shadow-[0_20px_60px_rgba(0,0,0,0.18)]'
              >
                <div className='mb-6 flex items-center justify-between'>
                  <span className='flex size-12 items-center justify-center rounded-2xl bg-primary/10 text-primary'>
                    <step.icon className='size-5' />
                  </span>
                  <span className='text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground'>
                    0{index + 1}
                  </span>
                </div>
                <h3 className='text-xl font-semibold tracking-tight text-foreground'>
                  {step.title}
                </h3>
                <p className='mt-3 text-sm leading-7 text-muted-foreground'>
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
