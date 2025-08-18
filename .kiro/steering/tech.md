# Technology Stack

## Build System & Tooling
- **Build Tool**: Vite 5.4+ with React SWC plugin for fast compilation
- **Package Manager**: npm (package-lock.json present)
- **TypeScript**: 5.8+ with project references configuration
- **Linting**: ESLint 9+ with TypeScript and React plugins

## Core Framework & Libraries
- **Frontend**: React 18.3+ with TypeScript
- **Routing**: React Router DOM 6.30+
- **State Management**: TanStack Query 5.83+ for server state
- **Forms**: React Hook Form 7.61+ with Hookform Resolvers
- **Validation**: Zod 3.25+ for schema validation

## UI & Styling
- **Component Library**: shadcn/ui with Radix UI primitives
- **Styling**: Tailwind CSS 3.4+ with custom design tokens
- **Icons**: Lucide React 0.462+
- **Animations**: Framer Motion 11.18+ and Tailwind Animate
- **Theming**: next-themes for dark/light mode support

## Development Configuration
- **Path Aliases**: `@/*` maps to `./src/*`
- **TypeScript**: Relaxed settings (noImplicitAny: false, strictNullChecks: false)
- **Dev Server**: Runs on port 8080 with IPv6 support
- **Component Tagging**: Lovable-tagger for development mode

## Common Commands

### Development
```bash
npm run dev          # Start development server on port 8080
npm run build        # Production build
npm run build:dev    # Development build
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

### Installation
```bash
npm i                # Install dependencies
```

## Key Dependencies
- **UI Components**: Full Radix UI suite for accessible components
- **Utilities**: clsx, tailwind-merge for conditional styling
- **Date Handling**: date-fns for date manipulation
- **Carousel**: Embla Carousel React
- **Notifications**: Sonner for toast notifications