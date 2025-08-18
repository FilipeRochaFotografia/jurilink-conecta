import React from "react";
import { motion } from "framer-motion";
import clsx from "clsx";

interface StepCardProps {
  step: number;
  emoji: string;
  title: string;
  description: string;
  chipLabel?: string;
  className?: string;
}

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

const StepCard: React.FC<StepCardProps> = ({ step, emoji, title, description, chipLabel, className }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, ease }}
      className={clsx(
        "relative group border border-primary/20 hover:border-primary/40 transition-all duration-300 rounded-xl bg-white p-5",
        className
      )}
    >
      <div className="absolute top-4 right-4 text-xs font-bold text-primary/60 bg-primary/10 px-2 py-1 rounded-full">
        {step}
      </div>
      <div className="flex items-start gap-3">
        <div aria-hidden className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-xl select-none">
          {emoji}
        </div>
        <div className="space-y-2">
          <h3 className="text-lg md:text-xl font-bold">{title}</h3>
          <p className="text-sm md:text-base text-muted-foreground">{description}</p>
          {chipLabel && (
            <div className="text-xs text-primary font-medium bg-primary/5 px-3 py-1 rounded-full inline-block">
              {chipLabel}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default React.memo(StepCard);
