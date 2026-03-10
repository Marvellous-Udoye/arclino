'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Book, MessageSquare, Zap, Search } from 'lucide-react';
import PixelBackground from '@/components/external/pixel-background';

const CATEGORIES = [
  {
    title: 'Operational Guides',
    desc: 'Deep dives into workspace management and board role setup.',
    icon: Book,
    color: 'var(--primary)',
  },
  {
    title: 'Developer Hub',
    desc: 'API documentation and Pusher event integration guides.',
    icon: Zap,
    color: '#8B5CF6',
  },
  {
    title: 'Product Strategy',
    desc: 'How to use boards for roadmap alignment and delivery.',
    icon: MessageSquare,
    color: '#10B981',
  },
];

const ARTICLES = [
  {
    title: 'Mastering SSR-safe State',
    category: 'Engineering',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070&auto=format&fit=crop',
    href: '/resources/blog/ssr-state',
  },
  {
    title: 'Board Permissions 101',
    category: 'Security',
    image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=2070&auto=format&fit=crop',
    href: '/resources/blog/permissions',
  },
  {
    title: 'Mapping Service Maps',
    category: 'Architecture',
    image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=2070&auto=format&fit=crop',
    href: '/resources/blog/service-maps',
  },
];

export default function ResourcesPage() {
  return (
    <main className="bg-background">
      {/* KNOWLEDGE HERO */}
      <section className="relative min-h-[85vh] w-full overflow-hidden flex items-center justify-center pt-32">
        <div className="absolute inset-0">
           <PixelBackground
            gap={6}
            speed={50}
            colors="var(--muted-foreground),var(--card)"
            opacity={0.1}
            direction="bottom"
          />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-2"
          >
            <Search className="size-3.5 text-primary" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-primary">
              The Knowledge Base
            </span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-7xl md:text-[10rem] font-black text-foreground tracking-tight leading-[0.8] mb-12"
          >
            Shared <br />
            <span className="text-primary">Intelligence.</span>
          </motion.h1>

          <div className="relative max-w-xl mx-auto mb-16">
            <input 
              type="text" 
              placeholder="Search guides, docs, and best practices..."
              className="w-full h-16 bg-card border border-border rounded-2xl px-8 text-lg font-medium text-foreground placeholder:text-muted-foreground outline-none focus:border-primary/50 focus:ring-4 focus:ring-primary/5 transition-all"
            />
            <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
              <kbd className="h-8 px-2 flex items-center justify-center rounded-lg border border-border bg-background text-[10px] font-bold text-muted-foreground">⌘ K</kbd>
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-4">
             {['Documentation', 'API Reference', 'Case Studies', 'Changelog'].map((tag) => (
               <button key={tag} className="px-6 py-2 rounded-full border border-border bg-card/50 text-xs font-bold text-muted-foreground hover:text-foreground hover:border-primary/30 transition-all">
                 {tag}
               </button>
             ))}
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8">
          {CATEGORIES.map((cat, i) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group p-10 rounded-[3rem] border border-border bg-card/30 backdrop-blur-sm hover:border-primary/20 transition-all cursor-pointer"
            >
              <div 
                className="size-16 rounded-2xl flex items-center justify-center mb-8 shadow-lg transition-transform group-hover:scale-110"
                style={{ backgroundColor: `${cat.color}15`, color: cat.color }}
              >
                <cat.icon className="size-8" />
              </div>
              <h3 className="text-3xl font-bold text-foreground mb-4">{cat.title}</h3>
              <p className="text-lg text-muted-foreground leading-relaxed flex-1">{cat.desc}</p>
              <div className="mt-10 flex items-center gap-2 text-sm font-bold text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                Explore <ArrowRight className="size-4" />
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Featured Articles - Authentic Media */}
      <section className="py-32 px-6 bg-card/10 border-y border-border">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-20">
            <h2 className="text-5xl font-black text-foreground tracking-tight leading-none">
              Featured <br />Resources.
            </h2>
            <Link href="/resources/blog" className="h-14 px-8 flex items-center justify-center rounded-2xl bg-foreground text-background font-bold text-sm">
              View all blog
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {ARTICLES.map((article, i) => (
              <motion.div
                key={article.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group flex flex-col rounded-[2.5rem] border border-border bg-background overflow-hidden hover:border-primary/30 transition-all"
              >
                <div className="relative h-64 overflow-hidden">
                  <Image 
                    src={article.image}
                    alt={article.title}
                    fill
                    className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110"
                  />
                  <div className="absolute top-4 left-4 h-8 px-4 flex items-center justify-center rounded-full bg-background/80 backdrop-blur text-[10px] font-black uppercase tracking-widest text-foreground">
                    {article.category}
                  </div>
                </div>
                <div className="p-8 space-y-4">
                  <h4 className="text-2xl font-bold text-foreground leading-tight group-hover:text-primary transition-colors">
                    {article.title}
                  </h4>
                  <Link href={article.href} className="inline-flex items-center gap-2 text-sm font-bold text-muted-foreground group-hover:text-foreground transition-colors">
                    Read guide <ArrowRight className="size-4" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
