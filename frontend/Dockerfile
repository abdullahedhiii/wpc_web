# Use an official Node.js image as a parent image
FROM node:18

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json (or yarn.lock) into the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the Vite dev server port (5173 by default)
EXPOSE 5173

# Start the Vite development server, with --host to bind to 0.0.0.0
CMD ["npm", "run", "dev", "--", "--host"]
