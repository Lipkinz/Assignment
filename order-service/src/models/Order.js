const mongoose = require('mongoose'); // Import Mongoose to interact with MongoDB

// Define the schema for the Order model
const orderSchema = new mongoose.Schema({
  // Name of the product
  product: { 
    type: String, // Data type for product is String
    required: true // Product field is required
  },

  // Quantity of the product ordered
  quantity: { 
    type: Number, // Data type for quantity is Number
    required: true // Quantity field is required
  },

  // Price of the product
  price: { 
    type: Number, // Data type for price is Number
    required: true // Price field is required
  },

  // Status of the order (e.g., Pending, Completed, etc.)
  status: { 
    type: String, // Data type for status is String
    default: 'Pending' // Default value for status is 'Pending'
  },

  // Timestamp of when the order was created
  createdAt: { 
    type: Date, // Data type for createdAt is Date
    default: Date.now // Default value for createdAt is the current date and time
  }
});

// Export the Order model based on the orderSchema
module.exports = mongoose.model('Order', orderSchema);
