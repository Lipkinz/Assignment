const { Kafka } = require('kafkajs');
const { initKafkaProducer, publishEvent, closeKafkaProducer } = require('./kafkaConfig');

// Initialize Kafka Producer
initKafkaProducer()
  .then(() => {
    console.log('Kafka Producer is ready');

    // Define the message payload
    const payload = {
      userId: '123',
      action: 'UserCreated',
      timestamp: new Date(),
    };

    // Send message to Kafka topic
    publishEvent('user-events', payload)
      .then(() => console.log('Message sent successfully to Kafka'))
      .catch((err) => console.error('Failed to send message to Kafka:', err));
  })
  .catch((err) => {
    console.error('Failed to initialize Kafka Producer:', err);
    process.exit(1);
  });

// Graceful shutdown
process.on('SIGINT', async () => {
  await closeKafkaProducer();
  process.exit(0);
});

process.on('SIGTERM', async () => {
  await closeKafkaProducer();
  process.exit(0);
});
