#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "$0")" && pwd)"

echo "==> Construyendo frontend (instalar dependencias y crear build)"
cd "$ROOT_DIR/frontend"

if [ ! -f package.json ]; then
  echo "ERROR: no se encontró package.json en $PWD"
  exit 1
fi

echo "Instalando dependencias (npm install)..."
npm install

echo "Creando build de producción (npm run build)..."
# Build strategy:
# 1) if local `node` exists, use it with an OpenSSL legacy workaround;
# 2) otherwise try to run the build inside a `node:18` Docker container (no local node required).

build_with_local_node() {
  if [ -z "${NODE_OPTIONS-}" ]; then
    export NODE_OPTIONS=--openssl-legacy-provider
    echo "(set) NODE_OPTIONS=$NODE_OPTIONS"
  else
    echo "NODE_OPTIONS is already set: $NODE_OPTIONS"
  fi

  if [ -f node_modules/react-scripts/scripts/build.js ]; then
    echo "Running build via: node --openssl-legacy-provider node_modules/react-scripts/scripts/build.js"
    node --openssl-legacy-provider node_modules/react-scripts/scripts/build.js
  else
    npm run build
  fi
}

build_with_docker() {
  echo "No local 'node' found, attempting build inside Docker (node:18)..."
  if ! command -v docker >/dev/null 2>&1; then
    echo "ERROR: neither 'node' nor 'docker' are available. Install Node.js 18+ or Docker to build the frontend."
    exit 1
  fi

  FRONTEND_DIR="$ROOT_DIR/frontend"
  echo "Using Docker to run: npm install && node --openssl-legacy-provider node_modules/react-scripts/scripts/build.js"
  docker run --rm -v "$FRONTEND_DIR":/app -w /app node:18-bullseye /bin/bash -lc \
    "npm install --silent && node --openssl-legacy-provider node_modules/react-scripts/scripts/build.js"
}

# Prefer attempting to run `node -v` to ensure the binary is actually runnable.
# Some environments might have a stub in PATH that isn't executable; running `node -v`
# provides a definitive check.
if node -v >/dev/null 2>&1; then
  echo "Using local Node for build: $(node -v 2>&1)"
  build_with_local_node
else
  echo "Local node not runnable, falling back to Docker build."
  build_with_docker
fi

echo "==> Levantando nginx con docker compose"
cd "$ROOT_DIR"
docker compose up -d --build

echo "==> Ejecutando chequeo HTTP"
chmod +x check.sh || true
./check.sh

echo "Despliegue completado. Abre: http://localhost:8080"
