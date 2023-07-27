import bcrypt from "bcrypt";

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
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let tempString = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    tempString += characters.charAt(randomIndex);
  }
  return tempString;
};
