const mongoose = require('mongoose'); // Import Mongoose for MongoDB operations
const bcrypt = require('bcrypt'); // Import bcrypt for hashing passwords

// Define the User schema for MongoDB
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, trim: true }, // Username field (required) with trimming whitespace
  email: { type: String, required: true, unique: true, lowercase: true, trim: true }, // Email field (required, unique, lowercase, and trimmed)
  password: { type: String, required: true }, // Password field (required)
  createdAt: { type: Date, default: Date.now } // Timestamp for when the user was created
});

// Pre-save middleware to hash the password before saving
userSchema.pre('save', async function (next) {
  const user = this;

  if (!user.isModified('password')) return next(); // Only hash if the password field has been modified

  try {
    const salt = await bcrypt.genSalt(10); // Generate salt with a cost factor of 10
    user.password = await bcrypt.hash(user.password, salt); // Hash the password and store it
    next(); // Proceed to save the user
  } catch (err) {
    console.error('Error during password hashing:', err); // Log the error for debugging
    next(err); // Pass error to the next middleware if hashing fails
  }
});

// Method to compare password for authentication
userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password); // Compare provided password with the hashed one
};

// Export the User model to use in other parts of the application
module.exports = mongoose.model('User', userSchema);
