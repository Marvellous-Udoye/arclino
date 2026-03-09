'use client';

import { motion } from 'framer-motion';

const trustedBy = [
  'Product teams',
  'Engineering orgs',
  'Operations',
  'Founders',
  'Platform leads',
  'Delivery teams',
];

export default function LogoStrip() {
  return (
    <section className='border-y border-border bg-card/40 py-6'>
      <div className='mx-auto flex max-w-7xl flex-col gap-4 px-6 lg:flex-row lg:items-center lg:justify-between'>
        <motion.p
          initial={{ opacity: 0, x: -12 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className='text-xs font-semibold uppercase tracking-[0.28em] text-muted-foreground'
        >
          Trusted by teams that need shared system clarity
        </motion.p>

        <div className='grid flex-1 gap-3 sm:grid-cols-3 lg:grid-cols-6'>
          {trustedBy.map((item, index) => (
            <motion.div
              key={item}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: index * 0.06 }}
              className='rounded-2xl border border-border bg-background/70 px-4 py-3 text-center text-sm font-medium text-foreground/80 backdrop-blur'
            >
              {item}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
