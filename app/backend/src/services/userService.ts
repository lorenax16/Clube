import UserModel from '../database/models/users';
import createToken from '../middlewares/token';

// const login = async ({ email, password }: { email: string, password: string }): Promise<string> => {
//   const data = await userModel.findOne({ where: { email, password } });
//   if (!data) throw new Error('usuario não encontrado');
//   const token2 = createToken(data.email);
//   return token2;
// };

// export default { login };

export default class UserService {
  private _userModel;
  constructor(userModel = UserModel) {
    this._userModel = userModel;
  }

  async login({ email, password }: { email: string, password: string }) {
    const data = await this._userModel.findOne({ where: { email, password } });
    if (!data) throw new Error('usuario não encontrado');
    const token2 = createToken(data.email);
    return token2;
  }
}

// import User from '../database/models';

// interface IUserService {
//   create(): Promise<User>
// }

// export default class UserService implements IUserService {
//   private db = User

//   async create(): Promise<User> {
//     await this.db.create();
//   }

// async findAll(): Promise<User[]> {
//   const users = await this.db.findAll();
//   return users;
// }

// async findById(id: number): Promise<User> {
//   const user = await this.db.findByPk(id)
//   return user as User;
// }
