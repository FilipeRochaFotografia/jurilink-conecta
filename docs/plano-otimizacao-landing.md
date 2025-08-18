# Plano de otimização — Landing "IA Jurídica True Rise"

Este documento organiza o projeto atual, mapeia as sessões da landing, identifica oportunidades de otimização (conversão, performance, SEO, acessibilidade) e propõe um plano de execução por fases.

## 1) Visão geral do projeto
- Stack: Vite + React 18 + TypeScript + Tailwind CSS + shadcn/ui + Framer Motion
- Roteamento: `react-router-dom` (SPA com `Index` e `NotFound`)
- UI base: componentes em `src/components/ui/*` (shadcn)
- Landing: `src/pages/Index.tsx` centraliza praticamente toda a página; há componentes de apoio em `src/components/landing/*`
- Coleta de leads: função serverless para Airtable em `api/airtable-lead.ts`
- SEO atual: metas em `index.html` + JSON-LD inline no `Index.tsx` (CSR). Não há SSR/SSG/prerender.

## 2) Arquitetura e principais arquivos
- Vite config: `vite.config.ts` (alias `@` -> `src`, porta 8080)
- Tailwind config: `tailwind.config.ts` (tokens, animações personalizadas)
- Entrada: `src/main.tsx`, `src/App.tsx`
- Página: `src/pages/Index.tsx` (Hero, Problema, Solução, Testemunhos, Preços, CTA, Footer)
- Landing components: `AnimatedSection`, `EnhancedCard`, `SectionContainer`, `PhoneMockup`, `LeadCaptureDialog`, `FloatingShapes`, `TestimonialSection`
- API: `api/airtable-lead.ts` (CORS permissivo, validações básicas)

## 3) Mapa das sessões (Index)
1. Hero (logo, título, subtítulo, CTA, mockup de celular, badges)
2. Problema (3 cards com contadores e perdas)
3. Solução (fluxo em 3 passos com animações)
4. Provas/Depoimentos (`TestimonialSection`)
5. Preços (comparativo Tradicional vs IA)
6. CTA Final (escassez, indicadores, CTA principal, razões da limitação)
7. Footer (links placeholder e contato)
8. Dialog de lead (form modal)

## 4) Oportunidades de otimização por sessão
- Hero
  - Lazy-load do `PhoneMockup` e `FloatingShapes`; manter CTA acima da dobra visível rapidamente.
  - Preload de fontes já configurado; considerar `preload` do logo e assets críticos.
  - Ajustar microcopy do subtítulo e CTA para foco em benefício e prova (A/B). 
- Problema
  - Unificar counters em um hook com `ref` em vez de `getElementById`; evitar setState fora de viewport; reduzir custo de animação.
  - Garantir labels acessíveis para números (ex.: `aria-label` com contexto “R$ 15.000 em honorários perdidos”).
- Solução
  - Semântica de passos com `<ol><li>` para leitores de tela; manter visual com Tailwind.
  - `prefers-reduced-motion`: reduzir/pausar animações.
- Depoimentos
  - Lazy-load da seção inteira; adicionar skeleton leve.
  - Incluir prova social real (logos, cargos), se disponível.
- Preços
  - Adicionar CTA por card; destacar garantias/termos (LGPD, cancelamento).
  - `aria-live` ou `aria-label` para valores; clareza de custos e setup.
- CTA Final
  - Escassez dinâmica (se desejado) com limites éticos; hoje valores estáticos.
  - Sticky CTA no mobile (opcional) para elevar conversão.
- Footer
  - Substituir placeholders por páginas reais de Termos/Privacidade; link para WhatsApp com `wa.me`.

## 5) Otimizações globais
- Performance e UX
  - Code splitting: `React.lazy`/`Suspense` para `PhoneMockup`, `FloatingShapes`, `TestimonialSection`, `LeadCaptureDialog` (carregar on-demand).
  - Framer Motion: usar `LazyMotion`/`m` ou import dinâmico para reduzir parse inicial; agrupar animações.
  - Imagens: converter `public/*.png` para `.webp`/`.avif`; definir width/height e `loading="lazy"` quando offscreen.
  - Reduzir re-renders: `React.memo` em componentes puros; memo de ícones/props estáticos; mover constantes para fora do render.
  - Bundle analysis: adicionar `rollup-plugin-visualizer` para identificar peso (framer-motion, lucide, etc.).
  - Mobile-first: garantir LCP < 2.0s em rede 4G simulada.
