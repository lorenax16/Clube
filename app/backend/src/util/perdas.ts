import Matches from '../database/models/matches';

const TotalVitorias = (resultMatche: Matches []) => {
  let pontos = 0;
  resultMatche.forEach((it) => {
    if (it.homeTeamGoals < it.awayTeamGoals) pontos += 1;
  });
  return pontos;
};
// Perdas totais

export default TotalVitorias;
