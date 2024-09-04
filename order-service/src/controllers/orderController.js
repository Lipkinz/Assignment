const Order = require('../models/Order');
const kafka = require('../kafka/kafkaConfig'); // Import Kafka configuration for publishing events

// Create a new order
exports.createOrder = async (req, res) => {
  try {
    const order = new Order(req.body);
    await order.save();
    
    // Publish 'OrderCreated' event to Kafka after successful order creation
    kafka.publishEvent('OrderCreated', order);

    res.status(201).json(order);
  } catch (error) {
    console.error('Error creating order:', error.message); // Log the error
    res.status(400).json({ message: 'An error occurred while creating the order.' });
  }
};

// Get all orders
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error.message); // Log the error
    res.status(500).json({ message: 'An error occurred while fetching orders.' });
  }
};

// Get an order by ID
exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: 'Order not found' });
    res.status(200).json(order);
  } catch (error) {
    console.error('Error fetching order:', error.message); // Log the error
    res.status(500).json({ message: 'An error occurred while fetching the order details.' });
  }
};

// Update an order by ID
exports.updateOrder = async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!order) return res.status(404).json({ message: 'Order not found' });
    
    // Publish 'OrderUpdated' event to Kafka after successful order update
    kafka.publishEvent('OrderUpdated', order);

    res.status(200).json(order);
  } catch (error) {
    console.error('Error updating order:', error.message); // Log the error
    res.status(400).json({ message: 'An error occurred while updating the order.' });
  }
};

// Delete an order by ID
exports.deleteOrder = async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);
    if (!order) return res.status(404).json({ message: 'Order not found' });
    
    // Publish 'OrderDeleted' event to Kafka after successful order deletion
    kafka.publishEvent('OrderDeleted', { id: req.params.id });

    res.status(200).json({ message: 'Order deleted successfully.' });
  } catch (error) {
    console.error('Error deleting order:', error.message); // Log the error
    res.status(500).json({ message: 'An error occurred while deleting the order.' });
  }
};
