// const jwt = require('jsonwebtoken');
import * as jwt from 'jsonwebtoken';

const JWT_SECRET: jwt.Secret = process.env.JWT_SECRET || 'jwt_secret';
// const JWT_OPTIONS: jwt.SignOptions = { algorithm: 'HS256', expiresIn: '7d' };

const createToken = (email: string) => {
  console.log(email, 'email');
  const token = jwt.sign(email, JWT_SECRET, { algorithm: 'HS256' });
  return token;
};

export default createToken;
