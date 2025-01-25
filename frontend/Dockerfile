# Use Node.js for building the React app
FROM node:18-alpine AS build

WORKDIR /app

# Copy package.json and install dependencies first
COPY package*.json ./
RUN npm install

# Copy the entire project to the container
COPY . .

# Build the React app
RUN npm run build

# Use nginx to serve the frontend
FROM nginx:alpine

# Copy the production build from the previous stage
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
