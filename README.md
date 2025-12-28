# CryptoPortal

A platform for NFT portfolio dashboards, built with React, TypeScript, Vite, and Tailwind CSS. Supports modular architecture, shared packages, and infinite scroll for NFT collections.

## Features

- **Monorepo** with npm workspaces
- **TypeScript** project references
- **React 19** + React Router DOM
- **Vite** for fast development
- **Tailwind CSS** for styling
- **Modular structure** with shared library (`lib`)
- **Infinite scroll** for NFT lists
- **Moralis API** integration (multi-chain ready)

## Project Structure

```
cryptoPortal/
├── apps/web/            # Main React app (Vite)
├── packages/lib/        # Shared UI, hooks, and domain logic
├── package.json         # Workspace root
└── tsconfig.base.json   # Shared TypeScript config
```

## Getting Started

```bash
# Install dependencies
npm install

# Start the development server
npm run dev

# Build for production
npm run build
```

## Adding New Packages

1. Create a folder in `packages/your-package/`
2. Add a `package.json` with name `@cryptoportal/your-package`
3. Export from `packages/your-package/index.ts`
4. Import: `import { something } from '@cryptoportal/your-package'`

## Scripts

- `npm run dev` – Start development server
- `npm run build` – Build for production

## Tech Stack

- React 19
- TypeScript
- React Router DOM
- Vite
- Tailwind CSS
- npm workspaces
- Moralis API

## Contributing

- Use [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/#examples)
- PRs and issues welcome!

## License

MIT
