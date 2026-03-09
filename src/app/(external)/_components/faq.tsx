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
    <section className={cn('relative w-full overflow-hidden py-24', className)}>
      <div className='mx-auto max-w-5xl px-6'>
        <h2 className='relative z-10 mx-auto max-w-4xl text-center text-3xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl'>
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
              className='mr-2 inline-block'
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
          className='relative z-10 mx-auto mt-6 max-w-2xl text-center text-base text-muted-foreground md:text-lg'
        >
          {description}{' '}
          <a
            href={`mailto:${supportEmail}`}
            className='text-primary underline underline-offset-4 transition-opacity hover:opacity-80'
          >
            {supportEmail}
          </a>
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className='mt-16'
        >
          <LayerStack
            cardWidth={360}
            cardGap={16}
            stageHeight={320}
            lastCardFullWidth={true}
            mobileSensitivity={1.8}
          >
            {data.map((item, index) => (
              <Card
                key={index}
                className='overflow-hidden border border-border bg-card text-foreground'
              >
                <div className='flex h-full flex-col justify-between gap-4 p-6 md:p-8'>
                  <div className='flex items-center justify-between'>
                    <span className='text-[11px] font-medium uppercase tracking-[0.16em] text-muted-foreground'>
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <div className='size-1.5 rounded-full bg-foreground/20' />
                  </div>

                  <div className='flex-1 space-y-3'>
                    <div className='h-px w-8 bg-border' />
                    <h3 className='text-xl font-semibold leading-tight tracking-tight md:text-2xl'>
                      {item.question}
                    </h3>
                    <p className='text-sm leading-relaxed text-muted-foreground'>
                      {item.answer}
                    </p>
                  </div>

                  <div className='border-t border-border pt-3'>
                    <p className='text-[10px] uppercase tracking-[0.14em] text-muted-foreground'>
                      Question {index + 1} of {data.length}
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
