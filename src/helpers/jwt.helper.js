import jwt from 'jsonwebtoken';

export const generateToken = id => {
  const { JWT_SECRET } = process.env;

  return jwt.sign({ id }, JWT_SECRET, { expiresIn: '7d' });
};
