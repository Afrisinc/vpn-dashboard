# Code Quality & Validation

## Pre-Commit Hooks

Automatically runs on every commit:

- Format & lint staged files
- Type checking
- Build validation

### Installation

```bash
pnpm install
pnpm prepare
```

## Manual Validation Commands

Run anytime before committing:

### Format Code

```bash
pnpm format
```

### Lint Only

```bash
pnpm lint
```

### Type Check

```bash
pnpm type-check
```

### Build

```bash
pnpm build
```

### Quick Check (lint + type + build)

```bash
pnpm check
```

### Full Validation (format + lint + type + build)

**macOS/Linux:**

```bash
pnpm validate
# or
sh scripts/validate.sh
```

**Windows:**

```bash
pnpm validate
# or
scripts\validate.bat
```

## CI/CD Pipeline

GitHub Actions automatically runs all checks on pull requests to `main` and `develop` branches.

## Lint Configuration

- **ESLint**: `eslint.config.js`
- **Prettier**: `.prettierignore`
- **Ignore patterns**: dist, dist-server, node_modules, build, .husky, coverage

## Staged Files Only

To format and lint only staged files:

```bash
pnpm exec lint-staged
```
