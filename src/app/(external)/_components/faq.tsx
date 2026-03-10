'use client';

import { motion } from 'framer-motion';

import { LayerStack, Card } from '@/components/external/layer-stack';
import { cn } from '@/lib/utils';

interface FAQItem {
  question: string;
  answer: string;
}

interface FrequentlyAskedQuestionsStackProps {
  title?: string;
  description?: string;
  data?: FAQItem[];
  className?: string;
  supportEmail?: string;
}

const defaultFAQs: FAQItem[] = [
  {
    question: 'Who is Arclino for?',
    answer:
      'Arclino is built for product, engineering, operations, and startup teams that need a shared, living map of how work and systems connect.',
  },
  {
    question: 'Can viewers participate without editing the board?',
    answer:
      'Yes. Viewers can read boards, activity, and messages while still taking part in board chat without mutating nodes or edges.',
  },
  {
    question: 'How does realtime collaboration stay controlled?',
    answer:
      'Presence, throttled board events, and temporary node locks keep multiple collaborators aligned while preserving editing clarity.',
  },
  {
    question: 'Can we invite people without changing existing member roles?',
    answer:
      'Yes. Invite links can grant editor or viewer access, and existing workspace members keep their current role if they open a higher invite.',
  },
  {
    question: 'Is activity history included?',
    answer:
      'Yes. Board events are persisted so teams can review recent changes and understand how a workflow evolved over time.',
  },
  {
    question: 'How do we get help?',
    answer:
      'Contact support@arclino.com for onboarding guidance, workspace questions, and help structuring your boards for the team.',
  },
];

export default function FrequentlyAskedQuestions({
  title = 'Frequently asked questions',
  description = "Everything teams usually need clarified before their first shared workspace goes live.",
  data = defaultFAQs,
  className,
  supportEmail = 'support@arclino.com',
}: FrequentlyAskedQuestionsStackProps) {
  const words = title.split(' ');

  return (
    <section className={cn('relative w-full overflow-hidden pb-32', className)}>
      <div className='absolute inset-0 opacity-[0.03] pointer-events-none'>
        <div className='absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,var(--primary)_0%,transparent_50%)]' />
      </div>

      <div className='relative mx-auto max-w-7xl px-6'>
        <div className='flex flex-col items-center gap-6 text-center mb-20'>
          <h2 className='max-w-4xl text-4xl font-black tracking-tight text-foreground md:text-7xl leading-[1.1]'>
            {words.map((word, index) => (
              <motion.span
                key={`${word}-${index}`}
                initial={{ opacity: 0, filter: 'blur(6px)', y: 12 }}
                whileInView={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.4,
                  delay: index * 0.08,
                  ease: 'easeInOut',
                }}
                className='mr-4 inline-block'
              >
                {word}
              </motion.span>
            ))}
          </h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className='max-w-2xl text-lg md:text-xl text-muted-foreground'
          >
            {description}{' '}
            <a
              href={`mailto:${supportEmail}`}
              className='text-primary font-bold underline underline-offset-4 transition-opacity hover:opacity-80'
            >
              {supportEmail}
            </a>
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <LayerStack
            cardWidth={400}
            cardGap={24}
            stageHeight={400}
            lastCardFullWidth={true}
            mobileSensitivity={1.8}
          >
            {data.map((item, index) => (
              <Card
                key={index}
                className='overflow-hidden rounded-[2.5rem] border border-border bg-card/50 backdrop-blur-sm text-foreground transition-all hover:border-primary/20'
              >
                <div className='flex h-full flex-col justify-between gap-8 p-10 md:p-12'>
                  <div className='flex items-center justify-between'>
                    <span className='text-[10px] font-bold uppercase tracking-[0.2em] text-primary'>
                      FAQ 0{index + 1}
                    </span>
                    <div className='size-2 rounded-full bg-primary/20' />
                  </div>

                  <div className='flex-1 space-y-4'>
                    <div className='h-px w-12 bg-primary/30' />
                    <h3 className='text-2xl font-bold leading-tight tracking-tight md:text-3xl'>
                      {item.question}
                    </h3>
                    <p className='text-base leading-relaxed text-muted-foreground'>
                      {item.answer}
                    </p>
                  </div>

                  <div className='border-t border-border/50 pt-4'>
                    <p className='text-[10px] font-bold uppercase tracking-[0.15em] text-muted-foreground/50'>
                      Resolution {index + 1} of {data.length}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </LayerStack>
        </motion.div>
      </div>
    </section>
  );
}
