const express = require ('express');
const app = express ();
const server = require('http').Server(app);
const path = require('path');
const io = require('socket.io')(server);
const db = require('./database/jsonCards')
const port = 3000;
server.listen(port, console.log(`socket server listening on port ${port}`));

app.use(express.static(path.join(__dirname, 'dist')))

io.on('connection', function (socket) {
  console.log('IO!!!')
  socket.emit('news', { hello: 'world' });
  socket.on('getBlackCards', function (data) {
    console.log('get')
    io.emit('oofRes',db.blackCards.slice(0,10))
  });
});
