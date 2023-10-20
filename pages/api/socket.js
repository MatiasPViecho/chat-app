import { Server } from 'socket.io';
export default function socketHandler(req, res) {
  const io = new Server(res.socket.server);
  res.socket.server.io = io;

  io.on('connection', (socket) => {
    socket.on('send-message', (obj) => {
      io.emit('recieve-message', obj);
    });
  });

  console.log('Setting socket');
  res.end();
}
