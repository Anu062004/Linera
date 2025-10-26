FROM rust:1.75-slim as builder

# Install system dependencies
RUN apt-get update && apt-get install -y \
    build-essential \
    curl \
    && rm -rf /var/lib/apt/lists/*

# Install wasm32 target
RUN rustup target add wasm32-unknown-unknown

# Set working directory
WORKDIR /app

# Copy contract source
COPY contract/ ./contract/

# Build the contract
RUN cd contract && \
    cargo build --release --target wasm32-unknown-unknown

# Production stage
FROM node:18-alpine as frontend

# Install dependencies
RUN npm install -g npm@latest

# Set working directory
WORKDIR /app

# Copy frontend source
COPY frontend/ ./frontend/

# Install dependencies and build
RUN cd frontend && \
    npm ci && \
    npm run build

# Final stage
FROM nginx:alpine

# Copy built frontend
COPY --from=frontend /app/frontend/dist /usr/share/nginx/html

# Copy contract artifacts
COPY --from=builder /app/contract/target/wasm32-unknown-unknown/release/*.wasm /usr/share/nginx/html/contracts/

# Copy deployment scripts
COPY operator/ /usr/share/nginx/html/operator/

# Expose port
EXPOSE 80

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD curl -f http://localhost/ || exit 1

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
