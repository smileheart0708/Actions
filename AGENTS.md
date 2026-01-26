# AGENTS.md

This is a Bun-based GitHub Actions project for sending automated email notifications.

## Build Commands

```bash
# Install dependencies
bun install

# Run the main application
bun run main.ts

# Type check (uses tsc via bun)
bun run tsc --noEmit

# Run a single file
bun run post_email.ts
```

## Test Commands

No tests currently exist. To add tests:
```bash
bun test              # Run all tests
bun test <file>       # Run specific test file
```

## Code Style Guidelines

### TypeScript
- Strict mode enabled in tsconfig.json
- No `any` types - use explicit types or `unknown` with proper narrowing
- Enable `noUncheckedIndexedAccess` for safer object/array access
- Use `as const` for string literal types

### Imports
- Use bare imports for npm packages: `import foo from 'foo'`
- Use relative imports for local files: `import { sendMail } from './post_email'`

### Naming Conventions
- Variables/functions: camelCase (`emailName`, `sendMail`)
- Constants: SCREAMING_SNAKE_CASE (`EMAIL_NAME`, `EMAIL_PASS`)
- Files: kebab-case for non-components (`post_email.ts`)

### Error Handling
- Use try/catch for async operations
- Log errors with `console.error()`
- Exit with `process.exit(1)` for fatal errors

### Environment Variables
- Define required vars as readonly array: `as const`
- Validate presence before use
- Use non-null assertion `!` only after validation

### Project Structure
- Entry point: `main.ts`
- Shared utilities: `post_email.ts`
- GitHub Actions: `.github/workflows/run_bun.yml`
- Environment secrets: `EMAIL_PASS` (secret), `EMAIL_NAME` (variable)

### Running in GitHub Actions
- Workflow: `bun run main.ts` with environment variables from secrets/vars
- Bun setup via `oven-sh/setup-bun@v2`
