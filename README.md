# Lucas Charoing Boilerplate

A modern, full-stack web development boilerplate built with Next.js 15, React 19, TypeScript, Tailwind CSS, and more.

## Features

- **Next.js 15+** - The React framework with App Router
- **React 19** - The latest version of React
- **TypeScript** - Type safety for your JavaScript
- **Tailwind CSS 4** - Utility-first CSS framework
- **NextAuth v5** - Authentication with email/password and OAuth providers
- **Prisma 6** - Type-safe ORM for PostgreSQL
- **ZenStack** - Schema-based backend development with access control
- **React Query v5** - Data fetching and state management
- **React Hook Form** - Form validation with Zod
- **Next Themes** - Dark mode support with system preference detection
- **ESLint** - Linting with perfectionist plugin
- **Husky & lint-staged** - Git hooks for code quality
- **PostgreSQL** - Database with Docker setup script

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or newer)
- [PNPM](https://pnpm.io/) (v9 or newer)
- [Docker](https://www.docker.com/) or [Podman](https://podman.io/) for database

### Installation

1. Clone the repository:
   ```bash
   git clone git@github.com:lucaschrng/boilerplate.git my-project
   cd my-project
   ```

2. Install dependencies:
   ```bash
   pnpm install
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env
   ```
   Edit the `.env` file with your configuration.

4. Start the database:
   ```bash
   ./start-database.sh
   ```

5. Sync your database and generate code:
   ```bash
   pnpm db:sync
   ```

6. Start the development server:
   ```bash
   pnpm dev
   ```

7. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
├── prisma/               # Prisma schema and migrations
├── public/               # Static assets
├── src/
│   ├── app/              # Next.js App Router
│   │   ├── (auth)/       # Authentication routes
│   │   ├── (dashboard)/  # Dashboard routes
│   │   └── api/          # API routes
│   ├── components/       # React components
│   │   └── ui/           # UI components
│   ├── lib/              # Utility functions
│   │   └── hooks/        # Generated ZenStack hooks
│   ├── server/           # Server-side code
│   └── styles/           # Global styles
├── schema.zmodel         # ZenStack schema
└── start-database.sh     # Database setup script
```

## Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm preview` - Build and start production server
- `pnpm db:sync` - Generate ZenStack code and sync database schema
- `pnpm db:generate` - Generate Prisma client
- `pnpm db:push` - Push schema to database
- `pnpm db:migrate` - Run migrations
- `pnpm db:studio` - Open Prisma Studio

## Technologies

### Frontend
- **Next.js** - React framework
- **React** - UI library
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS
- **next-themes** - Dark mode support
- **React Hook Form** - Form handling
- **Zod** - Schema validation
- **Sonner** - Toast notifications
- **Lucide React** - Icon library
- **Radix UI** - Accessible UI components

### Backend
- **Next.js API Routes** - API endpoints
- **NextAuth.js** - Authentication
- **Prisma** - Database ORM
- **ZenStack** - Access control and API generation
- **PostgreSQL** - Database

### Development Tools
- **ESLint** - Linting
- **TypeScript** - Type checking
- **Husky** - Git hooks
- **lint-staged** - Run linters on staged files

## License

MIT

