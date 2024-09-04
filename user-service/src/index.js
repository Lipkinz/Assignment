// Load environment variables from .env file
require('dotenv').config();

// Import required modules
const express = require('express'); // Express framework for building APIs
const mongoose = require('mongoose'); // Mongoose for MongoDB interactions
const swaggerUi = require('swagger-ui-express'); // Swagger UI for API documentation
const swaggerSpec = require('./swagger'); // Swagger specification for API documentation
const userRoutes = require('./routes/userRoutes'); // Routes for user-related API endpoints
const kafka = require('./kafka/kafkaConfig'); // Kafka configuration

// Create an Express application
const app = express();
const port = process.env.PORT || 3000; // Use environment variable for port or default to 3000

// Middleware to parse JSON request bodies
app.use(express.json());

// Set up Swagger documentation route
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// MongoDB connection URI using environment variable
const mongoURI = process.env.MONGO_URI;

// Connect to MongoDB with improved error handling and secure options
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to MongoDB for User Service'))
  .catch(err => {
    console.error('MongoDB connection error:', err.message);
    process.exit(1); // Exit the process if unable to connect
  });

// Initialize Kafka producer with error handling
(async () => {
  try {
    await kafka.initKafkaProducer();
    console.log('Kafka producer initialized successfully');
  } catch (err) {
    console.error('Error initializing Kafka producer:', err.message);
    process.exit(1); // Exit the process if unable to initialize Kafka
  }
})();

// Register user-related routes with the correct base path
app.use('/api/users', userRoutes); // Updated to match the correct path

// Start the server and listen on the specified port
app.listen(port, () => {
  console.log(`User Service is running on port ${port}`);
});
