"use client";

import { BackgroundPaths } from "@/components/external/background-paths";
import { motion } from "framer-motion";
import { StripeButton } from "@/components/external/stripe-button";

export default function CTA() {
  return (
    <BackgroundPaths className="flex items-center justify-center w-full flex-col px-4">
      <h2 className="relative z-20 bg-linear-to-b from-foreground to-muted-foreground bg-clip-text py-2 text-center font-sans text-2xl font-bold tracking-tight text-transparent md:py-10 md:text-4xl lg:text-7xl">
        Start the board,
        <br />
        keep the whole system visible.
      </h2>
      <p className="mx-auto max-w-xl text-center text-sm text-muted-foreground md:text-lg">
        Give your team one realtime workspace for mapping services, plans, handoffs, and decisions without losing control of who can change what.
      </p>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.65 }}
        className="flex itemx-center justify-center mt-6"
      >
        <StripeButton size="lg">
          <span className="flex items-center gap-2">
            Create a workspace
          </span>
        </StripeButton>
      </motion.div>
    </BackgroundPaths>
  );
}
