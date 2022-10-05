// import CustomError from '../Error/CustomError';
import Matches from '../database/models/matches';
import Teams from '../database/models/teams';

export default class MatchesService {
  private _matchesModel = Matches;
  private _teamsModel = Teams;
  // constructor(matchesModel = Matches, teams = Teams) {
  //   this._matchesModel = matchesModel;
  //   this._teamsModel = teams;
  // }

  async getAll() {
    const result = await this._matchesModel.findAll({
      include: [{ model: Teams, as: 'teamHome', attributes: { exclude: ['id'] } },
        { model: Teams, as: 'teamAway', attributes: { exclude: ['id'] } }],
    });
    return result;
  }

  // async getById(id: number) {
  //   const result = await this._teamsModel.findByPk(id);
  //   return result;
  // }
}
