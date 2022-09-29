import { INTEGER, Model } from 'sequelize';
import db from '.';

export default class Matches extends Model {
  id!: number;
  homeTeam!: number;
  homeTeamGoals!: number;
  awayTeam!:number;
  awayTeamGoals!:number;
  inProgress!:number;
}

Matches.init({
  id: INTEGER,
  homeTeam: INTEGER,
  homeTeamGoals: INTEGER,
  awayTeam: INTEGER,
  awayTeamGoals: INTEGER,
  inProgress: INTEGER,

}, {
  sequelize: db,
  modelName: 'matches',
  timestamps: false,
  createdAt: false,
  underscored: true,
});
