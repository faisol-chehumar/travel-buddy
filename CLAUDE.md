# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Travel Buddy is a NestJS application built with TypeScript. The project is in its initial setup phase with a basic NestJS structure.

## Development Commands

### Installation

```bash
pnpm install
```

### Running the Application

```bash
# Development mode
pnpm run start

# Watch mode with auto-reload
pnpm run start:dev

# Debug mode
pnpm run start:debug

# Production mode
pnpm run start:prod
```

### Testing

```bash
# Run all unit tests
pnpm run test

# Run tests in watch mode
pnpm run test:watch

# Run tests with coverage
pnpm run test:cov

# Debug tests
pnpm run test:debug

# Run end-to-end tests
pnpm run test:e2e
```

### Code Quality

```bash
# Lint the codebase
pnpm run lint

# Format code with Prettier
pnpm run format
```

### Build

```bash
pnpm run build
```

## Architecture

The application follows the standard NestJS architecture:

- **Modules**: Encapsulate related components (controllers, services)
- **Controllers**: Handle HTTP requests and return responses
- **Services**: Contain business logic and are injected into controllers
- **Providers**: Can be injected as dependencies

The main application is bootstrapped in `src/main.ts`, which creates a NestJS application from the root AppModule and starts listening for requests.

Currently, the application has a basic structure with:
- AppModule as the root module
- AppController with a single route
- AppService providing business logic

## Environment Configuration

The application appears to use environment variables (e.g., PORT in main.ts). When developing, you may need to create a `.env.dev` file with necessary environment variables.