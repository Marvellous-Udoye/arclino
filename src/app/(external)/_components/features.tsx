"use client";

import { motion } from "framer-motion";
import {
  Check,
  ShieldCheck,
  Zap,
  BarChart3,
  Cloud,
  Layout,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const features = [
  {
    title: "Realtime board state",
    desc: "Nodes, edges, chat, presence, and movement stay in sync across collaborators without losing structure.",
    icon: Cloud,
  },
  {
    title: "Activity that explains change",
    desc: "Every board mutation is persisted so teams can see what changed, who changed it, and why the flow evolved.",
    icon: BarChart3,
  },
  {
    title: "Workspace-level access control",
    desc: "Owner, editor, and viewer roles keep access explicit across boards, invites, messages, and shared visibility.",
    icon: ShieldCheck,
  },
  {
    title: "Live collaboration without chaos",
    desc: "Presence, locks, and throttled movement stop boards from becoming a collision point during active sessions.",
    icon: Zap,
  },
  {
    title: "Structured canvas building blocks",
    desc: "Steps, decisions, notes, inputs, systems, and databases give teams a shared modeling language from the start.",
    icon: Layout,
  },
  {
    title: "Invite-based sharing",
    desc: "Share boards through controlled invite links so collaborators join the workspace with the right role, not guesswork.",
    icon: Check,
  },
];

export default function Features() {
  return (
    <section className="py-24 bg-background">
      <div className="container px-4 mx-auto">
        <div className="flex flex-col lg:flex-row gap-16 items-start">
          {/* Sticky Sidebar */}
          <div className="lg:w-1/3 lg:sticky lg:top-24">
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="text-primary font-black uppercase tracking-[0.2em] text-[10px] mb-4 block"
            >
              Why teams switch
            </motion.span>
            <h2 className="text-4xl md:text-5xl font-black mb-6 tracking-tight leading-none">
              Built for the board <br />{" "}
              <span className="text-primary underline decoration-primary/20 underline-offset-8">
                behind the product.
              </span>
            </h2>
            <p className="text-muted-foreground text-sm max-w-sm leading-relaxed mb-10">
              Arclino is for teams that need a collaborative map of how work actually moves, not just another blank diagram canvas.
            </p>
            <Button className="px-6 py-6 bg-foreground text-background font-black rounded-xl hover:bg-foreground/90 transition-all text-[10px] uppercase tracking-widest shadow-xl h-12">
              Explore the workspace
            </Button>
          </div>

          {/* Features Grid */}
          <div className="lg:w-2/3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {features.map((feature, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Card className="p-8 rounded-3xl bg-muted/20 border border-border/40 hover:bg-muted/40 transition-all group h-full shadow-sm">
                    <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:text-white transition-all duration-500">
                      <feature.icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg font-black mb-3 tracking-tight text-foreground">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {feature.desc}
                    </p>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
