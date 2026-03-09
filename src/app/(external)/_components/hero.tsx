"use client";

import React from "react";
import { motion } from "framer-motion";
import { Timeline, TimelineText } from "../../../components/external/timeline";
import PixelBackground from "../../../components/external/pixel-background";
import { Card, CardContent } from "@/components/ui/card";
import { OrbButton } from "@/components/external/orb-button";

const CARDS = [
  {
    src: "/assets/hero-image-3.jpg",
    alt: "Friends",
    rotate: -22,
    delay: 0.9,
    z: 10,
  },
  {
    src: "/assets/hero-image-2.avif",
    alt: "Woman portrait",
    rotate: -11,
    delay: 0.75,
    z: 20,
  },
  {
    src: "/assets/hero-image-1.avif",
    alt: "Man portrait",
    rotate: 0,
    delay: 0.6,
    z: 30,
  },
  {
    src: "/assets/hero-image-4.jpg",
    alt: "Portrait",
    rotate: 11,
    delay: 0.75,
    z: 20,
  },
  {
    src: "/assets/hero-image-5.jpg",
    alt: "Street style",
    rotate: 22,
    delay: 0.9,
    z: 10,
  },
];

const Navbar: React.FC = () => (
  <nav className="flex w-full items-center justify-between border-t border-b border-zinc-200 dark:border-zinc-800 px-6 py-4">
    <div className="flex items-center gap-2">
      <div className="size-7 rounded-lg bg-yellow-400" />
      <h1 className="text-base font-bold md:text-xl text-zinc-900 dark:text-white">
        ScrollX UI
      </h1>
    </div>
    <button
      type="button"
      className="rounded-lg bg-neutral-900 dark:bg-white px-4 py-2 text-sm font-medium text-white dark:text-black transition-all duration-300 hover:-translate-y-0.5 hover:bg-zinc-700 dark:hover:bg-zinc-200"
    >
      Get Started
    </button>
  </nav>
);

export default function HeroSection() {
  return (
    <div className="relative min-h-screen w-full bg-white dark:bg-[#0a0a0a] overflow-hidden">
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

      <div className="relative flex min-h-screen flex-col">
        <Navbar />

        <div className="flex flex-1 flex-col items-center justify-center px-6 py-12">
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="mb-8 flex items-center gap-2"
          >
            <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-zinc-400 dark:text-zinc-500">
              Est. 2026
            </span>
            <span className="h-px w-8 bg-zinc-300 dark:bg-zinc-700" />
            <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-zinc-400 dark:text-zinc-500">
              Arclino
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
              className="text-zinc-900 dark:text-white text-4xl md:text-7xl font-black tracking-tight leading-none text-center"
            >
              Realtime Collaborative
            </motion.h1>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                delay: 0.32,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="text-zinc-900 dark:text-white text-4xl md:text-7xl font-black tracking-tight leading-none text-center"
            >
              Workspace,
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                delay: 0.44,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="mt-2"
            >
              <Timeline
                rotation={-1.2}
                initialLeft={10}
                minWidth={56}
                containerClassName="bg-white dark:bg-[#0a0a0a]"
                handleClassName="bg-white dark:bg-[#0a0a0a] border-yellow-400"
                handleIndicatorClassName="bg-yellow-400"
              >
                <TimelineText className="text-yellow-500 dark:text-yellow-400 text-4xl md:text-7xl font-black tracking-tight py-3">
                  for teams that ship
                </TimelineText>
              </Timeline>
            </motion.div>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }}
            className="mt-12 max-w-md text-center text-base leading-relaxed text-zinc-500 dark:text-zinc-500"
          >
            Crafting digital experiences that live at the intersection of
            motion, precision, and uncompromising visual intent.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7, ease: "easeOut" }}
            className="mt-10 flex items-center gap-4"
          >
            <OrbButton>Create a Workspace</OrbButton>
            <OrbButton>Join Board</OrbButton>
          </motion.div>

          <div
            className="relative mt-10 flex items-end justify-center"
            style={{ height: 380, width: "100%" }}
          >
            {CARDS.map((card, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 60 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.65,
                  delay: card.delay,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="absolute bottom-0 origin-bottom"
                style={{
                  rotate: card.rotate,
                  zIndex: card.z,
                  translateX: `${(i - 2) * 120}px`,
                }}
              >
                <Card className="w-48 h-72 md:w-56 md:h-80 p-0 overflow-hidden shadow-xl ring-2 ring-white/60 dark:ring-zinc-700/60 border-0 rounded-2xl">
                  <CardContent className="p-0 w-full h-full">
                    <img
                      src={card.src}
                      alt={card.alt}
                      className="w-full h-full object-cover"
                    />
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <div className="pointer-events-none absolute bottom-0 left-0 h-px w-full bg-linear-to-r from-transparent via-zinc-300/60 dark:via-zinc-700/40 to-transparent" />
    </div>
  );
}
