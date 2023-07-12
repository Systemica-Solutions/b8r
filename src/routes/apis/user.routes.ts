import { Router } from 'express';
import { signUpUser, getAllUsersList, signInUser, forgotPassword } from '../../controllers/user.controller';
import { signinUserValidation, signupUserValidation, resetPasswordValidation } from '../../validation/user.validation';
import { userAuth } from '../../middleware/user-auth.middleware';

const router = Router();

// Get all users
router.get('/', userAuth,  getAllUsersList);

// Sign up user
router.post('/signup', signupUserValidation, signUpUser);

// Login user
router.post('/signin', signinUserValidation, signInUser);

// Forgot password
router.put('/forgot-password', resetPasswordValidation, forgotPassword);

export default router;
