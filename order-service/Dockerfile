# Use an official Node.js runtime as a parent image
FROM node:18-alpine

# Install build tools required for native modules
RUN apk add --no-cache python3 make g++

# Set environment variables
ENV NODE_ENV=production

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install production dependencies only
RUN npm ci --only=production --build-from-source

# Copy the rest of the application files to the working directory
COPY . .

# Rebuild native modules if needed
RUN npm rebuild --build-from-source

# Ensure all application files have the correct permissions
RUN chown -R node:node /app

# Switch to the non-root 'node' user after setting permissions
USER node

# Expose port 3000
EXPOSE 3000

# Command to run your application
CMD ["node", "src/index.js"]
