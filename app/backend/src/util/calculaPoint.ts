import Matches from '../database/models/matches';

const calculaPoints = (resultMatche: Matches []) => {
  let pontos = 0;
  resultMatche.forEach((it) => {
    if (it.homeTeamGoals > it.awayTeamGoals) pontos += 3;
    if (it.awayTeamGoals === it.homeTeamGoals) pontos += 1;
  });
  return pontos;
};
// pontos do time ganhador ou no empate

export default calculaPoints;
