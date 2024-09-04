const { Kafka, logLevel } = require('kafkajs'); // Import Kafka library and logLevel constants

// Create a Kafka client instance with the necessary configurations
const kafka = new Kafka({
  clientId: 'user-service', // Unique client ID to identify this instance
  brokers: ['payment-assignment-kafka-1:9092'], // Address of Kafka broker (Docker container name for Kafka)
  logLevel: logLevel.DEBUG, // Set log level to DEBUG for detailed logging
  retry: { // Retry configuration for Kafka operations
    retries: 5, // Maximum number of retry attempts
    initialRetryTime: 300, // Initial time to wait before retrying (in milliseconds)
    multiplier: 2, // Multiplier for exponential backoff
  },
});

// Create a Kafka producer instance with additional configurations
const producer = kafka.producer({
  allowAutoTopicCreation: false, // Prevents automatic topic creation if the topic does not exist
  idempotent: true, // Ensures that messages are produced exactly once
  maxInFlightRequests: 1, // Limits the number of unacknowledged requests
});

exports.kafka = kafka; // Export the Kafka instance for reuse in other modules

// Initialize Kafka producer and establish a connection
exports.initKafkaProducer = async () => {
  try {
    await producer.connect(); // Connect the producer to the Kafka broker
    console.log('Kafka Producer connected for User Service'); // Log success message
  } catch (error) { // Catch any connection errors
    console.error('Failed to connect Kafka Producer:', error.message); // Log error message
    console.error('Error stack:', error.stack); // Log error stack trace
    process.exit(1); // Exit the process with an error code
  }
};

// Publish an event to a specified Kafka topic
exports.publishEvent = async (topic, message) => {
  try {
    await producer.send({
      topic, // The Kafka topic to publish to
      messages: [{ value: JSON.stringify(message) }], // Convert the message to a JSON string and send
    });
    console.log(`Event published to topic ${topic}`); // Log success message
  } catch (error) { // Catch any errors during message sending
    console.error(`Error publishing event to topic ${topic}:`, error.message); // Log error message
    console.error('Error stack:', error.stack); // Log error stack trace
  }
};

// Gracefully disconnect the Kafka producer
exports.closeKafkaProducer = async () => {
  try {
    await producer.disconnect(); // Disconnect the producer from Kafka
    console.log('Kafka Producer disconnected successfully'); // Log success message
  } catch (error) { // Catch any errors during disconnection
    console.error('Error disconnecting Kafka Producer:', error.message); // Log error message
    console.error('Error stack:', error.stack); // Log error stack trace
  }
};

// Handle process termination signals for graceful shutdown
process.on('SIGINT', async () => {
  console.log('SIGINT received: closing Kafka Producer...'); // Log signal reception
  await exports.closeKafkaProducer(); // Call the close function to disconnect the producer
  process.exit(0); // Exit the process normally
});

process.on('SIGTERM', async () => {
  console.log('SIGTERM received: closing Kafka Producer...'); // Log signal reception
  await exports.closeKafkaProducer(); // Call the close function to disconnect the producer
  process.exit(0); // Exit the process normally
});
