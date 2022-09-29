import { DataTypes, Model, STRING } from 'sequelize';
import db from '.';

export default class User extends Model {
  id!: number;
  username!: string;
  email!: string;
  password!: string;
  role!: string;
}

User.init({
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  username: STRING,
  email: STRING,
  password: STRING,
  role: STRING,
}, {
  sequelize: db,
  modelName: 'users',
  timestamps: false,
  createdAt: false,
});
