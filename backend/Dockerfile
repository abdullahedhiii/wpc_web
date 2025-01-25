# Use Node.js as the base image
FROM node:18-alpine

# Set working directory inside the container
WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy all project files (ensure .env file is included if needed)
COPY . .

# Expose the backend API port
EXPOSE 3300

# Start the Node.js server using your app.js (ensure it's reading from the .env file)
CMD ["node", "app.js"]
