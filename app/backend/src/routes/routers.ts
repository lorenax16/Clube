import { Router } from 'express';
import UserController from '../controllers/userController';
import validation from '../middlewares/validation';
import TeamsController from '../controllers/teamsController';

const routers = Router();
const user = new UserController();
const teams = new TeamsController();

routers.post('/login', validation, user.login);
routers.get('/login/validate', user.validateL);
routers.get('/teams', teams.getAll);
routers.get('/teams/:id', teams.getById);

export default routers;
