# Payment Assignment - User Service

This project is part of a full-stack assignment to build a microservice for managing users using Node.js, Express, and Apache Kafka for event-driven architecture. The service uses MongoDB as the database and Docker for containerization.

## Table of Contents

- [Technologies Used](#technologies-used)
- [Prerequisites](#prerequisites)
- [Setup Instructions](#setup-instructions)
- [API Endpoints](#api-endpoints)
- [Testing](#testing)
- [Kafka Configuration and Usage](#kafka-configuration-and-usage)
- [Environment Variables](#environment-variables)
- [Shutting Down](#shutting-down)
- [Troubleshooting](#troubleshooting)
- [Contributors](#contributors)

## Technologies Used

- **Backend Framework**: Node.js with Express
- **Event Bus**: Apache Kafka
- **Database**: MongoDB
- **API Documentation**: OpenAPI (Swagger)
- **Containerization**: Docker

## Prerequisites

- Docker and Docker Compose installed
- Node.js and npm installed

## Setup Instructions

1. **Clone the Repository:**

   ```bash
   git clone <repository-url>
Navigate to the Project Directory:
bash
Copy code
cd payment-assignment
Build and Run the Docker Containers:
bash
Copy code
docker-compose up --build
Verify All Services are Running:
Check the status of all containers:

bash
Copy code
docker-compose ps
Check Service Logs:
To ensure Kafka and MongoDB are set up correctly, you can check the logs:

bash
Copy code
docker-compose logs kafka
docker-compose logs mongo
API Endpoints

POST /api/users
Registers a new user.

Request:
bash
Copy code
curl -X POST -H "Content-Type: application/json" \
-d '{"username": "john_doe", "email": "john.doe@example.com", "password": "securepassword"}' \
http://localhost:3000/api/users
Response:
json
Copy code
{
  "username": "john_doe",
  "email": "john.doe@example.com",
  "password": "$2b$10$ZsFHWCdR.la2h/0pMLndku4uAGU7wSggLAmpbQqQcNQSHTUCgvTM6",
  "_id": "66d76af0e88ce87f07322823",
  "createdAt": "2024-09-03T20:00:48.043Z",
  "__v": 0
}
Testing

Use curl or a tool like Postman to test the API endpoints.

For example, to register a new user:

bash
Copy code
curl -X POST -H "Content-Type: application/json" -d '{"username": "john_doe", "email": "john.doe@example.com", "password": "securepassword"}' http://localhost:3000/api/users
Ensure that the response contains the user object with a hashed password.

Kafka Configuration and Usage

Kafka is used for event-driven communication between services. The Kafka producer is configured in the kafkaConfig.js file.

Kafka Configuration:
Client ID: user-service
Brokers: localhost:9092
Retries: 5
Idempotent: true
Usage:
The producer connects to Kafka upon initialization of the service. To publish events to a topic:

javascript
Copy code
const { publishEvent } = require('./kafkaConfig');
publishEvent('your-topic-name', { message: 'Hello, Kafka!' });
Environment Variables

If needed, set environment variables in your Docker environment or .env file:

MONGODB_URI: The connection string for MongoDB
KAFKA_BROKER: Kafka broker address (e.g., localhost:9092)
Shutting Down

To stop all running containers:

bash
Copy code
docker-compose down
Troubleshooting

Kafka Connection Issues:
Ensure Kafka is running and accessible at localhost:9092.
Check if Zookeeper is up and Kafka is correctly registered with it.
MongoDB Connection Issues:
Verify the MongoDB URI is correct and accessible.





## Project Structure

The following is the directory structure for the Payment Assignment project:

payment-assignment/
├── .vscode/                       # Visual Studio Code settings
├── certs/                         # Certificate files for secure connections
├── docs/                          # Documentation files
│   └── api-docs/
│       └── architecture.md        # Architecture overview of the project
├── event-bus/                     # Event bus-related files
├── node_modules/                  # Node.js dependencies
├── order-service/                 # Order Service microservice
│   ├── node_modules/              # Node.js dependencies for order-service
│   ├── src/
│   │   ├── controllers/           # Controller logic for handling API requests
│   │   │   └── orderController.js # Controller for order-related actions
│   │   ├── kafka/                 # Kafka producer and consumer setup
│   │   ├── models/                # Data models for MongoDB
│   │   │   └── Order.js           # Mongoose model for order data
│   │   ├── routes/                # Route definitions for the API
│   │   │   └── orderRoutes.js     # Routes for order-related API endpoints
│   │   ├── services/              # Business logic and utility functions
│   │   ├── index.js               # Entry point for the service
│   │   ├── swagger.js             # Swagger setup for API documentation
│   ├── Dockerfile                 # Dockerfile for containerizing the Order Service
│   ├── package.json               # Project metadata and dependencies
│   ├── package-lock.json          # Lockfile for dependencies
├── user-service/                  # User Service microservice
│   ├── node_modules/              # Node.js dependencies for user-service
│   ├── src/
│   │   ├── controllers/           # Controller logic for handling API requests
│   │   │   └── userController.js  # Controller for user-related actions
│   │   ├── kafka/                 # Kafka producer configuration
│   │   │   └── kafkaConfig.js     # Kafka configuration and producer setup
│   │   ├── models/                # Data models for MongoDB
│   │   │   └── User.js            # Mongoose model for user data
│   │   ├── routes/                # Route definitions for the API
│   │   │   └── userRoutes.js      # Routes for user-related API endpoints
│   │   ├── services/              # Business logic and utility functions
│   │   ├── index.js               # Entry point for the service
│   │   ├── swagger.js             # Swagger setup for API documentation
│   ├── Dockerfile                 # Dockerfile for containerizing the User Service
│   ├── package.json               # Project metadata and dependencies
│   ├── package-lock.json          # Lockfile for dependencies
├── .env                           # Environment variables file
├── .gitignore                     # Git ignore file
└── docker-compose.yml             # Docker Compose file for multi-container setup


Contributors

Tomer Kanelstein