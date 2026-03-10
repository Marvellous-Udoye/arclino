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
    <section className='bg-background py-32 relative overflow-hidden'>
      <div className='absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-linear-to-r from-transparent via-border to-transparent' />
      
      <div className='mx-auto max-w-7xl px-6'>
        <div className='grid gap-16 lg:grid-cols-[0.8fr_1.2fr] lg:items-start'>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className='space-y-8 lg:sticky lg:top-32'
          >
            <div className='space-y-4'>
              <p className='text-xs font-bold uppercase tracking-[0.3em] text-primary'>
                The Workflow
              </p>
              <h2 className='text-4xl font-black tracking-tight text-foreground md:text-6xl leading-[1.1]'>
                One workspace for the flow behind the work.
              </h2>
            </div>
            
            <p className='max-w-xl text-lg leading-relaxed text-muted-foreground'>
              Arclino is built for teams that need shared board state, clear permissions, and fast collaboration. From first board to shipped system, the process stays visible.
            </p>

            <div className='pt-8 border-t border-border/50'>
              <div className='flex items-center gap-4'>
                <div className='flex -space-x-3'>
                  {[1, 2, 3].map((i) => (
                    <div key={i} className='size-10 rounded-full border-2 border-background bg-card flex items-center justify-center text-[10px] font-bold text-muted-foreground'>
                      {String.fromCharCode(64 + i)}
                    </div>
                  ))}
                </div>
                <p className='text-sm font-medium text-foreground'>
                  Trusted by 500+ teams worldwide
                </p>
              </div>
            </div>
          </motion.div>

          <div className='relative grid gap-6'>
            {steps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.7, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
                className='group relative rounded-[2.5rem] border border-border bg-card/30 p-8 md:p-10 backdrop-blur-sm transition-all hover:bg-card/50 hover:border-primary/20'
              >
                <div className='flex flex-col md:flex-row md:items-start gap-8'>
                  <div className='flex size-16 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3'>
                    <step.icon className='size-7' />
                  </div>
                  <div className='space-y-4'>
                    <div className='flex items-center justify-between'>
                      <h3 className='text-2xl font-bold tracking-tight text-foreground'>
                        {step.title}
                      </h3>
                      <span className='text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground/50'>
                        Step 0{index + 1}
                      </span>
                    </div>
                    <p className='text-base leading-relaxed text-muted-foreground max-w-lg'>
                      {step.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
