import { Request, Response } from 'express';
// import * as jwt from 'jsonwebtoken';
import verifyToken from '../middlewares/auth';
import CustomError from '../Error/CustomError';
import IMatches from '../interface/Imatches';
import MatchesService from '../services/matchesService';

require('express-async-errors');

// const JWT_SECRET: jwt.Secret = process.env.JWT_SECRET || 'jwt_secret';

export default class MatchesController {
  constructor(protected service = new MatchesService()) {}

  getAll = async (_req: Request, res: Response) => {
    const result = await this.service.getAll();
    return res.status(200).json(result);
  };

  create = async (req: Request, res: Response) => {
    const novoJogo = req.body;
    const { authorization } = req.headers;

    // existe

    if (!authorization) throw new CustomError(401, 'Token must be a valid token');
    verifyToken(authorization);
    // const validate = jwt.verify(authorization, JWT_SECRET);
    // se e valido
    // if (!validate) throw new CustomError(401, 'Token must be a valid token');

    const result = await this.service.create(novoJogo as IMatches);
    return res.status(201).json(result);
  };

  update = async (req: Request, res: Response) => {
    const id = Number(req.params.id);

    await this.service.update(id);
    return res.status(200).json({ message: 'Finished' });
  };
}
