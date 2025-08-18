import { useEffect, useState } from "react";

interface UseCountUpInViewOptions {
  target: number;
  duration?: number; // ms
  format?: (value: number) => string;
}

export default function useCountUpInView(
  ref: React.RefObject<HTMLElement>,
  { target, duration = 1200, format }: UseCountUpInViewOptions
) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    let start: number | null = null;
    let raf = 0;

    const animate = (ts: number) => {
      if (start === null) start = ts;
      const progress = Math.min(1, (ts - start) / duration);
      const newValue = Math.round(progress * target);
      setValue(newValue);

      if (progress < 1) raf = requestAnimationFrame(animate);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          raf = requestAnimationFrame(animate);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    const element = ref.current;
    if (element) observer.observe(element);

    return () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
    };
  }, [ref, target, duration]);

  return format ? format(value) : value;
}
