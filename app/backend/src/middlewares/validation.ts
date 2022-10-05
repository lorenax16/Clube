import { Request, Response, NextFunction } from 'express';
import CustomError from '../Error/CustomError';

const mensagem = 'All fields must be filled';

const validatedEmail = (email: string) => {
  const regexEmail = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;
  const validaEmail = regexEmail.test(email);

  if (!email) throw new CustomError(400, mensagem);
  if (!validaEmail) throw new CustomError(400, mensagem);
};

const validatePassword = (password: string) => {
  if (!password) throw new CustomError(400, mensagem);
  if (password.length < 6) throw new CustomError(400, mensagem);
};

const validateUser = (req: Request, _res: Response, next: NextFunction) => {
  const { email, password } = req.body;
  validatedEmail(email);
  validatePassword(password);
  next();
};

export default validateUser;
