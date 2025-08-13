import { motion, useTransform, useScroll } from "framer-motion";
import { useEffect } from "react";

type FloatingShapesProps = {
  className?: string;
};

export default function FloatingShapes({ className }: FloatingShapesProps) {
  const { scrollY } = useScroll();
  const ySlow = useTransform(scrollY, [0, 600], [0, 12]);
  const yFast = useTransform(scrollY, [0, 600], [0, 24]);

  // Ensure transforms update on mount
  useEffect(() => {
    const unsub1 = ySlow.onChange(() => {});
    const unsub2 = yFast.onChange(() => {});
    return () => { unsub1(); unsub2(); };
  }, [ySlow, yFast]);

  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className ?? ""}`} aria-hidden>
      {/* Sand blob */}
      <motion.div
        style={{ y: ySlow }}
        className="absolute -left-24 top-10 h-[220px] w-[220px] rounded-[40%] bg-[hsl(var(--shape-sand))] blur-2xl opacity-70"
      />
      {/* Green soft */}
      <motion.div
        style={{ y: yFast }}
        className="absolute right-0 top-[-30px] h-[320px] w-[320px] rounded-[44%] bg-[hsl(var(--primary)/0.08)] blur-2xl"
      />
      {/* Amber chip */}
      <motion.div
        style={{ y: ySlow }}
        className="absolute bottom-[-40px] left-1/3 h-[160px] w-[160px] rounded-[36%] bg-[hsl(var(--accent)/0.08)] blur-2xl"
      />
    </div>
  );
}


