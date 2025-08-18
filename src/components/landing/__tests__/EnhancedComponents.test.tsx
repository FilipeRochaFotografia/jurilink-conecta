import React from 'react';
import { render, screen } from '@testing-library/react';
import { MessageSquare } from 'lucide-react';
import { EnhancedCard, AnimatedSection, SectionContainer } from '../index';

// Mock framer-motion to avoid animation issues in tests
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: React.ComponentProps<'div'>) => <div {...props}>{children}</div>,
    section: ({ children, ...props }: React.ComponentProps<'section'>) => <section {...props}>{children}</section>,
  },
}));

describe('Enhanced Components', () => {
  describe('EnhancedCard', () => {
    it('renders children correctly', () => {
      render(
        <EnhancedCard>
          <h3>Test Card</h3>
          <p>Test content</p>
        </EnhancedCard>
      );
      
      expect(screen.getByText('Test Card')).toBeInTheDocument();
      expect(screen.getByText('Test content')).toBeInTheDocument();
    });

    it('renders with icon when provided', () => {
      render(
        <EnhancedCard icon={<MessageSquare data-testid="card-icon" />}>
          <h3>Card with Icon</h3>
        </EnhancedCard>
      );
      
      expect(screen.getByTestId('card-icon')).toBeInTheDocument();
      expect(screen.getByText('Card with Icon')).toBeInTheDocument();
    });

    it('applies custom className', () => {
      const { container } = render(
        <EnhancedCard className="custom-class">
          <p>Test</p>
        </EnhancedCard>
      );
      
      expect(container.firstChild).toHaveClass('custom-class');
    });
  });

  describe('AnimatedSection', () => {
    it('renders children correctly', () => {
      render(
        <AnimatedSection>
          <div>Animated content</div>
        </AnimatedSection>
      );
      
      expect(screen.getByText('Animated content')).toBeInTheDocument();
    });

    it('applies custom className', () => {
      const { container } = render(
        <AnimatedSection className="animated-class">
          <div>Test</div>
        </AnimatedSection>
      );
      
      expect(container.firstChild).toHaveClass('animated-class');
    });
  });

  describe('SectionContainer', () => {
    it('renders children correctly', () => {
      render(
        <SectionContainer>
          <h2>Section Title</h2>
          <p>Section content</p>
        </SectionContainer>
      );
      
      expect(screen.getByText('Section Title')).toBeInTheDocument();
      expect(screen.getByText('Section content')).toBeInTheDocument();
    });

    it('applies secondary background when specified', () => {
      const { container } = render(
        <SectionContainer background="secondary">
          <div>Test</div>
        </SectionContainer>
      );
      
      expect(container.firstChild).toHaveClass('bg-secondary');
    });

    it('applies white background by default', () => {
      const { container } = render(
        <SectionContainer>
          <div>Test</div>
        </SectionContainer>
      );
      
      expect(container.firstChild).toHaveClass('bg-white');
    });

    it('sets id when provided', () => {
      render(
        <SectionContainer id="test-section">
          <div>Test</div>
        </SectionContainer>
      );
      
      expect(screen.getByRole('region')).toHaveAttribute('id', 'test-section');
    });
  });
});