import express, { Router } from "express";
import path from 'path';
import { getAllMessages, deleteAllMessages } from "../controllers/MessagesController.js";
import { loginValidate, registrationValidate } from "../middlewares/validation.js";
import { login, registration } from "../controllers/UsersController.js";
import { ValidationError } from "express-validation";

export const MainRouter = Router();

MainRouter.get('/', (req, res) => {
  res.sendFile(path.resolve('public/index.html'));
})
MainRouter.use(express.static(path.resolve('./public')));

// Messages
const MessagesRouter = Router();

MessagesRouter.get('/', getAllMessages);
MessagesRouter.get('/delete-messages', deleteAllMessages);

// Users
const UsersRouter = Router();

UsersRouter.post('/login', loginValidate, login);
UsersRouter.post('/registration', registrationValidate, registration);
UsersRouter.use((err, req, res, next) => {
  if (err instanceof ValidationError) {
    return res.status(err.statusCode).json(err)
  }

  return res.status(500).json(err)
})

MainRouter.use('/messages', MessagesRouter);
MainRouter.use('/users', UsersRouter);
