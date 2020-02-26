const express = require ('express');
const app = express ();
const server = require('http').Server(app);
const path = require('path');
const io = require('socket.io')(server);
const db = require('./database/jsonCards');
const getCards = require('./middleware/getCards')
const port = 3000;
server.listen(port, console.log(`socket server listening on port ${port}`));

//Game State TODO: move
let deck = [];
let players = [];
let czarIndex = 0;


app.use(express.static(path.join(__dirname, 'dist')))

app.get('/init', (req,res) =>{
  console.log('getting deck and hand')

  let data = {}
  if (!deck.length){
    deck = (getCards.getBlackCards(90))
  }
  data.deck = deck;
  data.hand = getCards.getWhiteCards(10);
  data.czar = players[czarIndex];
  res.send(data)
})

io.on('connection', function (socket) {
  if (socket.handshake.query.user){
    if (!players.includes(socket.handshake.query.user))
    players.push(socket.handshake.query.user)
  }
  console.log(players)
  socket.on('drawBlackCard', () => {
    deck.shift();
    io.emit('popCard', deck)
  });
});
