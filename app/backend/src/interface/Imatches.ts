import matche from './matche';

interface IMatches extends matche {
  id?: number,
  homeTeam: number,
  awayTeam: number,
  inProgress?: boolean,
}

export default IMatches;
