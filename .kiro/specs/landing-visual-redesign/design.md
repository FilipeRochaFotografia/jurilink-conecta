# Design Document

## Overview

Este documento detalha o design para reformulação visual das seções da landing page da IA Jurídica True Rise. O objetivo é criar uma experiência visual consistente, moderna e responsiva que corresponda ao estilo da hero section existente, aplicando princípios de design mobile-first e garantindo uma experiência fluida em todos os dispositivos.

## Architecture

### Design System Foundation

O design será baseado no sistema já estabelecido na hero section:

- **Paleta de Cores**: Utilização das CSS variables já definidas no Tailwind config
- **Tipografia**: Hierarquia consistente com a hero section (text-5xl/6xl para títulos principais, text-lg/xl para subtítulos)
- **Espaçamentos**: Sistema de espaçamento baseado em múltiplos de 4 (py-16, py-20, gap-6, gap-8)
- **Animações**: Framer Motion com easing consistente `[0.22, 1, 0.36, 1]`

### Visual Hierarchy

1. **Seções Principais**: Alternância entre background branco e `bg-secondary`
2. **Cards e Containers**: `rounded-xl`, `border`, `bg-background`, `shadow-sm`
3. **Elementos Interativos**: Hover effects com `whileHover={{ y: -2 }}` ou `whileHover={{ y: -4 }}`
4. **Ícones**: Lucide React com tamanho consistente `h-6 w-6` e cor `text-primary`

## Components and Interfaces

### Enhanced Section Container
```typescript
interface SectionProps {
  id?: string;
  className?: string;
  background?: 'white' | 'secondary';
  children: React.ReactNode;
}
```

### Enhanced Card Component
```typescript
interface EnhancedCardProps {
  children: React.ReactNode;
  className?: string;
  hoverable?: boolean;
  icon?: React.ReactNode;
}
```

### Animation Wrapper
```typescript
interface AnimatedSectionProps {
  children: React.ReactNode;
  delay?: number;
  direction?: 'up' | 'left' | 'right';
}
```

## Data Models

### Section Configuration
```typescript
interface SectionConfig {
  id: string;
  title: string;
  background: 'white' | 'secondary';
  layout: 'grid' | 'centered' | 'testimonial';
  gridCols?: number;
  animation: {
    stagger: boolean;
    delay: number;
  };
}
```

### Card Data Structure
```typescript
interface CardData {
  icon?: string;
  title: string;
  description: string;
  highlight?: boolean;
  action?: {
    type: 'button' | 'link';
    text: string;
    href?: string;
  };
}
```

## Design Specifications

### Problem Section Redesign
- **Background**: `bg-secondary` mantido
- **Layout**: Grid responsivo com cards elevados
- **Visual Elements**: 
  - Ícones de alerta em vermelho suave
  - Contadores animados com destaque visual
  - Cards com hover effect sutil
- **Typography**: Título com `text-3xl md:text-4xl font-bold`
- **Animation**: Staggered entrance com delay incremental

### Solution Section Redesign
- **Background**: Branco para contraste
- **Layout**: Grid 3 colunas com cards interativos
- **Visual Elements**:
  - Ícones coloridos (MessageSquare, Bot, FileText)
  - Cards com shadow mais pronunciada
  - Hover effects com elevação
- **Process Flow**: Setas ou conectores visuais entre cards
- **Animation**: Entrada em sequência simulando o fluxo

### Trust/Testimonial Section Redesign
- **Background**: `bg-secondary` para destaque
- **Layout**: Card centralizado com design premium
- **Visual Elements**:
  - Avatar ou logo do depoente
  - Aspas estilizadas
  - Rating visual (estrelas)
  - Background pattern sutil
- **Typography**: Texto maior e mais destacado
- **Animation**: Fade in com scale effect

### Security Section Redesign
- **Background**: Branco
- **Layout**: Grid 2 colunas com ícones de segurança
- **Visual Elements**:
  - Ícones de segurança em verde
  - Cards com border em cor de destaque
  - Badges de certificação
- **Animation**: Entrada simultânea com bounce effect

### Pricing Section Redesign
- **Background**: `bg-secondary`
- **Layout**: Comparação lado a lado melhorada
- **Visual Elements**:
  - Card de comparação com destaque visual
  - Ícones de check/x mais proeminentes
  - Preços com tipografia destacada
  - Badge "Recomendado" ou similar
- **Animation**: Slide in from sides

### Final CTA Section Redesign
- **Background**: Gradiente sutil ou branco
- **Layout**: Centralizado com elementos de urgência
- **Visual Elements**:
  - Background pattern ou shapes
  - Botão CTA com animação especial
  - Contador de vagas visual
  - Elementos de confiança (selos, garantias)
- **Animation**: Entrada dramática com multiple elements

## Error Handling

### Animation Performance
- Implementar `will-change` CSS property para elementos animados
- Usar `transform3d` para aceleração de hardware
- Lazy loading de animações complexas
- Fallbacks para dispositivos com performance limitada

### Responsive Breakpoints
- Mobile: < 768px
- Tablet: 768px - 1024px  
- Desktop: > 1024px
- Tratamento especial para telas muito pequenas (< 375px)

### Accessibility
- Respeitar `prefers-reduced-motion`
- Manter contraste adequado em todos os elementos
- Focus states visíveis para navegação por teclado
- Alt texts para elementos decorativos

## Testing Strategy

### Visual Regression Testing
- Screenshots automatizados em diferentes breakpoints
- Comparação visual antes/depois da implementação
- Teste de animações em diferentes velocidades

### Performance Testing
- Lighthouse scores para performance
- Medição de FCP, LCP, CLS
- Teste de performance em dispositivos móveis de baixo custo

### Cross-browser Testing
- Chrome, Firefox, Safari, Edge
- Versões mobile dos navegadores
- Teste de fallbacks para navegadores sem suporte a certas features

### User Experience Testing
- Teste de usabilidade em dispositivos móveis
- Verificação de touch targets adequados
- Teste de legibilidade em diferentes tamanhos de tela

## Implementation Phases

### Phase 1: Foundation
- Implementar componentes base (EnhancedCard, AnimatedSection)
- Configurar sistema de animações consistente
- Estabelecer padrões de espaçamento e tipografia

### Phase 2: Section Redesign
- Reformular seções uma por vez
- Implementar animações específicas
- Otimizar para mobile-first

### Phase 3: Polish & Optimization
- Ajustes finos de animações
- Otimização de performance
- Testes finais de acessibilidade

### Phase 4: Quality Assurance
- Testes em diferentes dispositivos
- Validação de design system
- Documentação final