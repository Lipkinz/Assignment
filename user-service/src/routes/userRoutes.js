const express = require('express'); // Import Express to create a router instance.
const userController = require('../controllers/userController'); // Import user controller module.

const router = express.Router(); // Create a new router instance for handling user-related routes.

/**
 * @route   GET /users
 * @desc    Get all users
 * @access  Public
 */
router.get('/', userController.getAllUsers);

/**
 * @route   POST /users
 * @desc    Create a new user
 * @access  Public
 */
router.post('/', userController.createUser);

/**
 * @route   GET /users/:id
 * @desc    Get user details by ID
 * @access  Public
 */
router.get('/:id', userController.getUserById);

/**
 * @route   PUT /users/:id
 * @desc    Update user details by ID
 * @access  Public
 */
router.put('/:id', userController.updateUser);

/**
 * @route   DELETE /users/:id
 * @desc    Delete user by ID
 * @access  Public
 */
router.delete('/:id', userController.deleteUser);

module.exports = router; // Export the router instance to be used in other parts of the application.
