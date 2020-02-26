import React from 'react';
import socketIOClient from "socket.io-client";
import Deck from './Deck'
import Score from './Score'
import Czar from './Czar'
import WhiteCards from './WhiteCards'
import axios from 'axios'
const user = prompt('WHAT, is your name?', 'dinglefutz')
const endpoint = `/?user=${user}`
const socket = socketIOClient(endpoint);
export default class App extends React.Component {

    constructor () {
        super ();
        this.state = {};
    }
    componentDidMount (){
        //on sign in, get deck and hand
        axios.get('/init')
        .then ((data) => {
            let deck = data.data.deck;
            let hand = data.data.hand;
            let czar = data.data.czar;
            this.setState({deck, hand, czar})
        })

        socket.on('popCard', (deck) => {
            this.setState({deck})
        })
    }
    drawBlackCard (){
        socket.emit('drawBlackCard');
    }
    render () {
        console.log(user)
        return (<div>
            <>{this.state.deck && <Deck card = {this.state.deck[0]} onClick = {this.drawBlackCard.bind(this)}/>}</>
            <Score/>
            <>{this.state.czar &&<Czar czar = {this.state.czar}/>}</>
            <>{this.state.hand &&<WhiteCards hand = {this.state.hand}/>}</>
        </div>)
    }
}