'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Sparkles, Zap, Layout, Cpu } from 'lucide-react';
import PixelBackground from '@/components/external/pixel-background';

const SOLUTIONS = [
  {
    title: 'Product Teams',
    description: 'Align roadmap vision with technical execution. Share live board state during planning and delivery.',
    image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=2070&auto=format&fit=crop',
    href: '/solutions/product-teams',
    icon: Sparkles,
  },
  {
    title: 'Engineering',
    description: 'Map services, dependencies, and handoffs with the same rigour your system already requires.',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2070&auto=format&fit=crop',
    href: '/solutions/engineering',
    icon: Zap,
  },
  {
    title: 'Startups',
    description: 'Move fast without losing the thread. Keep every iteration of your plan visible and auditable.',
    image: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?q=80&w=2070&auto=format&fit=crop',
    href: '/solutions/startups',
    icon: Layout,
  },
];

export default function SolutionsPage() {
  return (
    <main className="bg-background">
      {/* CAPTIVATING HERO */}
      <section className="relative min-h-screen w-full overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0">
           <PixelBackground
            gap={6}
            speed={60}
            colors="var(--primary),var(--card),var(--muted)"
            opacity={0.3}
            direction="bottom"
            className="w-full h-full"
          />
          <div className="absolute inset-0 bg-linear-to-b from-background/0 via-background/20 to-background" />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center pt-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-2"
          >
            <Cpu className="size-3.5 text-primary" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-primary">
              Operational Clarity
            </span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-6xl md:text-9xl font-black text-foreground tracking-tight leading-[0.9] mb-12"
          >
            The Map Behind <br />
            <span className="text-primary">the Build.</span>
          </motion.h1 >

          <div className="relative mx-auto max-w-2xl mb-16">
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="absolute -left-12 top-1/2 h-px w-24 bg-primary/50 hidden md:block"
            />
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-xl md:text-2xl text-muted-foreground leading-relaxed"
            >
              Arclino provides the infrastructure for teams that need more than a whiteboard. Secure, auditable, and built for complex system maps.
            </motion.p>
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="absolute -right-12 top-1/2 h-px w-24 bg-primary/50 hidden md:block"
            />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col items-center gap-4 sm:flex-row justify-center"
          >
            <Link href="/signup" className="h-16 px-10 flex items-center justify-center rounded-2xl bg-primary text-lg font-bold text-primary-foreground shadow-xl shadow-primary/20 hover:scale-[1.02] transition-all">
              Start Building
            </Link>
            <Link href="/pricing" className="h-16 px-10 flex items-center justify-center rounded-2xl border border-border bg-card/50 backdrop-blur-sm text-lg font-bold text-foreground hover:bg-card transition-all">
              View Pricing
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Solutions Grid - High Fidelity */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto space-y-48">
          {SOLUTIONS.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className={`grid lg:grid-cols-2 gap-24 items-center ${i % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}
            >
              <div className={i % 2 === 1 ? 'lg:order-2' : ''}>
                <div className="mb-8 flex size-16 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <item.icon className="size-8" />
                </div>
                <h2 className="text-5xl md:text-7xl font-black text-foreground tracking-tight mb-8">
                  {item.title}
                </h2>
                <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed mb-12">
                  {item.description}
                </p>
                <div className="grid gap-6 mb-12">
                  {[
                    { label: 'Realtime state sync', value: '10ms latency' },
                    { label: 'Permissioned access', value: 'RLS enforced' },
                    { label: 'Audit trails', value: '100% visibility' }
                  ].map((feature) => (
                    <div key={feature.label} className="flex items-center justify-between p-4 rounded-2xl bg-card/30 border border-border/50">
                      <span className="font-bold text-foreground/80">{feature.label}</span>
                      <span className="text-xs font-black uppercase tracking-widest text-primary">{feature.value}</span>
                    </div>
                  ))}
                </div>
                <Link href={item.href} className="inline-flex items-center gap-2 h-16 px-10 rounded-2xl bg-foreground text-background font-bold hover:scale-[1.02] transition-all">
                  Deep Dive <ArrowRight className="size-4" />
                </Link>
              </div>

              <div className={`relative h-[700px] rounded-[4rem] overflow-hidden border border-border shadow-2xl ${i % 2 === 1 ? 'lg:order-1' : ''}`}>
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover grayscale hover:grayscale-0 transition-all duration-1000"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-48 bg-card/10 border-y border-border relative overflow-hidden">
         <div className="absolute inset-0 opacity-10">
            <PixelBackground gap={12} speed={100} colors="var(--primary)" direction="top" />
         </div>
         <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
            <h2 className="text-5xl md:text-9xl font-black text-foreground mb-12 tracking-tight leading-none">
              Map the system, <br />ship the product.
            </h2>
            <Link href="/signup" className="h-20 px-12 inline-flex items-center justify-center rounded-2xl bg-primary text-xl font-bold text-primary-foreground shadow-2xl shadow-primary/20 hover:scale-[1.05] transition-all">
              Create your workspace
            </Link>
         </div>
      </section>
    </main>
  );
}
