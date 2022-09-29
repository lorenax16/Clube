import * as jwt from 'jsonwebtoken';

const { JWT_SECRET } = process.env;

const verifyToken = (token: string) => {
  if (!JWT_SECRET) throw new Error('Token not found');
  try {
    const verify = jwt.verify(token, JWT_SECRET);
    if (!verify) throw new Error('dont have authorization');
  } catch (error) {
    throw new Error('Expired or invalid token');
  }
};

export default verifyToken;
