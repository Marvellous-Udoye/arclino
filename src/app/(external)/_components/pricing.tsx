'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface PricingTier {
  name: string;
  description: string;
  monthlyPrice: number;
  yearlyPrice: number;
  features: string[];
  buttonText: string;
  popular?: boolean;
}

interface PricingSwitchProps {
  title?: string;
  subtitle?: string;
  description?: string;
  tiers?: PricingTier[];
  className?: string;
}

const defaultTiers: PricingTier[] = [
  {
    name: 'Viewer',
    description: 'For teams that need shared visibility without edit access.',
    monthlyPrice: 8,
    yearlyPrice: 6,
    features: [
      'Unlimited board views',
      'Board chat participation',
      'Activity feed access',
      'Invite-based onboarding',
    ],
    buttonText: 'Start viewing',
    popular: false,
  },
  {
    name: 'Editor',
    description: 'For active collaborators shaping the board in realtime.',
    monthlyPrice: 24,
    yearlyPrice: 19,
    features: [
      'Node and edge editing',
      'Realtime collaboration',
      'Board creation',
      'Activity logging',
    ],
    buttonText: 'Create a workspace',
    popular: true,
  },
  {
    name: 'Owner',
    description: 'For teams that need governance, invites, and controlled sharing.',
    monthlyPrice: 59,
    yearlyPrice: 47,
    features: [
      'Workspace role management',
      'Invite link controls',
      'Board governance',
      'Operational support',
    ],
    buttonText: 'Talk to us',
    popular: false,
  },
];

