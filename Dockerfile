# Start from Node.js base image
FROM node:18

# Working directory
WORKDIR /app

# Copy package info and install
COPY package.json package-lock.json ./
RUN npm install

# Copy app files
COPY . .

# Copy .env file
COPY .env .env

# Copy Firebase credentials
COPY utils/serviceAccountKey.json ./utils/serviceAccountKey.json

# Expose Cloud Run port
EXPOSE 8080

# Start app
CMD ["node", "server.js"]
