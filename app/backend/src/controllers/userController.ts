import { Request, Response } from 'express';
import CustomError from '../Error/CustomError';
import UserService from '../services/userService';

require('express-async-errors');

export default class UserController {
  constructor(protected service = new UserService()) {}

  login = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    if (!email || !password) throw new CustomError(400, 'All fields must be filled');
    const result = await this.service.login({ email, password });
    return res.status(200).json({ token: result });
  };

  validateL = async (req: Request, res: Response) => {
    const { authorization } = req.headers;
    if (!authorization) throw new CustomError(400, 'invalid token');
    const result = await this.service.validateL(authorization);
    return res.status(200).json({ role: result });
  };
}
