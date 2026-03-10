'use client';

import { motion } from 'framer-motion';
import { AnimatedTestimonials } from '@/components/external/animated-testimonials';

const testimonials = [
  {
    name: 'Sarah Mitchell',
    handle: 'Product lead',
    description:
      'Arclino gave our product and engineering teams one place to talk through the actual flow, not just screenshots and scattered notes.',
    image:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&q=80&auto=format',
  },
  {
    name: 'David Chen',
    handle: 'Staff engineer',
    description:
      'The realtime board state feels dependable. We can move quickly during planning sessions without losing control of what changed.',
    image:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&q=80&auto=format',
  },
  {
    name: 'Maria Santos',
    handle: 'Operations manager',
    description:
      'We use it to make handoffs visible. People stop guessing where the process breaks because the board becomes the shared source of truth.',
    image:
      'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=80&q=80&auto=format',
  },
  {
    name: 'James Anderson',
    handle: 'Founding engineer',
    description:
      'The permission model matters. We can bring more people into a board without turning the canvas into a free-for-all.',
    image:
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&q=80&auto=format',
  },
  {
    name: 'Priya Sharma',
    handle: 'Design systems lead',
    description:
      'It is rare to find a collaborative tool that feels structured enough for engineering and still readable enough for cross-functional reviews.',
    image:
      'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=80&q=80&auto=format',
  },
  {
    name: 'Alex Turner',
    handle: 'Engineering manager',
    description:
      'Activity history is the underrated part. It gives us context after a fast collaboration session instead of forcing memory-based decisions.',
    image:
      'https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=80&q=80&auto=format',
  },
  {
    name: 'Emma Williams',
    handle: 'Startup founder',
    description:
      'We needed one board where product, ops, and engineering could all work live. Arclino made that possible without extra ceremony.',
    image:
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&q=80&auto=format',
  },
  {
    name: 'Ryan Martinez',
    handle: 'Platform architect',
    description:
      'The combination of realtime sync, controlled access, and a structured node system makes it much more usable than a generic whiteboard.',
    image:
      'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=80&q=80&auto=format',
  },
];

export default function Testimonials() {
  const titleWords = 'Trusted by teams that need shared clarity'.split(' ');

  return (
    <section className='relative w-full bg-background'>
      <div className='relative z-10 flex flex-col items-center w-full'>
        <div className='flex flex-col items-center gap-4 text-center py-12 md:py-16'>
          <h2 className='text-4xl md:text-6xl font-bold text-foreground tracking-tight'>
            {titleWords.map((word, index) => (
              <motion.span
                key={`title-${word}-${index}`}
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
            transition={{ duration: 0.5, delay: 0.5 }}
            className='text-base md:text-lg text-muted-foreground max-w-2xl px-4'
          >
            Product, engineering, and operations teams use the same board because the structure is strong enough to keep collaboration usable.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.65 }}
          className='w-full mb-16'
        >
          <AnimatedTestimonials data={testimonials} />
        </motion.div>
      </div>
    </section>
  );
}
