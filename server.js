const express = require ('express');
const app = express ();
const server = require('http').Server(app);
const path = require('path');
const bodyParser = require('body-parser')
const io = require('socket.io')(server);
// const db = require('./database/jsonCards');
const getCards = require('./middleware/getCards')
const port = 3000;
server.listen(port, console.log(`socket server listening on port ${port}`));

app.use(express.static(path.join(__dirname, 'dist')))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

//Global state
let games = 0;
let online = {};

//Game states
let state = {}


app.get('/init', (req,res) =>{
  console.log(req.query)
  let game = req.query.game;
  let data ={};
  data.deck = state[game].deck;
  data.hand = getCards.getWhiteCards(8);
  data.czar = state[game].players[state[game].czarIndex];
  data.scores = state[game].scores;
  res.send(data)
})

app.get('/whiteCards', (req, res) =>{
  let num = req.query.num;
  res.send(getCards.getWhiteCards(num))
})


io.on('connection', function (socket) {

socket.emit('resOnline', online)

socket.on('online', (name) => {
  online[name] = socket.id;
  io.emit('resOnline', online)
})

socket.on('newgame', (players) => {
  console.log(players)
  games ++;
  let game = games + '';
  let newDeck = getCards.getBlackCards(10);
  state[game] = {
    deck: newDeck,
    players: [...players],
    czarIndex: 0,
    scores:{},
    answers: []
  }

  players.forEach( (player) =>{
    state[game].scores[player] = 0;
  })
  players.forEach((player) => {
    let id = online[player];
    io.to(id).emit('createGame', game)
  })
  players.forEach(player => {
    delete online[player]
  });
  io.emit('resOnline', online)
})
  socket.on('joinRoom', (room) => {
    socket.join(room);
  })
  socket.on('drawBlackCard', (game) => {
    state[game].deck.shift();
    io.to(game).emit('popCard', state[game].deck)
  });
  socket.on('submitAnswer', (answer) => {
    let game = answer.game;
    state[game].answers.push(answer);
    io.to(game).emit('getAnswers', state[game].answers)
  }); 
  socket.on('selectAnswer', (data) => {
    let game = data.game;
    state[game].answers = [];
    let question = state[game].deck[0].text;
    let answer = data.cards;
    let winner = data.name;

    state[game].scores[winner] += 1;
    state[game].deck.shift();
    state[game].czarIndex = (state[game].czarIndex + 1) % state[game].players.length;
    let czar = state[game].players[state[game].czarIndex];
    let response = {answer, winner, question, czar, deck:state[game].deck, scores: state[game].scores}
    io.to(game).emit(`winner`, response)
  });
});
