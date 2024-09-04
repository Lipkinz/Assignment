const express = require('express');
const mongoose = require('mongoose');
const kafka = require('./kafka/kafkaConfig'); // Assuming kafkaConfig is for Kafka setup
const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc'); // Swagger for API documentation

const app = express();
const port = process.env.PORT || 3000;

// Swagger options
const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Order Service API',
      version: '1.0.0',
      description: 'API for managing orders in the system',
    },
    servers: [
      {
        url: `http://localhost:${port}`,
      },
    ],
  },
  apis: ['./routes/orderRoutes.js'], // Path to the API docs
};

// Initialize Swagger
const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB:', err));

// Middleware
app.use(express.json());

// Routes
const orderRoutes = require('./routes/orderRoutes');
app.use('/api/orders', orderRoutes);

// Kafka Consumer Setup (if needed)
kafka.consumer.on('message', message => {
  console.log('Received message:', message);
  // Handle Kafka message processing
});

// Start Server
app.listen(port, () => {
  console.log(`Order Service is running on port ${port}`);
  console.log(`Swagger API documentation available at http://localhost:${port}/api-docs`);
});
