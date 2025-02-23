import express from 'express';
import { WebSocketServer } from 'ws';
import http from 'http';
import path from 'path';
import { sequelize } from './database/index.js';

const PORT = process.env.PORT;
const app = express();
const server = http.createServer(app);
const wss = new WebSocketServer({ server });

const CORS_WHITE_LIST = ['http://89.111.170.6', 'https://89.111.170.6', 'http://localhost:3000'];
 
app.use((req, res, next) => {
  const requestOrigin = req.headers.origin;
  
  if (CORS_WHITE_LIST.includes(requestOrigin)) {
    res.setHeader('Access-Control-Allow-Origin', requestOrigin)
  }

  next();
})

app.use(express.json());

wss.on('connection', async (socket) => {
  socket.on('message', async (data) => {
    var message = data.toString();
    const savedMessage = await sequelize.model('Message').create({ text: message });
    wss.clients.forEach( c => c.send(savedMessage.text));
  })
});

app.get('/', (req, res) => {
  res.sendFile(path.resolve('./public/index.html'));
})

app.get('/messages', async (req, res) => {
  const messages = await sequelize.model('Message').findAll();
  res.setHeader('Content-Type', 'Application/json');
  res.send(JSON.stringify(messages.map(m => m.text)));
})

app.get('/delete-messages', async (req, res) => {
  await sequelize.model('Message').destroy({ truncate: true });
  res.redirect('/');
})

app.use(express.static('public'));

server.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})