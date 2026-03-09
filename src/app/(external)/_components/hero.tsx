"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Timeline, TimelineText } from "../../../components/external/timeline";
import PixelBackground from "../../../components/external/pixel-background";
import { Card, CardContent } from "@/components/ui/card";

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

export default function HeroSection() {
  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-background" id="top">
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
        <div className="flex flex-1 flex-col items-center justify-center px-6 pb-12 pt-28 md:pt-32">
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="mb-8 flex items-center gap-2 rounded-full border border-border bg-card/70 px-4 py-2 backdrop-blur"
          >
            <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-muted-foreground">
              Est. 2026
            </span>
            <span className="h-px w-8 bg-border" />
            <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-muted-foreground">
              Shared board intelligence
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
              className="text-4xl md:text-7xl font-black tracking-tight leading-none text-center text-foreground"
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
              className="text-4xl md:text-7xl font-black tracking-tight leading-none text-center text-foreground"
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
                containerClassName="bg-background border-primary"
                handleClassName="bg-background border-primary"
                handleIndicatorClassName="bg-primary"
              >
                <TimelineText className="text-4xl md:text-7xl font-black tracking-tight py-3 text-primary">
                  for teams that ship
                </TimelineText>
              </Timeline>
            </motion.div>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }}
            className="mt-12 max-w-lg text-center text-base leading-relaxed text-muted-foreground"
          >
            Secure, realtime workspace infrastructure for teams that need shared board state, clear permissions, and fast collaboration.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6, ease: "easeOut" }}
            className="mt-8 flex flex-col items-center gap-3 sm:flex-row"
          >
            <Link
              href="/signup"
              className="rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-transform duration-300 hover:-translate-y-0.5"
            >
              Join a board
            </Link>
            <Link
              href="/solutions"
              className="rounded-xl border border-border bg-card/60 px-5 py-3 text-sm font-semibold text-foreground backdrop-blur transition-colors hover:bg-card"
            >
              Explore solutions
            </Link>
          </motion.div>

          <div
            className="relative my-10 flex items-end justify-center"
            style={{ height: 320, width: "100%" }}
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
                className="absolute bottom-0 origin-bottom rounded-t-2xl"
                style={{
                  rotate: card.rotate,
                  zIndex: card.z,
                  translateX: `${(i - 2) * 76}px`,
                }}
              >
                <Card className="h-52 w-32 overflow-hidden rounded-2xl border border-border bg-card p-0 shadow-xl ring-1 ring-border sm:h-64 sm:w-40 md:h-80 md:w-56">
                  <CardContent className="p-0 w-full h-full rounded-t-2xl">
                    <Image
                      src={card.src}
                      alt={card.alt}
                      fill
                      sizes="(max-width: 640px) 8rem, (max-width: 768px) 10rem, 14rem rounded-t-2xl"
                      className="object-cover"
                    />
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <div className="pointer-events-none absolute bottom-0 left-0 h-px w-full bg-linear-to-r from-transparent via-border to-transparent" />
    </section>
  );
}
