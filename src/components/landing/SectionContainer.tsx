import * as React from "react";
import { cn } from "@/lib/utils";

interface SectionContainerProps {
  id?: string;
  className?: string;
  background?: 'white' | 'secondary';
  children: React.ReactNode;
}

const SectionContainer: React.FC<SectionContainerProps> = ({
  id,
  className,
  background = 'white',
  children
}) => {
  const backgroundClass = background === 'secondary' ? 'bg-secondary' : 'bg-white';
  
  return (
    <section
      id={id}
      className={cn(
        "py-16 md:py-20",
        backgroundClass,
        className
      )}
    >
      <div className="container mx-auto">
        {children}
      </div>
    </section>
  );
};

export { SectionContainer };