"use client";

import { BackgroundPaths } from "@/components/external/background-paths";
import { motion } from "framer-motion";
import { StripeButton } from "@/components/external/stripe-button";

export default function CTA() {
  return (
    <BackgroundPaths className="flex items-center justify-center w-full flex-col px-4 min-h-[80vh]">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        className="flex flex-col items-center"
      >
        <h2 className="relative z-20 bg-linear-to-b from-foreground to-muted-foreground bg-clip-text py-2 text-center font-sans text-4xl font-black tracking-tight text-transparent md:py-10 md:text-6xl lg:text-8xl leading-[1.1]">
          Start the board,
          <br />
          keep the system visible.
        </h2>
        
        <p className="mx-auto max-w-2xl text-center text-lg text-muted-foreground md:text-xl leading-relaxed mt-4">
          Arclino gives your team one realtime workspace for mapping services, plans, handoffs, and decisions without losing control of the flow.
        </p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="mt-12 flex flex-col items-center gap-6 sm:flex-row"
        >
          <StripeButton size="lg">
            <span className="flex items-center gap-2">
              Create a workspace
            </span>
          </StripeButton>
        </motion.div>
      </motion.div>
    </BackgroundPaths>
  );
}
