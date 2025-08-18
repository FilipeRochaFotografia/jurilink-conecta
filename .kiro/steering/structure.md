# Project Structure

## Root Directory Organization
```
├── api/                    # API-related files (Airtable integration)
├── docs/                   # Project documentation
├── public/                 # Static assets (images, favicon, robots.txt)
├── src/                    # Source code
└── [config files]          # Build and tooling configuration
```

## Source Code Structure (`src/`)
```
src/
├── components/
│   ├── ui/                 # shadcn/ui components (Button, Dialog, etc.)
│   └── landing/            # Landing page specific components
├── hooks/                  # Custom React hooks
│   ├── use-mobile.tsx      # Mobile detection hook
│   └── use-toast.ts        # Toast notification hook
├── lib/
│   └── utils.ts            # Utility functions (cn, etc.)
├── pages/                  # Route components
│   ├── Index.tsx           # Home page
│   └── NotFound.tsx        # 404 page
├── App.tsx                 # Main app component with providers
├── main.tsx                # Application entry point
└── index.css               # Global styles and CSS variables
```

## Component Organization Patterns

### UI Components (`src/components/ui/`)
- Use shadcn/ui components from `@/components/ui`
- Follow Radix UI patterns for accessibility
- Components are pre-configured with Tailwind styling

### Custom Components (`src/components/`)
- Organize by feature or page (e.g., `landing/`)
- Use TypeScript interfaces for props
- Follow React functional component patterns

### Pages (`src/pages/`)
- Each route has its own component file
- Use PascalCase naming (Index.tsx, NotFound.tsx)
- Import and configure in App.tsx routing

## Import Conventions
- Use path aliases: `@/` for `src/`
- Absolute imports preferred over relative for cross-directory imports
- UI components: `import { Button } from "@/components/ui/button"`
- Utils: `import { cn } from "@/lib/utils"`
- Hooks: `import { useMobile } from "@/hooks/use-mobile"`

## File Naming
- **Components**: PascalCase (Button.tsx, UserProfile.tsx)
- **Pages**: PascalCase (Index.tsx, About.tsx)
- **Hooks**: kebab-case with use- prefix (use-mobile.tsx)
- **Utils**: kebab-case (utils.ts, api-client.ts)
- **Types**: kebab-case (user-types.ts)

## Configuration Files
- `components.json`: shadcn/ui configuration
- `tailwind.config.ts`: Tailwind CSS configuration with custom theme
- `vite.config.ts`: Vite build configuration
- `tsconfig.json`: TypeScript project references setup
- `eslint.config.js`: ESLint configuration with React rules