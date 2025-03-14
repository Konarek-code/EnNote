FROM node:14

# Ustawienie katalogu roboczego
WORKDIR /app

# Kopiowanie plików package.json i package-lock.json, aby zainstalować zależności
COPY package.json package-lock.json ./

# Instalacja zależności
RUN npm install

# Kopiowanie pozostałych plików aplikacji
COPY . .

# Ustalenie zmiennej środowiskowej PORT
ENV PORT=8080

# Wystawienie portu (dopasuj do aplikacji)
EXPOSE 8080

# Uruchomienie aplikacji
CMD ["node", "server.js"]
