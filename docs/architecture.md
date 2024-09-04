# Architecture Overview

This document provides an overview of the architecture for the User Service in the Payment Assignment project. The service is built using a microservices architecture with Node.js, Express, Apache Kafka, and MongoDB, all containerized with Docker.

## Table of Contents

- [Microservices Architecture](#microservices-architecture)
- [Components Overview](#components-overview)
- [Service Interaction](#service-interaction)
- [Kafka Event-Driven Architecture](#kafka-event-driven-architecture)
- [Database Design](#database-design)
- [Deployment](#deployment)

## Microservices Architecture

The User Service is designed as part of a microservices architecture, where each service is independently deployable and scalable. The architecture allows for flexibility, modularity, and easy integration with other services.

## Components Overview

1. **User Service (Node.js with Express):**
   - Handles user management operations such as registration, login, and profile management.
   - Communicates with MongoDB for data persistence.

2. **Apache Kafka:**
   - Used as an event bus for managing communication between microservices.
   - Supports a publish-subscribe model, allowing services to consume or produce events asynchronously.

3. **MongoDB:**
   - Acts as the primary database for storing user information.
   - Designed for scalability and ease of use with Node.js.

4. **Docker:**
   - Used for containerizing all components, ensuring consistency across different development and deployment environments.
   - Managed using Docker Compose for multi-container orchestration.

## Service Interaction

- **User Service** interacts with **MongoDB** to perform CRUD operations related to user management.
- **User Service** uses **Kafka** to publish events (e.g., user registration) that other services may consume.
- **Kafka** brokers facilitate asynchronous communication and decoupling between services.

## Kafka Event-Driven Architecture

Kafka is a core component of the event-driven architecture used in this project:

1. **Producer:**
   - The User Service acts as a producer, sending messages to Kafka topics.
   - Events like "User Registered" are published to Kafka, allowing other services to react accordingly.

2. **Consumer:**
   - Other services consume events from Kafka topics.
   - For example, an Email Service may consume the "User Registered" event to send a welcome email.

3. **Topics:**
   - Events are organized into topics, which are distributed across Kafka brokers for scalability and fault tolerance.

## Database Design

The User Service utilizes MongoDB for storing user data:

- **Users Collection:**
  - Stores user details, including username, email, password hash, creation date, etc.
  - Indexed on fields like `email` for efficient querying.

- **Database Schema:**
  - The schema is designed to be flexible, allowing for the easy addition of new fields without major changes.

## Deployment

### Local Development

- **Docker Compose** is used for local development, enabling you to run all services in containers with a single command.
- Services can be started with:

  ```bash
  docker-compose up --build
