import { useState, MouseEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button, ButtonProps } from "@/components/ui/button";

interface Ripple {
  id: number;
  x: number;
  y: number;
}

export default function CTAButton({ children, className, ...props }: ButtonProps) {
  const [ripple, setRipple] = useState<Ripple | null>(null);
  const [count, setCount] = useState(0);

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    const rect = (e.currentTarget as HTMLButtonElement).getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setRipple({ id: count, x, y });
    setCount((c) => c + 1);
    setTimeout(() => setRipple(null), 500);
    props.onClick?.(e);
  };

  return (
    <Button
      aria-label="Entrar na lista de espera"
      variant="cta"
      className={`relative overflow-hidden ${className ?? ""}`}
      onClick={handleClick}
      {...props}
    >
      {/* Ripple */}
      <AnimatePresence>
        {ripple && (
          <motion.span
            key={ripple.id}
            initial={{ opacity: 0.25, scale: 0 }}
            animate={{ opacity: 0, scale: 4 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            style={{ left: ripple.x, top: ripple.y }}
            className="pointer-events-none absolute -translate-x-1/2 -translate-y-1/2 rounded-full bg-[hsl(var(--primary-foreground)/0.4)]"
          >
            <span className="block h-12 w-12" />
          </motion.span>
        )}
      </AnimatePresence>
      {children}
    </Button>
  );
}
