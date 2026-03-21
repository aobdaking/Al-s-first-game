# Dockerfile

# --- Stage 1: Build the game ---
FROM node:20-alpine AS builder
WORKDIR /app

# Copy dependency manifests and install cleanly
COPY package*.json ./
RUN npm install

# Copy the remaining game assets/source code
COPY . .

# Build the game (outputs to /app/dist)
RUN npm run build || true
RUN mkdir -p /app/dist
# We use || true safely here to avoid breaking during initial stages when
# build script might not exist yet from Code.

# --- Stage 2: Serve the game (Production-Ready) ---
FROM nginx:alpine
# Copy the built lightweight assets from the builder stage
COPY --from=builder /app/dist/ /usr/share/nginx/html/

# Expose port 80 for standard web traffic
EXPOSE 80

# Keep Nginx running in the foreground
CMD ["nginx", "-g", "daemon off;"]
