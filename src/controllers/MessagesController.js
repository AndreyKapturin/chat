import { sequelize } from "../../database/index.js";

export const getAllMessages = async (req, res) => {  
  const messages = await sequelize.model('Message').findAll();
  res.setHeader('Content-Type', 'Application/json');
  res.send(JSON.stringify(messages.map(m => m.text)));
}

export const deleteAllMessages = async (req, res) => {
  await sequelize.model('Message').destroy({ truncate: true });
  res.redirect('/');
}