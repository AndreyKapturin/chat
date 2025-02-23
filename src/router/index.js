import express, { Router } from "express";
import path from 'path';
import { getAllMessages, deleteAllMessages } from "../controllers/MessagesController.js";

export const MainRouter = Router();

MainRouter.get('/', (req, res) => {
  res.sendFile(path.resolve('public/index.html'));
})
MainRouter.use(express.static(path.resolve('./public')));

// Messages
const MessagesRouter = Router();

MessagesRouter.get('/', getAllMessages);
MessagesRouter.get('/delete-messages', deleteAllMessages);

MainRouter.use('/messages', MessagesRouter);