- SEO
  - Prerender/SSG da rota `/` para crawlers: `vite-plugin-ssg` ou `vite-plugin-prerender`.
  - `react-helmet-async` para metas por página; mover JSON-LD para componente `SEO`.
  - Sitemap (`/sitemap.xml`) e canonical dinâmico (domínio final); metas OG/Twitter finais.
- Acessibilidade
  - Respeitar `prefers-reduced-motion` nas animações.
  - Foco visível nos CTAs; contraste das cores; roles/aria de navegação; `skip link`.
  - Emojis com `aria-hidden` ou `aria-label` conforme o caso.
- Formulário, segurança e LGPD
  - Validação com `zod` + `react-hook-form`; máscara de WhatsApp; checkbox de consentimento com link de Política.
  - Backend: CORS restrito ao domínio final; honeypot/captcha (Cloudflare Turnstile). Rate limiting e logging mínimo.
  - Auditoria de campos Airtable (nomes e tipos); armazenar origem UTM.
- Observabilidade e métricas
  - Analytics (Plausible/GA4): eventos em CTAs, abertura do Dialog, envio do lead e abandono.
  - Sentry (opcional) para erros de front.

## 6) Refatoração e organização do código
- Extrair seções do `Index.tsx` para `src/components/landing/sections/*`:
  - `Hero.tsx`, `Problem.tsx`, `Solution.tsx`, `Pricing.tsx`, `FinalCta.tsx`, `Footer.tsx`
- Hook de contador: `src/hooks/useCountUpInView.ts` com API via `ref` e opções (`target`, `duration`, `format`).
- SEO: `src/components/SEO.tsx` usando `react-helmet-async` e utilitário para JSON-LD.
- Form: `src/components/landing/LeadForm.tsx` (campos, validação, consentimento) usado dentro de `LeadCaptureDialog`.
- Lazy-load: exportar versões `lazy` das seções pesadas e carregar on-intersection.

## 7) Plano de execução por fases
- Fase 1 — Quick wins (2–4h)
  - Lazy-load `PhoneMockup`, `FloatingShapes`, `TestimonialSection` e `LeadCaptureDialog`.
  - Converter imagens críticas para `.webp`; definir `width/height`; `loading="lazy"` quando apropriado.
  - `prefers-reduced-motion` em `AnimatedSection` e animações do fluxo.
  - Eventos de analytics básicos nos CTAs.
- Fase 2 — Refatoração e A11y (0.5–1d)
  - Extrair seções; criar `useCountUpInView`; ajustar semântica com `<section>`/`<ol>`; melhorar aria-labels.
  - `React.memo` em componentes estáticos; revisão de re-renders.
- Fase 3 — SEO/SSG (0.5d)
  - Adicionar `react-helmet-async`; mover JSON-LD; gerar `sitemap.xml` e `robots.txt` consistente; prerender `/`.
- Fase 4 — Formulário e backend (0.5d)
  - Validação com `zod`; consentimento LGPD; CORS restrito; honeypot/Turnstile; UTM.
- Fase 5 — Experimentos (contínuo)
  - Testes A/B de títulos e CTA; ROI mini-calculadora (opcional) na seção de Preços.

## 8) Checklist (marque ao concluir)
- [ ] Lazy-load componentes pesados e seções offscreen
- [ ] Imagens convertidas para `.webp`/`.avif` com dimensões definidas
- [ ] `prefers-reduced-motion` aplicado
- [ ] Hook `useCountUpInView` com `ref`
- [ ] Extração das seções de `Index.tsx`
- [ ] `react-helmet-async` + componente `SEO`
- [ ] Sitemap e prerender `/`
- [ ] Form com `zod`, consentimento LGPD e CORS restrito
- [ ] Eventos de analytics e acompanhamento de conversão

## 9) Metas de qualidade
- Performance (móvel): LCP < 2.0s, CLS ≈ 0, INP < 200ms
- Acessibilidade: Lighthouse/axe >= 95
- SEO: Lighthouse >= 90; snippets ricos com JSON-LD válidos
- Conversão: +15–30% no CTR de CTA principal (baseline necessário)

## 10) Pendências e dúvidas
- Domínio final de produção (para canonical/CORS/analytics)
- Conteúdo e links reais para Termos/Privacidade
- Estrutura do Airtable (campos definitivos) e políticas de retenção
- Preferência por SSG/prerender vs manter CSR puro
- Canais de analytics (GA4 vs Plausible)

---
Próximos passos sugeridos: iniciar Fase 1 (lazy-load + imagens + motion), depois refatorar `Index.tsx` em seções. 
