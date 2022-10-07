import { Request, Response, NextFunction } from 'express';
import CustomError from '../Error/CustomError';

const validationMatches = (req:Request, res: Response, next: NextFunction) => {
  const { homeTeam, awayTeam } = req.body;
  if (homeTeam === awayTeam) {
    throw new CustomError(401, 'It is not possible to create a match with two equal teams');
  }
  next();
};

export default validationMatches;
