# Use Node.js 18 LTS
FROM node:18-alpine

# Create app directory
WORKDIR /app

# Install dependencies first (better layer caching)
COPY package*.json ./
RUN npm ci --only=production

# Copy source code
COPY . .

# App listens on port 3000
EXPOSE 3000

# Start the server
CMD ["npm", "start"]
