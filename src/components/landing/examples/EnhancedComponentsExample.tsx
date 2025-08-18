import React from 'react';
import { MessageSquare, Bot, FileText } from 'lucide-react';
import { EnhancedCard, AnimatedSection, SectionContainer } from '../index';

/**
 * Example usage of the enhanced UI components
 * This demonstrates how to use the components together for consistent styling
 */
const EnhancedComponentsExample: React.FC = () => {
  return (
    <>
      {/* Example 1: Basic section with animated cards */}
      <SectionContainer id="example-section" background="white">
        <AnimatedSection>
          <h2 className="text-3xl md:text-4xl font-bold mb-8">
            Enhanced Components Example
          </h2>
        </AnimatedSection>
        
        <div className="grid gap-6 md:grid-cols-3">
          <AnimatedSection delay={0}>
            <EnhancedCard icon={<MessageSquare className="h-6 w-6" />}>
              <h3 className="font-semibold mb-2">Step 1</h3>
              <p className="text-sm text-muted-foreground">
                Client sends message directly to your WhatsApp
              </p>
            </EnhancedCard>
          </AnimatedSection>
          
          <AnimatedSection delay={0.1}>
            <EnhancedCard icon={<Bot className="h-6 w-6" />}>
              <h3 className="font-semibold mb-2">Step 2</h3>
              <p className="text-sm text-muted-foreground">
                AI responds in seconds with specialized legal knowledge
              </p>
            </EnhancedCard>
          </AnimatedSection>
          
          <AnimatedSection delay={0.2}>
            <EnhancedCard icon={<FileText className="h-6 w-6" />}>
              <h3 className="font-semibold mb-2">Step 3</h3>
              <p className="text-sm text-muted-foreground">
                You receive a summary prepared for the scheduled consultation
              </p>
            </EnhancedCard>
          </AnimatedSection>
        </div>
      </SectionContainer>

      {/* Example 2: Secondary background section */}
      <SectionContainer background="secondary">
        <AnimatedSection direction="left">
          <h2 className="text-2xl font-semibold mb-6">
            Secondary Background Section
          </h2>
        </AnimatedSection>
        
        <div className="grid gap-6 md:grid-cols-2">
          <AnimatedSection direction="left" delay={0.1}>
            <EnhancedCard>
              <p className="flex items-start gap-2">
                <span>🔐</span>
                <span>End-to-end encrypted data</span>
              </p>
            </EnhancedCard>
          </AnimatedSection>
          
          <AnimatedSection direction="right" delay={0.1}>
            <EnhancedCard>
              <p className="flex items-start gap-2">
                <span>📋</span>
                <span>Full LGPD compliance</span>
              </p>
            </EnhancedCard>
          </AnimatedSection>
        </div>
      </SectionContainer>

      {/* Example 3: Non-hoverable cards */}
      <SectionContainer>
        <AnimatedSection>
          <h2 className="text-2xl font-semibold mb-6">
            Static Cards (No Hover Effects)
          </h2>
        </AnimatedSection>
        
        <div className="max-w-3xl mx-auto">
          <AnimatedSection delay={0.2}>
            <EnhancedCard hoverable={false} className="text-center">
              <blockquote className="text-lg md:text-xl mb-4">
                "I thought I would lose the personal touch. But now I have MORE time 
                to give real attention to clients in consultations."
              </blockquote>
              <footer className="text-sm text-muted-foreground">
                — Dr. João Coelho, Vaz & Coelho Advogados
              </footer>
            </EnhancedCard>
          </AnimatedSection>
        </div>
      </SectionContainer>
    </>
  );
};

export default EnhancedComponentsExample;