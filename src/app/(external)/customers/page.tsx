'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Quote, Users } from 'lucide-react';
import PixelBackground from '@/components/external/pixel-background';

const CASE_STUDIES = [
  {
    company: 'Linear Build',
    title: 'How Linear Build manages hardware handoffs.',
    image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=2070&auto=format&fit=crop',
    quote: 'Arclino bridge the gap between our high-level plans and the actual technical flow.',
    author: 'Sarah Chen, Head of Ops',
  },
  {
    company: 'DevFlow',
    title: 'Scaling documentation with live boards.',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop',
    quote: 'Static diagrams are dead. Arclino boards are the living documentation of our architecture.',
    author: 'Markus Weber, Staff Engineer',
  },
];

export default function CustomersPage() {
  return (
    <main className="bg-background">
      {/* PROOF HERO */}
      <section className="relative min-h-screen w-full overflow-hidden flex items-center justify-center pt-32">
        <div className="absolute inset-0">
           <PixelBackground
            gap={6}
            speed={60}
            colors="var(--primary),var(--card)"
            opacity={0.15}
            direction="top"
          />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-2"
          >
            <Users className="size-3.5 text-primary" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-primary">
              Trusted Excellence
            </span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-7xl md:text-[11rem] font-black text-foreground tracking-tighter leading-[0.8] mb-16"
          >
            Proof in <br />
            <span className="text-primary">Motion.</span>
          </motion.h1>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-20">
             {[
               { label: 'Uptime', val: '99.99%' },
               { label: 'Latency', val: '10ms' },
               { label: 'Boards', val: '1M+' },
             ].map((stat, i) => (
               <motion.div
                 key={stat.label}
                 initial={{ opacity: 0, y: 10 }}
                 animate={{ opacity: 1, y: 0 }}
                 transition={{ delay: 0.3 + (i * 0.1) }}
                 className="p-8 rounded-3xl border border-border bg-card/30 backdrop-blur-sm"
               >
                 <p className="text-5xl font-black text-foreground mb-2">{stat.val}</p>
                 <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">{stat.label}</p>
               </motion.div>
             ))}
          </div>
        </div>
      </section>

      {/* Featured Case Studies */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto space-y-48">
          {CASE_STUDIES.map((study, i) => (
            <motion.div
              key={study.company}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className={`grid lg:grid-cols-2 gap-24 items-center ${i % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}
            >
              <div className={i % 2 === 1 ? 'lg:order-2' : ''}>
                <p className="text-xs font-black uppercase tracking-[0.4em] text-primary mb-6">
                  Success Story: {study.company}
                </p>
                <h2 className="text-5xl md:text-7xl font-black text-foreground tracking-tight mb-10 leading-[0.95]">
                  {study.title}
                </h2>
                
                <div className="p-10 rounded-[3rem] bg-card/50 border border-border relative mb-12 shadow-2xl">
                  <Quote className="size-12 text-primary/20 absolute top-8 left-8" />
                  <p className="text-2xl text-foreground italic leading-relaxed relative z-10 pl-12">
                    &quot;{study.quote}&quot;
                  </p>
                  <p className="mt-8 text-sm font-bold text-muted-foreground pl-12">
                    — {study.author}
                  </p>
                </div>

                <Link
                  href={`/customers/case-studies/${study.company.toLowerCase().replace(' ', '-')}`}
                  className="h-16 px-10 inline-flex items-center justify-center rounded-2xl bg-foreground text-background font-black text-sm hover:scale-[1.05] transition-all"
                >
                  Read the story <ArrowRight className="size-4 ml-2" />
                </Link>
              </div>

              <div className={`relative h-[700px] rounded-[4rem] overflow-hidden border border-border shadow-2xl ${i % 2 === 1 ? 'lg:order-1' : ''}`}>
                <Image
                  src={study.image}
                  alt={study.company}
                  fill
                  className="object-cover grayscale hover:grayscale-0 transition-all duration-1000"
                />
                <div className="absolute inset-0 bg-linear-to-t from-background/40 to-transparent" />
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Trust Grid */}
      <section className="bg-card/20 py-48 border-y border-border">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-5xl md:text-8xl font-black text-foreground tracking-tighter mb-20 leading-none">
            Infrastructure for <br />ambitious teams.
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-16 grayscale opacity-40">
             {['PHOENIX', 'OSLO', 'THEO', 'KANSAS', 'CAIRO', 'AURA'].map((logo) => (
               <div key={logo} className="flex items-center justify-center">
                 <span className="text-3xl font-black tracking-tighter text-foreground">{logo}</span>
               </div>
             ))}
          </div>
        </div>
      </section>
    </main>
  );
}
