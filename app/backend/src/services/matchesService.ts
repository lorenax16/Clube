import CustomError from '../Error/CustomError';
import Matches from '../database/models/matches';
import Teams from '../database/models/teams';
import Imatches from '../interface/Imatches';

export default class MatchesService {
  private _matchesModel;

  constructor(matchesModel = Matches) {
    this._matchesModel = matchesModel;
  }

  async getAll() {
    const result = await this._matchesModel.findAll({
      include: [{ model: Teams, as: 'teamHome', attributes: { exclude: ['id'] } },
        { model: Teams, as: 'teamAway', attributes: { exclude: ['id'] } }],
    });
    return result;
  }

  async create(novoJogo: Imatches) {
    const { homeTeam, awayTeam } = novoJogo;
    const verifyHomeTeam = await this._matchesModel.findOne({ where: { id: homeTeam } });
    const verifyAwayTeam = await this._matchesModel.findOne({ where: { id: awayTeam } });
    if (!verifyHomeTeam || !verifyAwayTeam) {
      throw new CustomError(404, 'There is no team with such id!');
    }
    const result = await this._matchesModel.create(novoJogo);
    return result;
  }

  async update(id:number) {
    const matcheFound = await this._matchesModel.findByPk(id);
    if (!matcheFound) throw new CustomError(401, 'NotFoundError');
    await this._matchesModel.update({ inProgress: false }, { where: { id } });
  }

  async updateId(id:number, homeTeamGoals:number, awayTeamGoals:number) {
    const result = await this._matchesModel.findByPk(id);
    if (!result) throw new CustomError(401, 'NotFoundError');
    await this._matchesModel.update({ homeTeamGoals, awayTeamGoals }, { where: { id } });
  }
}
