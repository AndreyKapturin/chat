import { Sequelize, DataTypes } from 'sequelize';
import path from 'path';

const PATH_TO_DB = path.resolve('database/database.sqlite');

export const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: PATH_TO_DB
});

sequelize.define(
  'Message', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    text: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  }
)

sequelize.sync();
