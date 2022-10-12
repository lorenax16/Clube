import { Model, INTEGER, DECIMAL, STRING } from 'sequelize';
import db from '.';

export default class Leaderboard extends Model {
  id?: number;
  name: string;
  totalPoints?: number;
  totalGames: number;
  totalVictories?: number;
  totalDraws?: number;
  totalLosses?: number;
  goalsFavor?: number;
  goalsOwn?: number;
  goalsBalance: number;
  efficiency: number;
}

Leaderboard.init({
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: INTEGER,
  },
  name: STRING,
  totalPoints: INTEGER,
  totalGames: INTEGER,
  totalVictories: INTEGER,
  totalDraws: INTEGER,
  totalLosses: INTEGER,
  goalsFavor: INTEGER,
  goalsOwn: INTEGER,
  goalsBalance: INTEGER,
  efficiency: DECIMAL,
}, {
  sequelize: db,
  modelName: 'leaderboards',
  timestamps: false,
  underscored: true,
});
