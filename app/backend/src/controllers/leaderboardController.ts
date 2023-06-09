import { Request, Response } from 'express';
import Leaderboard from '../services/leaderboardService';

export default class MatchesController {
  constructor(protected service = new Leaderboard()) {}

  getAll = async (_req: Request, res: Response) => {
    const result = await this.service.orden();
    return res.status(200).json(result);
  };

}
