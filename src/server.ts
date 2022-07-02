import * as express from 'express';
import * as path from 'path';
const app = express();

import * as http from 'http';
const server = http.createServer(app);
import { Server } from 'socket.io';
import RedisCli from './redis';
const redis = RedisCli.getInstance();
const io = new Server(server);

app.get('/', (_req, res) => {
  const pathResolved = path.resolve(__dirname + '/../public/index.html');
  return res.sendFile(pathResolved);
});

io.on('connection', async (socket) => {
  const candidates = await redis.getJSON('candidates');
  const votes = await redis.getJSON('votes');
  socket.emit('candidates', candidates);
  socket.emit('votes', votes);
});

const port = process.env.PORT || 9001;
server.listen(port, () => {
  console.log(`Aplicação - Ativa :D | ${port}`);
});

export const socketIo = io;