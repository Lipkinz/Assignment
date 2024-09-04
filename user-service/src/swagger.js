const swaggerJSDoc = require('swagger-jsdoc'); // Import Swagger JSDoc for generating API documentation

// Define the basic information about the API
const swaggerDefinition = {
  openapi: '3.0.0', // Specify the OpenAPI version
  info: {
    title: 'User Service API', // Title of the API
    version: '1.0.0', // Version of the API
    description: 'API documentation for the User Service', // Brief description of the API
  },
};

// Define options for generating the Swagger documentation
const options = {
  swaggerDefinition, // Basic API information
  apis: ['./src/routes/*.js'], // Paths to files containing API routes
};

// Generate the Swagger specification
const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec; // Export the Swagger specification
