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

The application uses environment variables for configuration. Create a `.env.local` file in the root directory with the following variables:

```bash
# Server Configuration
PORT=3000

# Database Configuration
MONGODB_URI=mongodb://localhost:27017/travel-buddy

# API Keys
ROUTE_XL_USER=your_routexl_username
ROUTE_XL_PASS=your_routexl_password
GOOGLE_API_KEY=your_google_api_key
OPENAI_API_KEY=your_openai_api_key
```

### Required API Keys

The application integrates with the following external services:

1. **Google Places API** - For geocoding and location search
   - Create an API key in the [Google Cloud Console](https://console.cloud.google.com/)
   - Enable the Places API
   - Set as `GOOGLE_API_KEY` in your environment

2. **RouteXL API** - For route optimization
   - Register for an account at [RouteXL](https://www.routexl.com/)
   - Set your username as `ROUTE_XL_USER` and password as `ROUTE_XL_PASS`

3. **OpenAI API** - For generating trip recommendations
   - Get an API key from [OpenAI Platform](https://platform.openai.com/)
   - Set as `OPENAI_API_KEY` in your environment