import { Request, Response } from 'express';
import Leaderboard from '../services/leaderboardService';

export default class MatchesController {
  constructor(protected service = new Leaderboard()) {}

  getAll = async (_req: Request, res: Response) => {
    const result = await this.service.orden();
    return res.status(200).json(result);
  };

  // updateId = async (req: Request, res: Response) => {
  //   const id = Number(req.params.id);
  //   const { homeTeamGoals, awayTeamGoals } = req.body;

  //   await this.service.updateId(id, homeTeamGoals, awayTeamGoals);
  //   return res.status(200).json({ mensagem: 'dados atualizados com sucesso' });
  // };
}
