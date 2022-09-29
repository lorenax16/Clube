import { RequestHandler } from 'express';
import Users from '../types/user';
import UserService from '../services/userService';

export default class UserController {
  constructor(private service = new UserService()) {}

  login: RequestHandler = async (req, res) => {
    const { email, password } = req.body as Users;
    const UserCreated = await this.service.login({ email, password });
    return res.status(200).json({ token: UserCreated });
  };
}

// export default { login, getAll };

//  import { Request, Response } from "express";
// import UserService from "../services/userService";
// import { ParamsDictionary } from 'express-serve-static-core';
// import { ParsedQs } from 'qs';

// interface IUserController {
//   create(req: Request, res: Response): Promise<Response>
// };

// export default class UserController implements IUserController {
//   // private service: UserService
//   // constructor(service: UserService) {
//   //   this.service = service
//   // }
//   constructor(private service: UserService) { }

//   async create(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>): Promise<Response<any, Record<string, any>>> {

//   }

//   async findAll(req: Request, res: Response): Promise<Response> {
//     const users = await this.service.findAll()
//     return res.status(200).json(users)
//   }

//   async findById(req: Request, res: Response): Promise<Response> {
//     const id = Number(req.params.id)
//     const user = await this.service.findById(id)
//     return res.status(200).json(user)
//   }
