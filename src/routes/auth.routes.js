import { Router } from 'express';
import {
  userLogin,
  userProfile,
  userRegister,
} from '../controllers/auth.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';
import { usuarioValidator } from '../validators/usuario.validator.js';

const authRouter = Router();

authRouter.post('/auth/register', usuarioValidator, userRegister);
authRouter.post('/auth/login', userLogin);

authRouter.get('/auth/profile', authMiddleware, userProfile);

export { authRouter };
  