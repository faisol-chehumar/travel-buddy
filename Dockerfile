# Use an official Node.js image
FROM node:20-alpine

# Install pnpm
RUN npm install -g pnpm

# Set working directory
WORKDIR /.

# Copy package files
COPY package.json pnpm-lock.yaml ./

# Install dependencies
RUN pnpm install --frozen-lockfile --prod

# Copy the rest of the application
COPY . .

# Optional: Build step
RUN pnpm run build

# Optional: Set non-root user
USER node

# Default command
CMD ["pnpm", "start:prod"]