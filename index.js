import express from 'express';
import { Server } from 'socket.io';
import http from 'http';
import path from 'path';
import { addMessage, getMessages, deleteMessage } from './storage.js';

const PORT = process.env.PORT;
const app = express();
const server = http.createServer(app);
const io = new Server(server);

const CORS_WHITE_LIST = ['http://89.111.170.6', 'https://89.111.170.6'];

app.use((req, res, next) => {
  const requestOrigin = req.headers.origin;

  if (CORS_WHITE_LIST.includes(requestOrigin)) {
    res.setHeader('Access-Control-Allow-Origin', requestOrigin)
  }
  next();
})

io.on('connection', async (socket) => {
  socket.on('send message', async (message) => {
    await addMessage(message);
    io.emit('send message', message);
  })
});


app.get('/', (req, res) => {
  res.sendFile(path.resolve('./public/index.html'));
})

app.get('/messages', async (req, res) => {
  const messages = await getMessages();
  res.setHeader('Content-Type', 'Application/json');
  res.send(JSON.stringify(messages));
})

app.get('/delete-messages', async (req, res) => {
  await deleteMessage();
  res.redirect('/');
})

app.use(express.static('public'));

server.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})