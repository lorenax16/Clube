import { Request, Response } from 'express';
// import CustomError from '../Error/CustomError';
import MatchesService from '../services/matchesService';

require('express-async-errors');

export default class MatchesController {
  constructor(protected service = new MatchesService()) {}

  getAll = async (_req: Request, res: Response) => {
    const result = await this.service.getAll();
    return res.status(200).json(result);
  };

  // getById = async (req: Request, res: Response) => {
  //   const { id } = req.params;
  //   const result = await this.service.getById(Number(id));
  //   return res.status(200).json(result);
  // };
}
