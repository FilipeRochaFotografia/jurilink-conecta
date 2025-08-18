import * as React from "react";
import { motion } from "framer-motion";

interface AnimatedSectionProps {
  children: React.ReactNode;
  delay?: number;
  direction?: 'up' | 'left' | 'right';
  className?: string;
}

const ease = [0.22, 1, 0.36, 1] as const;

const AnimatedSection: React.FC<AnimatedSectionProps> = ({
  children,
  delay = 0,
  direction = 'up',
  className
}) => {
  const getInitialPosition = () => {
    switch (direction) {
      case 'left':
        return { opacity: 0, x: -20 };
      case 'right':
        return { opacity: 0, x: 20 };
      case 'up':
      default:
        return { opacity: 0, y: 12 };
    }
  };

  const getAnimatePosition = () => {
    switch (direction) {
      case 'left':
      case 'right':
        return { opacity: 1, x: 0 };
      case 'up':
      default:
        return { opacity: 1, y: 0 };
    }
  };

  return (
    <motion.div
      className={className}
      initial={getInitialPosition()}
      whileInView={getAnimatePosition()}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, ease, delay }}
    >
      {children}
    </motion.div>
  );
};

export { AnimatedSection };