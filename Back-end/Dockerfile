# Use lightweight Node image
FROM node:18-alpine

# Create app directory
WORKDIR /app

# Copy package files first (better caching)
COPY package*.json ./

# Install dependencies
RUN npm install --production

# Copy remaining files
COPY . .

# Expose backend port
EXPOSE 5020

# Start app
CMD ["npm", "start"]