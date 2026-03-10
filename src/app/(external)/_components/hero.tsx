"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Timeline, TimelineText } from "../../../components/external/timeline";
import PixelBackground from "../../../components/external/pixel-background";

const HERO_IMAGES = [
  {
    src: "/assets/hero-image-2.avif",
    alt: "Team Meeting",
    className: "top-[20%] right-[8%] w-72 h-48 rotate-[6deg]",
    delay: 0.6,
  },
  {
    src: "/assets/hero-image-4.jpg",
    alt: "Architecture",
    className: "bottom-[10%] right-[5%] w-64 h-40 rotate-[-5deg]",
    delay: 1.0,
  },
];

export default function HeroSection() {
  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-background flex items-center justify-center pt-36" id="top">
       <div
        className="absolute inset-x-0 top-0 h-64 pointer-events-none"
        style={{
          maskImage: "linear-gradient(to bottom, black 0%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to bottom, black 0%, transparent 100%)",
        }}
      >
        <PixelBackground
          gap={6}
          speed={60}
          colors="#1a1a1a,#2a2a2a,#333333,#111111, #d4d4d4,#e5e5e5,#c4c4c4,#bababa"
          opacity={1}
          direction="top"
          className="w-full h-full absolute inset-0"
        />
      </div>

      {/* Scattered Images */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden hidden lg:block">
        {HERO_IMAGES.map((img, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 0.4, scale: 1, y: 0 }}
            transition={{ duration: 1.2, delay: img.delay, ease: [0.22, 1, 0.36, 1] }}
            className={`absolute ${img.className} rounded-2xl border border-border bg-card overflow-hidden shadow-2xl grayscale hover:grayscale-0 transition-all duration-700 hover:opacity-80 hover:scale-105`}
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              className="object-cover"
            />
          </motion.div>
        ))}
      </div>

      <div className="relative flex flex-col items-center z-10">
        <div className="flex flex-col items-center justify-center px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="mb-8 flex items-center gap-2 rounded-full border border-border bg-card/70 px-4 py-2 backdrop-blur"
          >
            <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-primary">
              Est. 2026
            </span>
            <span className="h-px w-8 bg-border" />
            <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-muted-foreground">
              Realtime Workspace
            </span>
          </motion.div>

          <div className="flex flex-col items-center gap-1">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                delay: 0.2,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="text-5xl md:text-8xl font-black tracking-tight leading-none text-center text-foreground"
            >
              Collaborate Without
            </motion.h1>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                delay: 0.32,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="text-5xl md:text-8xl font-black tracking-tight leading-none text-center text-foreground"
            >
              Boundaries
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                delay: 0.44,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="mt-4"
            >
              <Timeline
                rotation={-1.2}
                initialLeft={10}
                minWidth={56}
                containerClassName="bg-background border-primary shadow-[0_0_20px_rgba(34,211,238,0.2)]"
                handleClassName="bg-background border-primary"
                handleIndicatorClassName="bg-primary"
              >
                <TimelineText className="text-4xl md:text-8xl font-black tracking-tight py-4 text-primary">
                  The flow behind the work.
                </TimelineText>
              </Timeline>
            </motion.div>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }}
            className="mt-12 max-w-2xl text-center text-lg md:text-xl leading-relaxed text-muted-foreground"
          >
            Arclino is the realtime collaborative workspace for teams that need shared board state, clear permissions, and lightning-fast execution.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6, ease: "easeOut" }}
            className="mt-10 flex flex-col items-center gap-4 sm:flex-row"
          >
            <Link
              href="/signup"
              className="group relative h-14 px-10 flex items-center justify-center rounded-2xl bg-primary text-lg font-bold text-primary-foreground transition-all hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(34,211,238,0.4)]"
            >
              Create workspace
              <span className="ml-2 transition-transform duration-300 group-hover:translate-x-1">→</span>
            </Link>
            <Link
              href="/solutions"
              className="h-14 px-10 flex items-center justify-center rounded-2xl border border-border bg-card/60 text-lg font-bold text-foreground backdrop-blur-sm transition-all hover:bg-card hover:border-primary/20"
            >
              See the platform
            </Link>
          </motion.div>
        </div>
      </div>

      <div className="pointer-events-none absolute bottom-0 left-0 h-px w-full bg-linear-to-r from-transparent via-border to-transparent" />
    </section>
  );
}
