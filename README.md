## Running MongoDB with Docker

For local development, you can start a MongoDB instance using Docker:

```bash
docker run -d --name your_mongoDB -p 27017:27017 -e MONGO_INITDB_DATABASE=your_mongoDB mongo:latest
```

This will run MongoDB on port 27017 with a database named `your_mongoDB`.

## Example .env Files

### API (.env)

```env
NODE_ENV=development
PORT=3000
MONGODB_URI=mongodb://localhost:27017/your_mongoDB
JWT_SECRET=your_jwt_secret
JWT_REFRESH_SECRET=your_jwt_refresh_secret
JWT_EXPIRES_IN=15m
JWT_REFRESH_EXPIRES_IN=7d
CORS_ORIGIN=http://localhost:5173
```

### Web (.env)

```env
VITE_MORALIS_API_KEY=your_moralis_api_key
VITE_MORALIS_BASE_URL=https://deep-index.moralis.io/api/v2.2
```

# CryptoPortal

A platform for NFT portfolio dashboards and authentication API, built with React, TypeScript, Vite, Tailwind CSS, and Express. Modular monorepo with shared packages and infinite scroll for NFT collections.

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
├── apps/
│   ├── web/         # Main React app (Vite)
│   └── api/         # Node.js/Express API (auth, JWT, MongoDB)
├── packages/lib/    # Shared UI, hooks, and domain logic
├── package.json     # Workspace root
└── tsconfig.base.json
```

## Getting Started

```bash
# Install dependencies (root)
npm install

# Start the web app (React)
npm run dev

# Start the API (Express)
npm run dev:api

# Build web for production
npm run build

# Build API for production
npm run build --workspace=api
```

## Adding New Packages

1. Create a folder in `packages/your-package/`
2. Add a `package.json` with name `@cryptoportal/your-package`
3. Export from `packages/your-package/index.ts`
4. Import: `import { something } from '@cryptoportal/your-package'`

## Scripts

- `npm run dev` – Start web app (Vite)
- `npm run dev:api` – Start API (Express, ts-node-dev)
- `npm run build` – Build web app
- `npm run build --workspace=api` – Build API

## Tech Stack

- React 19, Vite, Tailwind CSS
- Express, Node.js, TypeScript
- MongoDB (Docker recommended)
- JWT Auth
- npm workspaces
- Moralis API

## Contributing

- Use [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/#examples)
- PRs and issues welcome!

## API Notes

- API runs on port 3000 by default
- MongoDB connection string in `apps/api/.env`
- Example endpoints: `/api/auth/register`, `/api/auth/login`, `/api/auth/refresh`, `/api/auth/me`

---

## License

MIT
