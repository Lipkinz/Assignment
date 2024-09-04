const User = require('../models/User'); // Import the User model

// Function to create a new user
exports.createUser = async (userData) => {
  try {
    const user = new User(userData); // Create a new User instance
    await user.save(); // Save the user to the database
    return user; // Return the created user
  } catch (error) {
    throw new Error('Error creating user: ' + error.message); // Handle errors
  }
};

// Function to get all users
exports.getAllUsers = async () => {
  try {
    const users = await User.find(); // Retrieve all users from the database
    return users; // Return the list of users
  } catch (error) {
    throw new Error('Error retrieving users: ' + error.message); // Handle errors
  }
};

// Function to get a user by ID
exports.getUserById = async (userId) => {
  try {
    const user = await User.findById(userId); // Find user by ID
    if (!user) throw new Error('User not found'); // Handle not found
    return user; // Return the found user
  } catch (error) {
    throw new Error('Error retrieving user: ' + error.message); // Handle errors
  }
};

// Function to update a user by ID
exports.updateUser = async (userId, updateData) => {
  try {
    const user = await User.findByIdAndUpdate(userId, updateData, { new: true }); // Update the user
    if (!user) throw new Error('User not found'); // Handle not found
    return user; // Return the updated user
  } catch (error) {
    throw new Error('Error updating user: ' + error.message); // Handle errors
  }
};

// Function to delete a user by ID
exports.deleteUser = async (userId) => {
  try {
    const user = await User.findByIdAndDelete(userId); // Delete the user
    if (!user) throw new Error('User not found'); // Handle not found
    return user; // Return the deleted user
  } catch (error) {
    throw new Error('Error deleting user: ' + error.message); // Handle errors
  }
};
