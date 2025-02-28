import jwt from 'jsonwebtoken';
import { Usuario } from '../models/usuario.model.js';

export const authMiddleware = async (req, res, next) => {
  const { JWT_SECRET } = process.env;
  const { authorization } = req.headers;

  if (!authorization) {
    return res
      .status(401)
      .json({ response: 'No estás autorizado para realizar esta acción ⛔' });
  }

  try {
    const token = authorization.slice(7); // Bearer <token> => <token>
    const { id } = jwt.verify(token, JWT_SECRET);

    req.usuario = await Usuario.findById(id).select('-password -__v -_id');

    next();
  } catch (error) {
    return res
      .status(401)
      .json({ response: 'El token es inválido o ha expirado ⛔' });
  }
};
