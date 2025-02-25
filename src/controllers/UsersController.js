import { sequelize } from "../../database/index.js";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';
import { ACCESS_TOKEN_LIFETIME_IN_SECOND, REFRESH_TOKEN_LIFETIME_IN_SECOND, SECRET_KEY } from "../../config/index.js";

const UserModel = sequelize.model('User');

export const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await UserModel.findOne({where: { email }});
  const isValidPassword = await bcrypt.compare(password, user?.password ?? '');

  if (!user || !isValidPassword) {
    res.status(400).json({ message: 'Invalid email/password pair'});
    return;
  }

  const payload = {
    id: user.id
  }

  const accessToken = jwt.sign(payload, SECRET_KEY, { expiresIn: ACCESS_TOKEN_LIFETIME_IN_SECOND })
  const refreshToken = jwt.sign(payload, SECRET_KEY, { expiresIn: REFRESH_TOKEN_LIFETIME_IN_SECOND })

  res.cookie('accessToken', accessToken, {
    maxAge: 1000 * ACCESS_TOKEN_LIFETIME_IN_SECOND,
    secure: true,
    httpOnly: true
});
  res.cookie('refreshToken', refreshToken, {
    maxAge: 1000 * REFRESH_TOKEN_LIFETIME_IN_SECOND,
    secure: true,
    httpOnly: true
});

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