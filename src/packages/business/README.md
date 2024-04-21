# Business Package

This package, **business**, is a part of the Fruit Storage Task project. It contains the core business logic and domain models.

## Description

A Fruit Storage Task that demonstrates Clean Architecture and Domain Driven Design.

## Scripts

- **start:dev**: Starts the development server using nodemon.
- **start**: Builds the project and runs the built code using Node.js.
- **lint**: Lints TypeScript files using ESLint.
- **lint:staged**: Lints staged files.
- **build**: Builds the project using TypeScript.
- **prepare**: Installs Husky hooks.

## Author

- **Name**: John Glenn Andrade

## License

This package is licensed under the MIT License.

## DevDependencies

- **@types/node**: TypeScript type definitions for Node.js.
- **@typescript-eslint/eslint-plugin**: ESLint plugin for TypeScript.
- **@typescript-eslint/parser**: TypeScript parser for ESLint.
- **eslint**: Linter for JavaScript and TypeScript.
- **eslint-config-airbnb-typescript**: Airbnb's ESLint configuration for TypeScript.
- **eslint-config-prettier**: ESLint configuration for Prettier.
- **eslint-plugin-import**: ESLint plugin for linting import/export syntax.
- **eslint-plugin-jest**: ESLint plugin for Jest.
- **eslint-plugin-prettier**: ESLint plugin for integrating Prettier.
- **husky**: Git hooks made easy.
- **lint-staged**: Run linters on git staged files.
- **nodemon**: Monitor for changes in your source and automatically restarts the server.
- **prettier**: Opinionated code formatter.
- **rimraf**: Cross-platform file deletion utility.
- **ts-node**: TypeScript execution and REPL for Node.js.
- **typescript**: TypeScript language server.

## lint-staged Configuration

Lint-staged is configured to apply Prettier formatting to TypeScript files in the `src` directory.

```json
{
  "src/**/*.ts": "prettier --write"
}