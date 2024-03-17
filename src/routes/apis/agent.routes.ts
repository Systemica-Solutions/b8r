import { Router } from 'express';
import {
  agentSignUp,
  getAllAgentList,
  signInAgent,
  resetPassword,
  addCustomAuthCode,
  updateAgentDetails,
} from '../../controllers/agent.controller';
import {
  signinAgentValidation,
  signupAgentValidation,
  resetPasswordValidation,
  updateAgentValidation,
  addAuthCodeValidation,
} from '../../validation/agent.validation';
import { userAuth } from '../../middleware/user-auth.middleware';

const router = Router();

// Get all agents
router.get('/', getAllAgentList);

// Update agent details
router.put('/', userAuth, updateAgentValidation, updateAgentDetails);

// Sign up agent
router.post('/signup', signupAgentValidation, agentSignUp);

// Login agent
router.post('/signin', signinAgentValidation, signInAgent);

// Reset password
router.put('/reset-password', resetPasswordValidation, resetPassword);

// Add custom authcode
router.post('/authcode', addAuthCodeValidation, addCustomAuthCode);

export default router;
