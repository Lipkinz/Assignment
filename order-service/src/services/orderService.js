const Order = require('../models/Order'); // Import the Order model

// Function to create a new order
exports.createOrder = async (orderData) => {
  try {
    const order = new Order(orderData); // Create a new order instance
    await order.save(); // Save the order to the database
    return order; // Return the saved order
  } catch (error) {
    throw new Error('Error creating order: ' + error.message); // Handle errors
  }
};

// Function to get all orders
exports.getAllOrders = async () => {
  try {
    const orders = await Order.find(); // Retrieve all orders from the database
    return orders; // Return the list of orders
  } catch (error) {
    throw new Error('Error retrieving orders: ' + error.message); // Handle errors
  }
};

// Function to get an order by ID
exports.getOrderById = async (orderId) => {
  try {
    const order = await Order.findById(orderId); // Find order by ID
    if (!order) throw new Error('Order not found'); // Handle not found
    return order; // Return the found order
  } catch (error) {
    throw new Error('Error retrieving order: ' + error.message); // Handle errors
  }
};

// Function to update an order by ID
exports.updateOrder = async (orderId, updateData) => {
  try {
    const order = await Order.findByIdAndUpdate(orderId, updateData, { new: true }); // Update the order
    if (!order) throw new Error('Order not found'); // Handle not found
    return order; // Return the updated order
  } catch (error) {
    throw new Error('Error updating order: ' + error.message); // Handle errors
  }
};

// Function to delete an order by ID
exports.deleteOrder = async (orderId) => {
  try {
    const order = await Order.findByIdAndDelete(orderId); // Delete the order
    if (!order) throw new Error('Order not found'); // Handle not found
    return order; // Return the deleted order
  } catch (error) {
    throw new Error('Error deleting order: ' + error.message); // Handle errors
  }
};
