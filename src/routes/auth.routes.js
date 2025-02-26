import { Router } from 'express';
import {
  userLogin,
  userProfile,
  userRegister,
} from '../controllers/auth.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';

const authRouter = Router();

authRouter.post('/auth/register', userRegister);
authRouter.post('/auth/login', userLogin);

authRouter.get('/auth/profile', authMiddleware, userProfile);

export { authRouter };
