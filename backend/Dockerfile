# Use official Node.js image
FROM node:18-alpine

# Set working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all project files
COPY . .

# Expose port 5000 (or any backend port)
EXPOSE 5000

# Start the Node.js server
CMD ["node", "app.js"]
