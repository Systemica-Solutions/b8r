import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// Password encryption
export const encrypt = (value) => {
  return bcrypt.hash(value, 10);
};

// Password decryption
export const decrypt = (enteredPassword, storedHash) => {
  return bcrypt.compare(enteredPassword, storedHash);
};

// Generate random key string
export const generateRandomKey = (length) => {
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let tempString = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    tempString += characters.charAt(randomIndex);
  }
  return tempString;
};

/**
 * Generate JWT token using object details
 */
export const generateJWTToken = (data) => {
  return jwt.sign(data.toJSON(), process.env.SECRET, {
    expiresIn: process.env.JWT_EXPIRY,
  });
};
