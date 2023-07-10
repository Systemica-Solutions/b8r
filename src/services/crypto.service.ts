import bcrypt from 'bcrypt';

// Password encryption
export const encrypt = (value) => {
    return bcrypt.hash(value, 10);
};

// Password decryption
export const decrypt = (enteredPassword, storedHash) => {
    return bcrypt.compare(enteredPassword, storedHash);
};
