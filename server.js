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
let online = [];

//Game states
let state = {};


// let deck = [];
// let players = [];
// let czarIndex = 0;
// let scores = {};
// let answers = [];

app.post('/online', (req, res) => {
  console.log('online',req.body.user);
  online.push(req.body.user)
  res.end();
})

app.post('/gameNum', (req, res)=>{
  games ++;
  let newDeck = getCards.getBlackCards(90);
  state[games] = {
    deck: newDeck,
    players: [...req.body.players],
    czarIndex: 0,
    scores:{},
    answers: []
  }
  res.send(games)
})

app.get('/init', (req,res) =>{
  console.log(req.query)
  let game = req.query.game;
  let data ={};
  data.deck = state[game].deck;
  data.hand = getCards.getWhiteCards(8);
  data.czar = state[game].players[czarIndex];
  data.scores = state[game].scores;
  res.send(data)
})

app.get('/whiteCards', (req, res) =>{
  let num = req.query.num;
  res.send(getCards.getWhiteCards(num))
})


io.on('connection', function (socket) {
  socket.on('drawBlackCard', () => {
    console.log('draw card', socket.handshake.query)
    let game = socket.handshake.query.game;
    state[game].deck.shift();
    io.emit('popCard', state[game].deck)
  });
  socket.on('submitAnswer', (answer) => {
    let game = socket.handshake.query.game;
    state[game].answers.push(answer);
    io.emit('getAnswers', state[game].answers)
  });
  socket.on('selectAnswer', (data) => {
    let game = socket.handshake.query.game;
    state[game].answers = [];
    let question = deck[0].text;
    let answer = data.cards
    let winner = data.name

    state[game].scores[winner] += 1;
    state[game].deck.shift();
    state[game].czarIndex = (state[game].czarIndex + 1) % state[game].players.length;
    let czar = state[game].players[state[game].czarIndex];
    let response = {answer, winner, question, czar, deck:state[game].deck, scores: state[game].scores}
    io.emit(`winner`, response)
  });
});
