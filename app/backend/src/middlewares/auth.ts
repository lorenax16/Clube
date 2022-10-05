import * as jwt from 'jsonwebtoken';
import CustomError from '../Error/CustomError';

const { JWT_SECRET } = process.env;

const verifyToken = (token: string) => {
  if (!JWT_SECRET) throw new CustomError(401, 'Token not found');
  try {
    const verify = jwt.verify(token, JWT_SECRET);
    if (!verify) throw new CustomError(401, 'dont have authorization');
  } catch (error) {
    throw new CustomError(500, 'Expired or invalid token');
  }
};

export default verifyToken;
