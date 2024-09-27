# Build stage
FROM node:20-alpine as build

ENV PNPM_HOME="/pnpm" \
    PATH="$PNPM_HOME:$PATH"

WORKDIR /home/app/api

# Install pnpm
RUN npm install -g pnpm@9.5.0

# Copy package.json and pnpm-lock.yaml first to leverage Docker caching
COPY package.json pnpm-lock.yaml ./

# Install dependencies
RUN pnpm install

# Copy the rest of the application code
COPY . .

# Lint and fail if there are issues
RUN pnpm run lint | grep problem && exit 1 || true

# Generate Prisma client and build app
RUN pnpm exec prisma generate && pnpm run build

# Final stage
FROM node:20-alpine AS final

WORKDIR /home/app/api

# Copy built app and dependencies from build stage
COPY --from=build /home/app/api .

# Expose port
EXPOSE 8888

# Start the app
CMD ["pnpm", "start:prod", "--host", "0.0.0.0"]
