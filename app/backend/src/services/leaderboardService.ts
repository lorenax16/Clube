// import CustomError from '../Error/CustomError';
// import Matches from '../database/models/matches';
// import Teams from '../database/models/teams';
import TeamService from './teamsService';
import MatchesService from './matchesService';
import calculaPoints from '../util/calculaPoint';
import TotalVitorias from '../util/totalVitorias';
import totalDraws from '../util/totalDraws';
import perdas from '../util/perdas';
import goalsFavor from '../util/golsFavor';
import goalsOwn from '../util/goalsOwn';
import goalsBalance from '../util/goalsBalance';
import efficiency from '../util/efficiency';
// import Imatches from '../interface/Imatches';

export default class LeaderboardService {
  constructor(private teams = new TeamService(), private matche = new MatchesService()) {}

  async leaderboardHome() {
    const team = await this.teams.getAll();
    const matche = await this.matche.getAllFinish();

    const resultTeam = team.map((item) => {
      const resultMatche = matche.filter((it) => it.homeTeam === item.id);
      return {
        name: item.teamName,
        totalPoints: calculaPoints(resultMatche),
        // total de jogos
        totalGames: resultMatche.length,
        totalVictories: TotalVitorias(resultMatche),
        totalDraws: totalDraws(resultMatche),
        totalLosses: perdas(resultMatche),
        goalsFavor: goalsFavor(resultMatche),
        goalsOwn: goalsOwn(resultMatche),
        goalsBalance: goalsBalance(resultMatche),
        efficiency: efficiency(resultMatche),
      };
    });
    return resultTeam;
  }

  async orden() {
    const leard = await this.leaderboardHome();
    return leard.sort((a, b) => b.totalPoints - a.totalPoints
    || b.totalVictories - a.totalVictories
    || b.goalsBalance - a.goalsBalance
    || b.goalsFavor - a.goalsFavor
    || b.goalsOwn - a.goalsOwn);
  }
}
