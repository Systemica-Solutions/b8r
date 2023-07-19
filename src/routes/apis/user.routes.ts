import { Router } from 'express';
import { signUpUser, getAllUsersList, signInUser, forgotPassword,
    addCustomAuthCode, updateUserDetails } from '../../controllers/user.controller';
import { signinUserValidation, signupUserValidation,
    resetPasswordValidation, updateUserValidation, addAuthCodeValidation } from '../../validation/user.validation';
import { userAuth } from '../../middleware/user-auth.middleware';

const router = Router();

// Get all users
router.get('/', userAuth,  getAllUsersList);

// Update user details
router.put('/', userAuth, updateUserValidation,  updateUserDetails);

// Sign up user
router.post('/signup', signupUserValidation, signUpUser);

// Login user
router.post('/signin', signinUserValidation, signInUser);

// Forgot password
router.put('/forgot-password', resetPasswordValidation, forgotPassword);

// Add custom authcode
router.post('/authcode', userAuth, addAuthCodeValidation, addCustomAuthCode);

export default router;
