import Matches from '../database/models/matches';

const totalDraws = (resultMatche: Matches []) => {
  let pontos = 0;
  resultMatche.forEach((it) => {
    if (it.homeTeamGoals === it.awayTeamGoals) pontos += 1;
  });
  return pontos;
};
// total de empates

export default totalDraws;
