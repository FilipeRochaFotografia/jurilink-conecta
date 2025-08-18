import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface EnhancedCardProps {
  children: React.ReactNode;
  className?: string;
  hoverable?: boolean;
  icon?: React.ReactNode;
}

const ease = [0.22, 1, 0.36, 1] as const;

const EnhancedCard = React.forwardRef<HTMLDivElement, EnhancedCardProps>(
  ({ children, className, hoverable = true, icon, ...props }, ref) => {
    return (
      <motion.div
        ref={ref}
        className={cn(
          "rounded-xl border bg-background p-6 shadow-sm",
          "transition-all duration-200",
          className
        )}
        whileHover={hoverable ? { y: -2 } : undefined}
        transition={{ duration: 0.2, ease }}
        {...props}
      >
        {icon && (
          <div className="mb-3 flex h-6 w-6 items-center justify-center text-primary">
            {icon}
          </div>
        )}
        {children}
      </motion.div>
    );
  }
);

EnhancedCard.displayName = "EnhancedCard";

export { EnhancedCard };