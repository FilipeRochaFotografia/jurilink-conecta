import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { EnhancedCard } from "./EnhancedCard";
import { AnimatedSection } from "./AnimatedSection";
import { SectionContainer } from "./SectionContainer";

const ease = [0.22, 1, 0.36, 1] as const;

export function TestimonialSection() {
  return (
    <SectionContainer id="depoimentos" background="secondary">
      <AnimatedSection>
        <h2 className="text-3xl md:text-4xl font-bold text-center">
          O que nossos clientes dizem
        </h2>
        <p className="mt-4 text-lg text-muted-foreground text-center max-w-2xl mx-auto">
          Depoimento real de quem já transformou seu atendimento
        </p>
      </AnimatedSection>

      <AnimatedSection delay={0.2} className="mt-12">
        <motion.div
          className="mx-auto max-w-4xl"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease }}
        >
          <EnhancedCard className="relative overflow-hidden bg-gradient-to-br from-background to-background/80 border-primary/20 shadow-lg p-6 md:p-8">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5">
              <div className="absolute top-4 left-4 text-4xl text-primary font-serif">"</div>
              <div className="absolute bottom-4 right-4 text-4xl text-primary font-serif rotate-180">"</div>
            </div>

            {/* Quote Content */}
            <div className="relative z-10">
              {/* Stars Rating */}
              <div className="flex justify-center mb-4">
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: 0.4 + i * 0.1 }}
                    >
                      <span className="text-yellow-400 text-lg">★</span>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Quote Text */}
              <blockquote className="text-center">
                <p className="text-lg font-medium leading-relaxed text-foreground">
                  "Achei que ia perder o toque pessoal. Mas agora tenho{" "}
                  <span className="text-primary font-semibold">MAIS tempo</span>{" "}
                  para dar atenção real aos clientes nas consultas."
                </p>
              </blockquote>

              {/* Author Section */}
              <div className="mt-6 flex items-center justify-center gap-3">
                {/* Avatar Placeholder */}
                <motion.div
                  className="relative"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                >
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/20 to-primary/10 border-2 border-primary/20 flex items-center justify-center">
                    <span className="text-xl font-bold text-primary">JC</span>
                  </div>
                  {/* Verification Badge */}
                  <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-background flex items-center justify-center">
                    <CheckCircle2 className="w-3 h-3 text-white" />
                  </div>
                </motion.div>

                {/* Author Info */}
                <motion.div
                  className="text-left"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.7 }}
                >
                  <div className="font-semibold text-foreground">Dr. João Coelho</div>
                  <div className="text-xs text-muted-foreground">Vaz & Coelho Advogados</div>
                  <div className="text-xs text-primary font-medium mt-1">✓ Cliente verificado</div>
                </motion.div>
              </div>
            </div>
          </EnhancedCard>
        </motion.div>
      </AnimatedSection>
    </SectionContainer>
  );
}