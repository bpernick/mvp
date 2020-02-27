import React from 'react';
import socketIOClient from "socket.io-client";
import Deck from './Deck'
import Scores from './Scores'
import Czar from './Czar'
import WhiteCards from './WhiteCards'
import axios from 'axios'
const user = prompt('WHAT, is your name?', 'dinglefutz')
const endpoint = `/`
const socket = socketIOClient(endpoint);
export default class App extends React.Component {

    constructor () {
        super ();
        this.state = {answers:[], scores:{}};
    }
    componentDidMount (){
        //on sign in, get deck and hand
        axios.get(`/init`, {params:{user}})
        .then ((data) => {
            let deck = data.data.deck;
            let hand = data.data.hand;
            let czar = data.data.czar;
            let scores = data.data.scores;
            let renderAnswers = czar === user;
            this.setState({deck, hand, czar, renderAnswers, scores})
        })

        socket.on('popCard', (deck) => {
            this.setState({deck})
        })
        socket.on('getAnswers', (answers) => {
            //Example {name: 'Bob' cards: ['cats with wings', 'Donald Trump']}
            console.log(answers);
            this.setState({answers})
        })
        socket.on('winner', (response) => {
            let answers = [];
            let scores = response.scores;
            let czar = response.czar;
            let renderAnswers = czar === user;
            let deck = response.deck
            alert(`The winner is ${response.winner}! \n ${response.question} \n ${response.answer[0]}`)
            console.log('getting new cards')
            axios.get('/whiteCards', {params:{num: this.state.deck[0].pick}})
            .then((data) =>{
                let cards = data.data
                console.log('got new cards', cards)
                let hand = this.state.hand;
                hand = hand.concat(cards);
                this.setState({answers, renderAnswers, czar, deck, hand, scores})
            })
            .catch((err)=>{console.error(err)})
         })
        }

    drawBlackCard (){
        socket.emit('drawBlackCard');
    }
    submitAnswer(cards){
        let hand = this.state.hand
        hand = hand.filter((card) => !(cards.includes(card)))
        this.setState({hand})
        socket.emit('submitAnswer', {cards, user}) 
    }
    selectAnswer(answer){
        let name = answer.user
        let cards = answer.cards
        console.log('answer', answer)
        let winner = {cards, name}
        socket.emit('selectAnswer', winner);
    }
    render () {
        console.log(user)
        return (<div className = 'outer'><div className = 'game-board'>
            <>{this.state.deck && <Deck card = {this.state.deck[0]} onClick = {this.drawBlackCard.bind(this)}/>}</>
            <>{this.state.czar &&<Czar czar = {this.state.czar} answers = {this.state.answers} renderAnswers = {this.state.renderAnswers} selectAnswer={this.selectAnswer.bind(this)}/>}</>
            <Scores scores= {Object.entries(this.state.scores)}/>
            <>{this.state.hand &&<WhiteCards hand = {this.state.hand} submitAnswer = {this.submitAnswer.bind(this)} pick = {this.state.deck[0].pick}/>}</>
        </div></div>)
    }
}