const express = require ('express');
const app = express ();
const server = require('http').Server(app);
const path = require('path');
const io = require('socket.io')(server);
// const db = require('./database/jsonCards');
const getCards = require('./middleware/getCards')
const port = 3000;
server.listen(port, console.log(`socket server listening on port ${port}`));

//Game State TODO: move
let deck = [];
let players = [];
let czarIndex = 0;
let scores = {};
let answers = [];
app.use(express.static(path.join(__dirname, 'dist')))

app.get('/init', (req,res) =>{
  console.log(req.query)
  if (req.query.user){
    if (!players.includes(req.query.user))
    players.push(req.query.user);
    scores[req.query.user] = 0;
  }
  console.log(players)

  let data = {}
  if (!deck.length){
    deck = (getCards.getBlackCards(90))
  }
  data.deck = deck;
  data.hand = getCards.getWhiteCards(10);
  data.czar = players[czarIndex];
  data.scores = scores;
  res.send(data)
})

app.get('/whiteCards', (req, res) =>{
  let num = req.query.num;
  res.send(getCards.getWhiteCards(num))
})


io.on('connection', function (socket) {
  socket.on('drawBlackCard', () => {
    deck.shift();
    io.emit('popCard', deck)
  });
  socket.on('submitAnswer', (answer) => {
    answers.push(answer);
    io.emit('getAnswers', answers)
  });
  socket.on('selectAnswer', (data) => {
    let question = deck[0].text;
    let answer = data.cards
    let winner = data.name
    scores[winner] += 1;
    deck.shift();
    czarIndex = (czarIndex + 1) % players.length;
    let czar = players[czarIndex];
    answers = [];
    let response = {answer, winner, question, czar, deck, scores}
    io.emit(`winner`, response)
  });
});
