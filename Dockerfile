# syntax=docker/dockerfile:1

# Accept build arguments


# Stage 1: Install dependencies
FROM node:20-alpine AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Install pnpm
RUN npm install -g pnpm@latest

# Copy package files
COPY package.json pnpm-lock.yaml ./

# Install dependencies
RUN pnpm install --frozen-lockfile

# Stage 2: Build the application
FROM node:20-alpine AS builder
WORKDIR /app

# Install pnpm
RUN npm install -g pnpm@latest

# Copy dependencies from deps stage
COPY --from=deps /app/node_modules ./node_modules
COPY . .

ARG DATABASE_URL
ARG SECRET_KEY
ARG NEXT_PUBLIC_SERVER_URL

# Add cache busting mechanism
ARG NODE_ENV

ENV DATABASE_URL=$DATABASE_URL
ENV SECRET_KEY=$SECRET_KEY
ENV NEXT_PUBLIC_SERVER_URL=$NEXT_PUBLIC_SERVER_URL

# Install pnpm
RUN npm install -g pnpm

# Copy package files first
COPY pnpm-lock.yaml package.json ./
RUN pnpm install --frozen-lockfile

# Copy all other files
COPY . .

# Build with cache busting
RUN pnpm build


# Stage 3: Production image
FROM node:20-alpine AS runner
WORKDIR /app

# Install pnpm
RUN npm install -g pnpm@latest

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

# Set the correct permission for prerender cache
RUN mkdir .next
RUN chown nextjs:nodejs .next

# Create and set permissions for media directory
RUN mkdir -p /app/media
RUN chown nextjs:nodejs /app/media
RUN chmod 755 /app/media

# Automatically leverage output traces to reduce image size
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["node", "server.js"] 
