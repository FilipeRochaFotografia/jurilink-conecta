## Landing Page IA Jurídica True Rise — Implementação e Roadmap

### Visão geral

- Stack: React + Vite + Tailwind + shadcn/ui + framer-motion.
- Fundo do site: branco. Tom consultivo, texto em preto.
- Hero com shapes suaves nas cores da paleta e mockup de celular moderno inclinado.
- Animações sutis (fade/slide/parallax) inspiradas nas referências.

### Paleta de cores

- Hex
  - Verde profundo: `#263530`
  - Verde médio: `#577343`
  - Verde primário: `#688C4F`
  - Areia: `#F2E9CE`
  - Âmbar: `#A67C49`

- HSLA (fonte do cliente)
  - Profundo: `hsl(159, 16%, 17%)`
  - Verde B: `hsl(95, 26%, 35%)`
  - Verde A: `hsl(95, 27%, 42%)`
  - Areia: `hsl(44, 58%, 87%)`
  - Âmbar: `hsl(32, 38%, 46%)`

### Tipografia (Google Fonts)

- Família: Inter (400, 600, 700)
- Tamanhos sugeridos:
  - H1: 44–56 px, tracking -1% a -2%
  - H2: 28–36 px
  - Corpo: 16–18 px, line-height 1.65

### Tokens Tailwind (mapping sugerido)

```css
/* src/index.css (amostra) */
:root {
  --background: 0 0% 100%;
  --foreground: 221 39% 11%;

  --primary: 95 27% 42%;       /* #688C4F */
  --primary-foreground: 0 0% 100%;

  --secondary: 0 0% 98%;
  --secondary-foreground: 221 39% 11%;

  --muted: 0 0% 98%;
  --muted-foreground: 220 9% 46%;

  --accent: 32 38% 46%;        /* #A67C49 */
  --accent-foreground: 0 0% 100%;

  --border: 220 14% 96%;
  --ring: 95 26% 35%;          /* #577343 */
  --card: 0 0% 100%;

  /* Shapes hero */
  --shape-sand: 44 58% 87%;    /* #F2E9CE */
  --shape-deep: 159 16% 17%;   /* #263530 */
}
```

### Componentes e seções

- HeroSection
  - Headline, subheadline, CTAs (primário e secundário)
  - Proof chips: “🔒 Dados protegidos”, “⚡ Ativa em 48h”, “🏆 IA Humanizada”
  - FloatingShapes (cores `--shape-sand`, `--primary`, `--accent` com opacidade 6–10%)
  - PhoneMockTilt (mockup inclinado ~15–20°)

- Seções já existentes (mantidas e polidas)
  - Problema, Solução, Depoimento, Segurança, Preço, CTA final, Footer

- Formulário de lead (Dialog)
  - Campos: Nome, Empresa, Telefone, E‑mail
  - Provider atual: Formspree (`VITE_FORMSPREE_FORM_ID`)
  - Provider futuro: Airtable (endpoint serverless `api/airtable-lead`)

### Botões

- Primário (pill médio): `--primary` com hover em `#577343` (escurecido); texto branco.
- Secundário (outline): borda `#2635301A`, texto preto, hover `bg-black/5`.

### Animações (sutileza)

- Entradas: `fade-up` 24–32 px, 300–450 ms, ease `[0.22, 1, 0.36, 1]`.
- Hover em cards: `translateY(-2px)`, `scale(1.01)`, sombra +2.
- Parallax leve no Hero (6–14 px); tilt 2–3° no mockup ao passar o mouse.
- Respeitar `prefers-reduced-motion`.

### Acessibilidade

- Contrast ratio AA; foco visível; navegação por teclado.
- `aria-live` no chat preservado; `aria-label`/`aria-describedby` nos inputs.

### SEO / OG

- Title/description consistentes.
- OG image limpa (logo + headline); `robots.txt` e sitemap já presentes no projeto.
- JSON‑LD Product já na page; FAQ opcional futuramente.

### Integrações de lead

- Formspree (ativo):
  - `.env` → `VITE_FORMSPREE_FORM_ID=SEU_ID`
  - Envio em `LeadCaptureDialog` via `fetch` para `https://formspree.io/f/<FORM_ID>`

- Airtable (depois):
  - Endpoint: `api/airtable-lead`
  - Variáveis do ambiente do deploy: `AIRTABLE_TOKEN`, `AIRTABLE_BASE_ID`, `AIRTABLE_TABLE_NAME`
  - Chamada: usar prop `useAirtableApi` em `LeadCaptureDialog`

### Roadmap de implementação

1) Tipografia e tokens
   - Importar Inter (400/600/700) no `index.html`.
   - Ajustar tokens para a paleta; manter fundo do site branco.

2) Hero com shapes e mockup inclinado
   - Componente `FloatingShapes` (CSS/SVG) com parallax sutil.
   - `PhoneMockTilt` reaproveitando o chat; tilt e sombra macia.
   - Chip de provas e CTAs posicionados.

3) Botões e microinterações
   - `variant="cta"` com verde `#688C4F`; hover `#577343`.
   - Outline secundário; estados de foco/disabled.

4) Formulário de lead
   - Trocar campos para Nome, Empresa, Telefone, E‑mail.
   - Validações mínimas; máscara simples de telefone; toasts.

5) Refinos visuais das seções existentes
   - Cards com borda `#EAEAEA`, radius 12–14 px, sombra suave.
   - Ajustes de espaçamento e ritmo vertical.

6) SEO e OG
   - Garantir `<title>` e `<meta description>` coerentes.
   - OG image estática.

### Critérios de aceite

- Fundo branco; hero com shapes suaves nas cores da paleta.
- Tipografia iOS‑like (Inter) e texto preto com legibilidade AA.
- CTA verde com hover consistente; animações discretas e fluidas.
- Mockup responsivo, inclinado e sem jitter; parallax leve dos shapes.
- Formulário com Nome, Empresa, Telefone, E‑mail; sucesso/erro com toasts.

### Referências visuais

- Prodmast — Manufacturing Landing Page (animações e sutileza)
  - https://dribbble.com/shots/24788574-Prodmast-Manufacturing-Landing-Page?utm_source=Clipboard_Shot&utm_campaign=dipauix&utm_content=Prodmast%20-%20Manufacturing%20Landing%20Page&utm_medium=Social_Share

- Sleek Landing Page for CoreShift (tipografia, botões e cards)
  - https://dribbble.com/shots/25869450-Sleek-Landing-Page-for-CoreShift


