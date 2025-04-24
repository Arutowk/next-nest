This Turborepo includes the following packages/apps:

### Apps and Packages

    .
    ├── apps
    │   ├── XXX-api                       # NestJS app (https://nestjs.com).
    │   └── XXX-web                       # Next.js app (https://nextjs.org).
    └── packages
        ├── @repo/api                 # Shared `NestJS` resources.
        ├── @repo/eslint-config       # `eslint` configurations (includes `prettier`)
        ├── @repo/jest-config         # `jest` configurations
        ├── @repo/typescript-config   # `tsconfig.json`s used throughout the monorepo
        └── @repo/ui                  # Shareable stub React component library.

Each package and application are 100% TypeScript safe.

### Utilities

- [TypeScript](https://www.typescriptlang.org/) for static type-safety
- [ESLint](https://eslint.org/) for code linting
- [Prettier](https://prettier.io) for code formatting
- [Jest](https://prettier.io) & [Playwright](https://playwright.dev/) for testing

### Commands

#### Install

```bash
pnpm install
```

#### Develop

```bash
trubo run XXX-web#dev XXX-api#dev
# or
trubo run dev --filter=XXX-web --filter=XXX-api
```

#### Manage Packages

```bash
pnpm add XXX --filter appname
pnpm remove XXX --filter appname
```

#### Adding a Next.js application to an existing repository

```bash
pnpm dlx create-next-app@latest apps/appname-web
```
