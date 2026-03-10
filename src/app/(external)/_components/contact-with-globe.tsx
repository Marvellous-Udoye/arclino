'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { ArrowRight, Mail, Phone, Headphones } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SeparatorPro } from '@/components/ui/seperatorpro';
import GlobeWireframe from '@/components/ui/globe-wireframe';

const smoothEase = [0.25, 0.1, 0.25, 1] as const;

const CONTACT_LINKS = [
  {
    icon: Mail,
    label: 'contact@arclino.ai',
    href: 'mailto:contact@arclino.ai',
  },
  { icon: Phone, label: '+1 (800) 321 XX21', href: 'tel:+18003214321' },
  {
    icon: Headphones,
    label: 'support@arclino.ai',
    href: 'mailto:support@arclino.ai',
  },
];

interface ContactWithGlobeProps {
  title?: string;
  subtitle?: string;
  description?: string;
  className?: string;
}

export default function ContactWithGlobe({
  title = 'Contact us',
  subtitle = 'Contact',
  description = 'We are always looking for ways to improve our products and services. Contact us and let us know how we can help you.',
  className,
}: ContactWithGlobeProps) {
  return (
    <section
      className={cn(
        'relative w-full bg-background overflow-hidden py-32',
        className,
      )}
    >
      <div className='relative mx-auto max-w-7xl px-4 sm:px-6'>
        <div className='flex flex-col items-center text-center gap-6 mb-20'>
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: smoothEase }}
            className='inline-flex items-center px-4 py-1.5 rounded-full bg-primary/10 border border-primary/30'
          >
            <span className='text-xs font-bold uppercase tracking-widest text-primary'>
              {subtitle}
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.15, ease: smoothEase }}
            className='text-4xl md:text-7xl font-black text-foreground'
          >
            {title}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.3, ease: smoothEase }}
            className='text-lg md:text-xl text-muted-foreground max-w-2xl'
          >
            {description}
          </motion.p>
        </div>

        <div className='grid grid-cols-1 lg:grid-cols-2 gap-16 max-w-6xl mx-auto items-start'>
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.0, delay: 0.2, ease: smoothEase }}
            className='flex flex-col gap-10'
          >
            <div className='flex flex-col gap-3'>
              <h3 className='text-2xl font-bold text-foreground'>
                Get in touch
              </h3>
              <p className='text-base text-muted-foreground leading-relaxed max-w-sm'>
                Reach out via any channel below. We typically reply within one
                business day.
              </p>
            </div>

            <div className='flex flex-col gap-4'>
              {CONTACT_LINKS.map(({ icon: Icon, label, href }, i) => (
                <motion.a
                  key={label}
                  href={href}
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.5,
                    delay: 0.3 + i * 0.1,
                    ease: smoothEase,
                  }}
                  className='group flex items-center gap-4 w-fit text-base font-medium text-muted-foreground hover:text-foreground transition-all duration-200'
                >
                  <div className='w-12 h-12 rounded-2xl bg-card border border-border group-hover:border-primary/40 group-hover:bg-primary/5 flex items-center justify-center shrink-0 transition-all duration-200 shadow-sm'>
                    <Icon className='w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors duration-200' />
                  </div>
                  {label}
                </motion.a>
              ))}
            </div>

            <div className='relative overflow-hidden h-72 rounded-[2.5rem] border border-border bg-card/30 backdrop-blur-sm'>
              <GlobeWireframe
                className='w-full aspect-square max-w-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'
                variant='wireframesolid'
                autoRotate
                autoRotateSpeed={0.45}
                strokeWidth={0.6}
                graticuleOpacity={0.12}
                scale={1.2}
              />
              <div className='pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-linear-to-t from-background to-transparent' />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.0, delay: 0.35, ease: smoothEase }}
            className='rounded-[2.5rem] border border-border bg-card/50 backdrop-blur-xl p-8 sm:p-12 flex flex-col gap-8 shadow-2xl shadow-primary/5'
          >
            <div className='space-y-2'>
              <h3 className='text-2xl font-bold text-foreground'>
                Send a message
              </h3>
              <p className='text-base text-muted-foreground'>
                Fill out the form and we&apos;ll get back to you promptly.
              </p>
            </div>

            <SeparatorPro variant='dots' />

            <div className='grid grid-cols-1 sm:grid-cols-2 gap-6'>
              <div className='flex flex-col gap-2.5'>
                <label className='text-[10px] font-black tracking-widest uppercase text-muted-foreground'>
                  Full Name
                </label>
                <input
                  type='text'
                  placeholder='Arclino User'
                  className='w-full bg-background/50 border border-border rounded-2xl px-5 py-3.5 text-sm text-foreground placeholder:text-muted-foreground/50 outline-none focus:border-primary/50 focus:ring-4 focus:ring-primary/5 transition-all duration-200'
                />
              </div>
              <div className='flex flex-col gap-2.5'>
                <label className='text-[10px] font-black tracking-widest uppercase text-muted-foreground'>
                  Company
                </label>
                <input
                  type='text'
                  placeholder='Arclino Inc.'
                  className='w-full bg-background/50 border border-border rounded-2xl px-5 py-3.5 text-sm text-foreground placeholder:text-muted-foreground/50 outline-none focus:border-primary/50 focus:ring-4 focus:ring-primary/5 transition-all duration-200'
                />
              </div>
            </div>

            <div className='flex flex-col gap-2.5'>
              <label className='text-[10px] font-black tracking-widest uppercase text-muted-foreground'>
                Email Address
              </label>
              <input
                type='email'
                placeholder='support@arclino.ai'
                className='w-full bg-background/50 border border-border rounded-2xl px-5 py-3.5 text-sm text-foreground placeholder:text-muted-foreground/50 outline-none focus:border-primary/50 focus:ring-4 focus:ring-primary/5 transition-all duration-200'
              />
            </div>

            <div className='flex flex-col gap-2.5'>
              <label className='text-[10px] font-black tracking-widest uppercase text-muted-foreground'>
                Message
              </label>
              <textarea
                placeholder='Type your message here'
                rows={5}
                className='w-full bg-background/50 border border-border rounded-2xl px-5 py-4 text-sm text-foreground placeholder:text-muted-foreground/50 outline-none focus:border-primary/50 focus:ring-4 focus:ring-primary/5 resize-none transition-all duration-200'
              />
            </div>

            <Button className='w-full h-14 rounded-2xl font-bold text-base bg-primary hover:bg-primary/90 text-primary-foreground group shadow-lg shadow-primary/20'>
              Submit Message
              <ArrowRight className='w-5 h-5 transition-transform duration-200 group-hover:translate-x-1' />
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