const smoothEase = [0.25, 0.1, 0.25, 1] as const;
export default function Pricing({
  title = 'Pricing that matches how teams collaborate',
  subtitle = 'Pricing',
  description = 'Start with the role your team needs today, then expand access as the board becomes part of how your work ships.',
  tiers = defaultTiers,
  className,
}: PricingSwitchProps) {
  const [isYearly, setIsYearly] = useState(false);

  return (
    <section
      className={cn(
        'relative w-full overflow-hidden bg-background py-20',
        className,
      )}
    >
      <div className='mx-auto max-w-7xl px-4 sm:px-6'>
        <div className='flex flex-col items-center text-center gap-4 mb-12'>
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: smoothEase }}
            className='inline-flex items-center rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5'
          >
            <span className='text-sm font-medium text-primary'>
              {subtitle}
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.15, ease: smoothEase }}
            className='text-4xl md:text-5xl lg:text-6xl font-bold text-foreground'
          >
            {title}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.3, ease: smoothEase }}
            className='max-w-md text-lg text-muted-foreground'
          >
            {description}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.4, ease: smoothEase }}
            className='mt-2 flex items-center gap-1 rounded-full border border-border bg-muted px-1 py-1'
          >
            {[
              { label: 'Monthly', yearly: false },
              { label: 'Yearly', yearly: true },
            ].map(({ label, yearly }) => {
              const isActive = isYearly === yearly;
              return (
                <button
                  key={label}
                  onClick={() => setIsYearly(yearly)}
                  className='w-28 py-2 rounded-full text-sm font-semibold transition-colors duration-200 flex items-center justify-center gap-2'
                >
                  <span
                    className={cn(
                      'transition-colors duration-200',
                      isActive
                        ? 'text-foreground'
                        : 'text-muted-foreground',
                    )}
                  >
                    {label}
                  </span>
                  {yearly && (
                    <span className='inline-flex items-center rounded-full bg-primary/10 px-2 py-0.5 text-xs font-semibold text-primary'>
                      -20%
                    </span>
                  )}
                </button>
              );
            })}
          </motion.div>
        </div>

        <div className='grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-5xl mx-auto items-center'>
          {tiers.map((tier, index) => {
            const price = isYearly ? tier.yearlyPrice : tier.monthlyPrice;
            const isPopular = tier.popular;

            return (
              <motion.div
                key={tier.name}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 1.0,
                  delay: 0.2 + index * 0.2,
                  ease: smoothEase,
                }}
                className={cn('min-w-0', isPopular ? 'sm:-mt-6 sm:mb-6' : '')}
              >
                {isPopular ? (
                  <div
                    className='relative p-0.5 rounded-3xl'
                    style={{ background: 'var(--primary)' }}
                  >
                    <Card className='relative overflow-visible rounded-[22px] border-0 bg-card'>
                      <div
                        className='absolute -top-px left-1/2 z-10 -translate-x-1/2 whitespace-nowrap rounded-b-2xl bg-primary px-5 py-1.5 text-xs font-semibold tracking-wide text-primary-foreground'
                      >
                        Popular
                      </div>

                      <CardHeader className='px-6 pt-10 pb-0'>
                        <CardTitle className='mb-1 text-2xl font-bold text-foreground'>
                          {tier.name}
                        </CardTitle>
                        <CardDescription className='text-sm text-muted-foreground'>
                          {tier.description}
                        </CardDescription>

                        <div className='mt-6 rounded-2xl border border-dashed border-border px-4 py-3 text-center'>
                          <AnimatePresence mode='wait'>
                            <motion.div
                              key={`${tier.name}-${isYearly}`}
                              initial={{ opacity: 0, y: -8 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: 8 }}
                              transition={{ duration: 0.35, ease: smoothEase }}
                              className='flex items-baseline justify-center gap-1'
                            >
                              <span className='text-4xl font-bold text-foreground'>
                                ${price}
                              </span>
                              <span className='text-sm text-muted-foreground'>
                                /month
                              </span>
                            </motion.div>
                          </AnimatePresence>
                          {isYearly && (
                            <p className='mt-1 text-xs text-muted-foreground'>
                              billed annually
                            </p>
                          )}
                        </div>
                      </CardHeader>

                      <CardContent className='px-6 pt-6 pb-8 flex flex-col gap-6'>
                        <div className='flex flex-col gap-3'>
                          {tier.features.map((feature, fi) => (
                            <div key={fi} className='flex items-center gap-3'>
                              <div className='flex h-5 w-5 shrink-0 items-center justify-center rounded bg-primary'>
                                <Check
                                  className='w-3 h-3 text-primary-foreground'
                                  strokeWidth={3}
                                />
                              </div>
                              <span className='text-sm text-muted-foreground'>
                                {feature}
                              </span>
                            </div>
                          ))}
                        </div>

                        <Button
                          className='h-11 w-full rounded-2xl border-0 bg-primary text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90'
                        >
                          {tier.buttonText}
                        </Button>
                      </CardContent>
                    </Card>
                  </div>
                ) : (
                  <Card className='h-full overflow-hidden rounded-3xl border-border bg-card'>
                    <CardHeader className='px-6 pt-8 pb-0'>
                      <CardTitle className='mb-1 text-2xl font-bold text-foreground'>
                        {tier.name}
                      </CardTitle>
                      <CardDescription className='text-sm text-muted-foreground'>
                        {tier.description}
                      </CardDescription>

                      <div className='mt-6 rounded-2xl border border-dashed border-border px-4 py-3 text-center'>
                        <AnimatePresence mode='wait'>
                          <motion.div
                            key={`${tier.name}-${isYearly}`}
                            initial={{ opacity: 0, y: -8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 8 }}
                            transition={{ duration: 0.35, ease: smoothEase }}
                            className='flex items-baseline justify-center gap-1'
                          >
                            <span className='text-4xl font-bold text-foreground'>
                              ${price}
                            </span>
                            <span className='text-sm text-muted-foreground'>
                              /month
                            </span>
                          </motion.div>
                        </AnimatePresence>
                        {isYearly && (
                          <p className='mt-1 text-xs text-muted-foreground'>
                            billed annually
                          </p>
                        )}
                      </div>
                    </CardHeader>

                    <CardContent className='px-6 pt-6 pb-8 flex flex-col gap-6'>
                      <div className='flex flex-col gap-3'>
                        {tier.features.map((feature, fi) => (
                          <div key={fi} className='flex items-center gap-3'>
                            <div className='flex h-5 w-5 shrink-0 items-center justify-center rounded bg-muted'>
                              <Check
                                className='w-3 h-3 text-muted-foreground'
                                strokeWidth={3}
                              />
                            </div>
                            <span className='text-sm text-muted-foreground'>
                              {feature}
                            </span>
                          </div>
                        ))}
                      </div>

                      <Button
                        className='h-11 w-full rounded-2xl bg-foreground text-sm font-semibold text-background transition-colors hover:bg-foreground/90'
                        variant='default'
                      >
                        {tier.buttonText}
                      </Button>
                    </CardContent>
                  </Card>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
