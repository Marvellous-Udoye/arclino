'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import PixelBackground from '@/components/external/pixel-background';
import { Timeline, TimelineText } from '@/components/external/timeline';

export default function AboutPage() {
  return (
    <main className="bg-background">
      {/* EDITORIAL HERO */}
      <section className="relative min-h-screen w-full overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0">
           <PixelBackground
            gap={10}
            speed={80}
            colors="var(--card),var(--muted)"
            opacity={0.15}
            direction="top"
          />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 pt-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12 inline-flex items-center rounded-full border border-border bg-card/50 px-5 py-2.5 backdrop-blur-sm"
          >
            <span className="text-[11px] font-black uppercase tracking-[0.4em] text-muted-foreground">
              Our Philosophy
            </span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="text-7xl md:text-[12rem] font-black text-foreground tracking-tighter leading-[0.75] mb-20"
          >
            The Map is <br />
            <span className="text-primary italic">Live.</span>
          </motion.h1>

          <div className="grid lg:grid-cols-2 gap-24 items-end">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="max-w-xl"
            >
              <Timeline 
                rotation={-0.8}
                containerClassName="bg-background border-primary mb-12"
              >
                <TimelineText className="text-3xl md:text-5xl font-black text-primary py-4">
                  Est. 2026: The Vision
                </TimelineText>
              </Timeline>
              <p className="text-2xl md:text-4xl text-muted-foreground font-medium leading-tight">
                Arclino was built for teams that realized generic whiteboards aren&apos;t enough for engineering systems.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="relative aspect-video rounded-[3rem] overflow-hidden border border-border shadow-2xl"
            >
              <Image 
                src="https://images.unsplash.com/photo-1522071823991-b59e26a08df1?q=80&w=2070&auto=format&fit=crop"
                alt="Workspace"
                fill
                className="object-cover grayscale"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Deep Narrative Section */}
      <section className="py-48 px-6 bg-card/10">
        <div className="max-w-4xl mx-auto space-y-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-12"
          >
            <h2 className="text-5xl md:text-8xl font-black text-foreground tracking-tight leading-none">
              Built for <br />Precision.
            </h2>
            <p className="text-2xl md:text-3xl text-muted-foreground leading-relaxed">
              We believe that when a system is visible, it becomes actionable. Arclino provides the infrastructure to map out your architecture, workflows, and handoffs in realtime.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-16">
            <div className="space-y-8">
              <div className="h-px w-full bg-border" />
              <h3 className="text-2xl font-bold text-foreground">State over Polish</h3>
              <p className="text-lg text-muted-foreground leading-relaxed">
                We prioritize state hydration and SSR safety over ornamental polish. If it is on the board, it is the truth. No more screenshots in Slack or stale documentation.
              </p>
            </div>
             <div className="space-y-8">
              <div className="h-px w-full bg-border" />
              <h3 className="text-2xl font-bold text-foreground">Radical Access</h3>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Permissions are baked into the database layer with Supabase RLS, ensuring every view and edit is authorized and secure.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Atmospheric Footer Section */}
      <section className="py-48 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-primary/5 blur-3xl rounded-full translate-y-1/2" />
        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <motion.h2 
             initial={{ opacity: 0, scale: 0.95 }}
             whileInView={{ opacity: 1, scale: 1 }}
             viewport={{ once: true }}
             className="text-6xl md:text-9xl font-black text-foreground mb-16 tracking-tighter"
          >
            Shared Clarity <br />is <span className="text-primary italic">Power.</span>
          </motion.h2>
          <div className="relative h-[600px] rounded-[4rem] overflow-hidden border border-border shadow-2xl">
            <Image 
              src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=2070&auto=format&fit=crop"
              alt="Collaboration"
              fill
              className="object-cover grayscale hover:grayscale-0 transition-all duration-1000"
            />
          </div>
        </div>
      </section>
    </main>
  );
}
