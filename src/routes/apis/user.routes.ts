import { Router } from 'express';
import { signUpUser, getAllUsersList, signInUser, forgotPassword, updateUserDetails } from '../../controllers/user.controller';
import { signinUserValidation, signupUserValidation,
    resetPasswordValidation, updateUserValidation } from '../../validation/user.validation';
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

export default router;
