const { Kafka } = require('kafkajs');
const { kafka } = require('./kafkaConfig'); // Reuse the Kafka instance from kafkaConfig.js

// Create a consumer instance
const consumer = kafka.consumer({ groupId: 'user-consumer-group' });

const consumeMessages = async () => {
  try {
    await consumer.connect();
    console.log('Kafka Consumer connected for User Service');

    // Subscribe to the topic
    await consumer.subscribe({ topic: 'user-events', fromBeginning: true });

    // Consume messages
    await consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        console.log(`Received message from Kafka topic ${topic}:`, message.value.toString());
        // Implement your business logic here
      },
    });
  } catch (error) {
    console.error('Error in Kafka Consumer:', error.message);
  }
};

// Start consuming messages
consumeMessages();

// Graceful shutdown for Kafka Consumer
process.on('SIGINT', async () => {
  console.log('SIGINT received: closing Kafka Consumer...');
  await consumer.disconnect();
  process.exit(0);
});

process.on('SIGTERM', async () => {
  console.log('SIGTERM received: closing Kafka Consumer...');
  await consumer.disconnect();
  process.exit(0);
});
