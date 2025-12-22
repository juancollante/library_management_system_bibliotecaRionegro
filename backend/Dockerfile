FROM node:18-alpine
WORKDIR /app

# Instala dependencias usando package*.json
COPY package*.json ./
RUN npm ci --only=production

# Copia el código
COPY . .

ENV NODE_ENV=production
EXPOSE 5000

# Ejecuta el servidor (ajusta si tu entrypoint es otro)
CMD ["node", "server.js"]
