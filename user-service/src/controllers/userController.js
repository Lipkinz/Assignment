const User = require('../models/User'); // Import the User model for database operations
const kafka = require('../kafka/kafkaConfig'); // Import Kafka configuration for publishing events

// Controller function to get all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find(); // Fetch all users from the database
    res.status(200).json(users); // Send the list of users as a response
  } catch (error) {
    console.error('Error fetching users:', error.message); // Log the error
    res.status(500).json({ error: 'An error occurred while fetching users.' }); // Send error response
  }
};

// Controller function to create a new user
exports.createUser = async (req, res) => {
  try {
    const { username, email, password } = req.body; // Extract user details from the request body
    const newUser = new User({ username, email, password }); // Create a new user instance
    await newUser.save(); // Save the user to the database

    // Publish 'UserCreated' event to Kafka after successful user creation
    kafka.publishEvent('UserCreated', { username, email });

    res.status(201).json(newUser); // Send the created user as a response
  } catch (error) {
    console.error('Error creating user:', error.message); // Log the error
    res.status(500).json({ error: 'An error occurred while creating the user.' }); // Send error response
  }
};

// Controller function to get user details by ID
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id); // Fetch the user by ID
    if (!user) return res.status(404).json({ message: 'User not found' }); // Handle user not found
    res.status(200).json(user); // Send user details as a response
  } catch (error) {
    console.error('Error fetching user:', error.message); // Log the error
    res.status(500).json({ error: 'An error occurred while fetching the user details.' }); // Send error response
  }
};

// Controller function to update user details by ID
exports.updateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true }); // Update user in the database
    if (!user) return res.status(404).json({ message: 'User not found' }); // Handle user not found
    res.status(200).json(user); // Send updated user details as a response
  } catch (error) {
    console.error('Error updating user:', error.message); // Log the error
    res.status(500).json({ error: 'An error occurred while updating the user.' }); // Send error response
  }
};

// Controller function to delete a user by ID
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id); // Delete user by ID
    if (!user) return res.status(404).json({ message: 'User not found' }); // Handle user not found
    res.status(200).json({ message: 'User deleted successfully' }); // Send success message
  } catch (error) {
    console.error('Error deleting user:', error.message); // Log the error
    res.status(500).json({ error: 'An error occurred while deleting the user.' }); // Send error response
  }
};
