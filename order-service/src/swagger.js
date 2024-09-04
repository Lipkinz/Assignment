const swaggerJsDoc = require('swagger-jsdoc'); // Import swagger-jsdoc to parse OpenAPI definitions
const swaggerUi = require('swagger-ui-express'); // Import swagger-ui-express to serve Swagger UI

// Swagger configuration options
const options = {
  definition: { // Define the OpenAPI specification
    openapi: '3.0.0', // Version of the OpenAPI standard being used
    info: { // API metadata for documentation
      title: 'Order Service API', // Title of the API
      version: '1.0.0', // Version of the API
      description: 'API documentation for the Order Service of the Payment Assignment project.', // Description of the API
    },
    servers: [ // List of servers where the API is hosted
      {
        url: 'http://localhost:3001', // Base URL for the local server
        description: 'Local server', // Description for the server
      },
    ],
  },
  apis: ['./routes/orderRoutes.js'], // Path to the API routes file(s) to be documented
};

// Generate the Swagger specification from the configuration options
const swaggerSpec = swaggerJsDoc(options);

// Function to set up Swagger documentation middleware in the Express app
const swaggerDocs = (app) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec)); // Serve Swagger UI at the /api-docs endpoint
};

// Export the function to integrate Swagger docs with the app
module.exports = swaggerDocs;
