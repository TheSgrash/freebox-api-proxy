# Use official Node.js 18 image
FROM node:18-alpine

# Create app directory
WORKDIR /usr/src/app

# Copy package files first for better caching
COPY package*.json ./

# Install dependencies
RUN npm install --production

# Copy application files
COPY . .

# Create persistent volume for session token
RUN mkdir -p /data && \
    touch /data/session_token.txt && \
    ln -s /data/session_token.txt session_token.txt

# Expose API port
EXPOSE 3000

# Start the application
CMD ["npm", "start"]