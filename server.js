const express = require ('express');
const app = express ();
const server = require('http').Server(app);
const path = require('path');
const io = require('socket.io')(server);
const port = 80;
server.listen(port, console.log(`socket server listening on port ${port}`));

app.use(express.static(path.join(__dirname, client, dist)))

io.on('connection', function (socket) {
  socket.emit('news', { hello: 'world' });
  socket.on('my other event', function (data) {
    console.log(data);
  });
});