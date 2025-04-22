# Imagem base com suporte ao Puppeteer
FROM node:18-slim

# Instala dependências do Chromium
RUN apt-get update && apt-get install -y \
    wget \
    ca-certificates \
    fonts-liberation \
    libappindicator3-1 \
    libasound2 \
    libatk-bridge2.0-0 \
    libatk1.0-0 \
    libcups2 \
    libdbus-1-3 \
    libgdk-pixbuf2.0-0 \
    libnspr4 \
    libnss3 \
    libx11-xcb1 \
    libxcomposite1 \
    libxdamage1 \
    libxrandr2 \
    xdg-utils \
    --no-install-recommends && \
    apt-get clean && rm -rf /var/lib/apt/lists/*

# Cria diretório de app
WORKDIR /app

# Copia tudo
COPY . .

# Instala dependências Node.js
RUN npm install

# Expõe a porta que o Railway usa
ENV PORT=3000
EXPOSE 3000

# Start da aplicação
CMD ["npm", "start"]
