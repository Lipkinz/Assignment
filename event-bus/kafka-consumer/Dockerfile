# Kafka Consumer Dockerfile

# Use an official Node.js runtime as the base image
FROM node:18-alpine

# Set the working directory
WORKDIR /app

# Copy package files to install dependencies
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all files from kafka-consumer to /app
COPY . .

# Expose the necessary port (if any)
EXPOSE 4000

# Define environment variables for the Kafka broker
ENV KAFKA_BROKER=localhost:9092
ENV KAFKA_TOPIC=user-events

# Command to run the Kafka consumer
CMD ["node", "consumer.js"]
