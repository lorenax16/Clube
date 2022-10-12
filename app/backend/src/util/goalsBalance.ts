import Matches from '../database/models/matches';
import goalsFavor from './golsFavor';
import goalsOwn from './goalsOwn';

const goalsBalance = (resultMatche: Matches []) => {
  const favor = goalsFavor(resultMatche);
  const contra = goalsOwn(resultMatche);

  const result = favor - contra;
  return result;
};

export default goalsBalance;
// saldo de gols..quantidade de gols que o time ficou