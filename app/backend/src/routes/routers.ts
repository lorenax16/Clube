import { Router } from 'express';
import UserController from '../controllers/userController';
import validation from '../middlewares/validationUser';
import TeamsController from '../controllers/teamsController';
import MatchesController from '../controllers/matchesController';
import validationMatches from '../middlewares/validationMatches';
import LeaderboardController from '../controllers/leaderboardController';

const routers = Router();
const user = new UserController();
const teams = new TeamsController();
const matches = new MatchesController();
const leaderboardHome = new LeaderboardController();

routers.post('/login', validation, user.login);
routers.get('/login/validate', user.validateL);
routers.get('/teams', teams.getAll);
routers.get('/teams/:id', teams.getById);
routers.get('/matches', matches.getAll);
routers.post('/matches', validationMatches, matches.create);
routers.patch('/matches/:id/finish', matches.update);
routers.patch('/matches/:id', matches.updateId);
routers.get('/leaderboard/home', leaderboardHome.getAll);

export default routers;
