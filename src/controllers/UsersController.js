import { sequelize } from "../../database/index.js";
import bcrypt from "bcryptjs";
const UserModel = sequelize.model('User');

export const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await UserModel.findOne({where: { email }});
  const isValidPassword = await bcrypt.compare(password, user?.password);

  if (!user || !isValidPassword) {
    res.status(400).json({ message: 'Invalid email/password pair'});
    return;
  }
  //TODO: Убрать пароль из выдачи
  res.status(200).json(
    {
      id: user.id,
      name: user.name,
      email: user.email,
      updatedAt: user.updatedAt,
      createdAt: user.createdAt
    }
  );
}

export const registration = async (req, res) => {
  const { name, email, password } = req.body;
  
  const userExist = await UserModel.findOne({ where: { email } });
  
  if (userExist) {
    res.status(400).json({ message: `Email "${email}" is busy`});
    return;
  }

  const hashedPassword = await bcrypt.hash(password, 5);
  const user = await UserModel.create({name, email, password: hashedPassword});
  //TODO: Убрать пароль из выдачи
  res.status(201).json(
    {
      id: user.id,
      name: user.name,
      email: user.email,
      updatedAt: user.updatedAt,
      createdAt: user.createdAt,
    }
  );
}