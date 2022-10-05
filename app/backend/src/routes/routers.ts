import { Router } from 'express';
import UserController from '../controllers/userController';
import validation from '../middlewares/validation';
import TeamsController from '../controllers/teamsController';
import MatchesController from '../controllers/matchesController';

const routers = Router();
const user = new UserController();
const teams = new TeamsController();
const matches = new MatchesController();

routers.post('/login', validation, user.login);
routers.get('/login/validate', user.validateL);
routers.get('/teams', teams.getAll);
routers.get('/teams/:id', teams.getById);
routers.get('/matches', matches.getAll);

export default routers;
