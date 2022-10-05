import { Request, Response } from 'express';
// import CustomError from '../Error/CustomError';
import TeamsService from '../services/teamsService';

require('express-async-errors');

export default class TeamsController {
  constructor(protected service = new TeamsService()) {}

  getAll = async (_req: Request, res: Response) => {
    const result = await this.service.getAll();
    return res.status(200).json(result);
  };

  getById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await this.service.getById(Number(id));
    return res.status(200).json(result);
  };
}
