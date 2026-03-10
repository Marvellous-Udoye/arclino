'use client';

import Pricing from '../_components/pricing';
import { motion } from 'framer-motion';
import { Shield, Zap, Sparkles, Database } from 'lucide-react';
import PixelBackground from '@/components/external/pixel-background';
import Image from 'next/image';

export default function PricingPage() {
  return (
    <main className="bg-background">
      {/* CINEMATIC HERO */}
      <section className="relative min-h-[80vh] w-full overflow-hidden flex items-center justify-center pt-32">
        <div className="absolute inset-0">
           <PixelBackground
            gap={8}
            speed={40}
            colors="var(--primary),var(--card)"
            opacity={0.2}
            direction="top"
            className="w-full h-full"
          />
          <div className="absolute inset-0 bg-linear-to-t from-background via-background/20 to-transparent" />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-2"
          >
            <Zap className="size-3.5 text-primary" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-primary">
              Simple. Scalable. Secure.
            </span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-6xl md:text-9xl font-black text-foreground tracking-tight leading-[0.85] mb-12"
          >
            Pricing for <br />
            <span className="text-primary italic">Execution.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed"
          >
            Start free, scale with your team. Arclino is priced to move with your operational complexity, not against your budget.
          </motion.p>
        </div>
      </section>

      <Pricing />

      {/* High Fidelity Feature Grid */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { icon: Shield, title: 'Enterprise Auth', desc: 'Secure SSR session handling with Supabase.' },
            { icon: Zap, title: '10ms Latency', desc: 'Realtime board events via Pusher infrastructure.' },
            { icon: Database, title: 'State Persistence', desc: 'Auto-saving boards with Yjs-inspired hydration.' },
            { icon: Sparkles, title: 'Canvas Engine', desc: 'High-performance React Flow 11 implementation.' },
          ].map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group p-8 rounded-[2.5rem] border border-border bg-card/30 backdrop-blur-sm hover:border-primary/30 transition-all"
            >
              <div className="size-16 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                <item.icon className="size-8" />
              </div>
              <h4 className="text-2xl font-bold text-foreground mb-4">{item.title}</h4>
              <p className="text-muted-foreground leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Large Visual Section */}
      <section className="pb-48 px-6">
        <div className="max-w-7xl mx-auto relative h-[700px] rounded-[4rem] overflow-hidden border border-border shadow-2xl shadow-primary/5">
          <Image
            src="https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop"
            alt="Collaborative Session"
            fill
            className="object-cover grayscale hover:grayscale-0 transition-all duration-1000"
          />
          <div className="absolute inset-0 bg-linear-to-t from-background via-background/40 to-transparent" />
          <div className="absolute bottom-20 left-20 max-w-2xl">
            <h3 className="text-5xl md:text-7xl font-black text-foreground tracking-tight leading-none mb-8">
              Build your <br />system, <span className="text-primary">together.</span>
            </h3>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Join teams at Linear, DevFlow, and Aura who use Arclino to keep their shared state visible and their execution fast.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
