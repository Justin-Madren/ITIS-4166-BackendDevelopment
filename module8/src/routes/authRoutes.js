import express from 'express';
import { signUpHandler , logInHandler} from '../controllers/authController.js';
import { validateSignup, validateLogin } from '../middleware/userValidators.js';
import { longinLimiter } from '../middleware/rateLimiter.js';
const router = express.Router();

router.post('/signup', validateSignup, signUpHandler);
router.post('/login', validateLogin, longinLimiter, logInHandler);
export default router;