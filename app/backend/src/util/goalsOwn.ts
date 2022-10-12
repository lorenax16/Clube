import Matches from '../database/models/matches';

const goalsOwn = (resultMatche: Matches []) => {
  let Gols = 0;
  resultMatche.forEach((it) => {
    Gols += it.awayTeamGoals;
  });
  return Gols;
};
// Gols contra
export default goalsOwn;
