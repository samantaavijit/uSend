const io = require('socket.io')(8050,{
    cors: {
      origin: '*',
    }
  });

const user = {};
io.on('connection', socket => {
    socket.on('new-user-joined', name => {
        console.log("userName", name);
        user[socket.id] = name;
        socket.broadcast.emit('user-joined', name);
    });
    socket.on('send', message => {
        socket.broadcast.emit('receive', { message: message, user: user[socket.id] });
    });
});