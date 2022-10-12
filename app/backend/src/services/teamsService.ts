// import CustomError from '../Error/CustomError';
import TeamsModel from '../database/models/teams';

export default class TeamService {
  private _teamsModel;
  constructor(teamsModel = TeamsModel) {
    this._teamsModel = teamsModel;
  }

  async getAll() {
    const result = await this._teamsModel.findAll();
    return result;
  }

  async getById(id: number) {
    const result = await this._teamsModel.findByPk(id);
    return result;
  }
}
