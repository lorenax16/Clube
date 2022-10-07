import * as bcrypt from 'bcryptjs';
// import * as jwt from 'jsonwebtoken';
import verifyToken from '../middlewares/auth';
import CustomError from '../Error/CustomError';
import UserModel from '../database/models/users';
import createToken from '../middlewares/token';

// const login = async ({ email, password }: { email: string, password: string }): Promise<string> => {
//   const data = await userModel.findOne({ where: { email, password } });
//   if (!data) throw new Error('usuario não encontrado');
//   const token2 = createToken(data.email);
//   return token2;
// };

// export default { login };
const JWT_SECRET: jwt.Secret = process.env.JWT_SECRET || 'jwt_secret';
const mensagem = 'Incorrect email or password';
export default class UserService {
  private _userModel;
  constructor(userModel = UserModel) {
    this._userModel = userModel;
  }

  async login({ email, password }: { email: string, password: string }) {
    const data = await this._userModel.findOne({ where: { email } });
    if (!data) throw new CustomError(401, mensagem);

    const senha = bcrypt.compareSync(password, data.password);
    if (!senha) throw new CustomError(401, mensagem);

    const token2 = createToken(data.email);
    return token2;
  }

  async validateL(authorization: string) {
    // console.log(authorization, 'autorization');
    // console.log(JWT_SECRET, 'jwtSe');
    // a funcão verifytoken ja faz p jwt.verify eu so importo para fazer a validação do token
    verifyToken(authorization);
    // const validate = jwt.verify(authorization, JWT_SECRET);
    const result = await this._userModel.findOne({ where: { email: validate } });
    return result?.role;
  }
}
