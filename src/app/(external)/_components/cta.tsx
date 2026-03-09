"use client";

import { BackgroundPaths } from "@/components/external/background-paths";
import { motion } from "framer-motion";
import { StripeButton } from "@/components/external/stripe-button";

export default function CTA() {
  return (
    <BackgroundPaths className="flex items-center justify-center w-full flex-col px-4">
      <h2 className="bg-clip-text text-transparent text-center bg-linear-to-b from-neutral-900 to-neutral-700 dark:from-neutral-600 dark:to-white text-2xl md:text-4xl lg:text-7xl font-sans py-2 md:py-10 relative z-20 font-bold tracking-tight">
        Astra Intelligence, <br /> Neuron Systems.
      </h2>
      <p className="max-w-xl mx-auto text-sm md:text-lg text-neutral-700 dark:text-neutral-400 text-center">
        Innovate, automate, and elevate your vision with next-generation
        solutions for a smarter tomorrow.
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
            Create a Workspace
          </span>
        </StripeButton>
      </motion.div>
    </BackgroundPaths>
  );
}
