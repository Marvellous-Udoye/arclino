'use client';

import { motion } from 'framer-motion';
import { FlowingLogos } from '@/components/ui/flowing-logos';
import { cn } from '@/lib/utils';

interface Logo {
  name: string;
  image: string;
}

interface LogoCloudMarqueeProps {
  title?: string;
  description?: string;
  data?: Logo[];
  className?: string;
}

const defaultLogos: Logo[] = [
  { image: 'https://cdn.worldvectorlogo.com/logos/linear-1.svg', name: 'Linear' },
  { image: 'https://cdn.worldvectorlogo.com/logos/vercel.svg', name: 'Vercel' },
  { image: 'https://cdn.worldvectorlogo.com/logos/stripe-4.svg', name: 'Stripe' },
  { image: 'https://cdn.worldvectorlogo.com/logos/supabase.svg', name: 'Supabase' },
  { image: 'https://cdn.worldvectorlogo.com/logos/framer-1.svg', name: 'Framer' },
  { image: 'https://cdn.worldvectorlogo.com/logos/slack-new-logo.svg', name: 'Slack' },
  { image: 'https://cdn.worldvectorlogo.com/logos/figma-5.svg', name: 'Figma' },
  { image: 'https://cdn.worldvectorlogo.com/logos/notion-2.svg', name: 'Notion' },
];

export default function LogoStrip({
  title = 'Infrastructure trusted by the best',
  description = 'Arclino powers teams that demand precision, shared state, and radical transparency.',
  data = defaultLogos,
  className,
}: LogoCloudMarqueeProps) {
  const words = title.split(' ');

  return (
    <section className={cn('relative w-full overflow-hidden py-32 bg-background', className)}>
      <div className='absolute inset-0 opacity-[0.03] pointer-events-none'>
        <div className='absolute inset-0 bg-[radial-gradient(circle_at_center,var(--primary)_0%,transparent_70%)]' />
      </div>

      <div className='relative mx-auto max-w-6xl px-6'>
        <h2 className='relative z-10 mx-auto max-w-4xl text-center text-4xl font-black tracking-tight text-foreground md:text-6xl'>
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
          className='relative z-10 mx-auto mt-8 max-w-2xl text-center text-lg text-muted-foreground md:text-xl'
        >
          {description}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className='relative mt-20'
        >
          <div className='pointer-events-none absolute inset-y-0 left-0 z-20 w-32 bg-linear-to-r from-background via-background/60 to-transparent' />
          <div className='pointer-events-none absolute inset-y-0 right-0 z-20 w-32 bg-linear-to-l from-background via-background/60 to-transparent' />
          <FlowingLogos
            data={data}
            variant='wide'
            className='[--duration:40s]'
          />
        </motion.div>
      </div>
    </section>
  );
}
