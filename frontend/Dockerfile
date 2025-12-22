# Multi-stage Dockerfile for building and serving a CRA frontend
# Stage 1: build the React app
FROM node:18-alpine AS build
WORKDIR /app
ENV CI=true

# Install dependencies
COPY package*.json ./
RUN npm ci

# Copy source and build
COPY . .
RUN npm run build

# Stage 2: serve the static files with 'serve'
FROM node:18-alpine AS runner
WORKDIR /app
RUN npm i -g serve
COPY --from=build /app/build ./build
ENV NODE_ENV=production
EXPOSE 8080
# Serve on the PORT provided by the environment (Fly sets PORT)
CMD ["sh", "-c", "serve -s build -l ${PORT:-8080}"]
# Stage 1: build
FROM node:18-alpine AS build
WORKDIR /app
ENV CI=true

# Allow passing the API base URL at build time (create-react-app reads REACT_APP_* at build)
ARG REACT_APP_API_URL
ENV REACT_APP_API_URL=$REACT_APP_API_URL

COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Stage 2: serve
FROM node:18-alpine AS runner
WORKDIR /app
# Instala 'serve' para servir los archivos estáticos en el puerto que pase la plataforma
RUN npm i -g serve
COPY --from=build /app/build ./build
ENV NODE_ENV=production
EXPOSE 8080
# Use PORT env var provided by Fly; default to 8080 if not set
CMD ["sh", "-c", "serve -s build -l ${PORT:-8080}"]
