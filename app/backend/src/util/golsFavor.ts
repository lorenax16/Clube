import Matches from '../database/models/matches';

const goalsFavor = (resultMatche: Matches []) => {
  let Gols = 0;
  resultMatche.forEach((it) => {
    Gols += it.homeTeamGoals;
  });
  return Gols;
};
// Gols Favor
export default goalsFavor;
