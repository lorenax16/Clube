import Matches from '../database/models/matches';
import calculaPoints from './calculaPoint';

const efficiencyFuncao = (resultMatche: Matches []) => {
  const jogos = resultMatche.length;
  const pontos = calculaPoints(resultMatche);
  const result = (pontos / (jogos * 3)) * 100;
  return result.toFixed(2);
};
// porcentual de aproveitamento.
export default efficiencyFuncao;
