import { Router } from 'express';
import UserController from '../controllers/userController';

const routers = Router();
const controller = new UserController();

routers.post('/login', controller.login);

export default routers;
