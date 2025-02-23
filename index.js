import express from 'express';
import { WebSocketServer } from 'ws';
import http from 'http';
import { sequelize } from './database/index.js';
import { corsMiddleware } from './src/middlewares/cors.js';
import { MainRouter } from './src/router/index.js';

const PORT = process.env.PORT ?? 3000;
const app = express();
const server = http.createServer(app);
const wss = new WebSocketServer({ server });

app.use(corsMiddleware);
app.use(express.json());
app.use(MainRouter);

wss.on('connection', async (socket) => {
  socket.on('message', async (data) => {
    const message = data.toString();
    const savedMessage = await sequelize.model('Message').create({ text: message });
    wss.clients.forEach( c => c.send(savedMessage.text));
  })
});

server.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})