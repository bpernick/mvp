import React from 'react';
import socketIOClient from "socket.io-client";
import Deck from './Deck'
import Score from './Score'
import Czar from './Czar'
import WhiteCards from './WhiteCards'
import axios from 'axios'
const user = prompt('WHAT, is your name?', 'dinglefutz')
const endpoint = `/`
const socket = socketIOClient(endpoint);
export default class App extends React.Component {

    constructor () {
        super ();
        this.state = {answers:[]};
    }
    componentDidMount (){
        //on sign in, get deck and hand
        axios.get(`/init`, {params:{user}})
        .then ((data) => {
            let deck = data.data.deck;
            let hand = data.data.hand;
            let czar = data.data.czar;
            let renderAnswers = czar === user;
            this.setState({deck, hand, czar, renderAnswers})
        })

        socket.on('popCard', (deck) => {
            this.setState({deck})
        })
        socket.on('getAnswers', (answers) => {
            //Example {name: 'Bob' cards: ['cats with wings', 'Donald Trump']}
            console.log(answers);
            this.setState({answers})
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
    render () {
        console.log(user)
        return (<div>
            <>{this.state.deck && <Deck card = {this.state.deck[0]} onClick = {this.drawBlackCard.bind(this)}/>}</>
            <Score/>
            <>{this.state.czar &&<Czar czar = {this.state.czar} answers = {this.state.answers} renderAnswers = {this.state.renderAnswers}/>}</>
            <>{this.state.hand &&<WhiteCards hand = {this.state.hand} submitAnswer = {this.submitAnswer.bind(this)} pick = {this.state.deck[0].pick}/>}</>
        </div>)
    }
}