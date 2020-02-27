import React from 'react';
import App from './App';
import Homepage from './Homepage';
import axios from 'axios'
import socketIOClient from "socket.io-client";
const endpoint = `/`
const socket = socketIOClient(endpoint);

//game
//online
//added to game
//user
export default class Master extends React.Component{
    constructor(){
        super();
        this.state = {
            online:[`Log in to see who's online!`],
            selected:[]
        }
    }
    handleNameInput(user){
        this.setState({user});
        axios.post('/online', {user})
        .then((data) => {
            console.log("online", data.data)
            this.setState({online: Object.keys(data.data)})
        })
    }
    choosePlayer(e){
        // console.log('I choose', e.target.innerText)
        let selected = this.state.selected;
        selected.push(e.target.innerText);
        this.setState({selected})
    }
    newGame(){
        let players= this.state.selected;
        console.log('players', players)
        axios.post('/newgame', {players})
        .then((data) =>{
            let {game} = data.data;
            this.setState({game})
        })
    }
    render (){
        return this.state.game ? (<App game ={this.state.game}/>):(<Homepage newGame = {this.newGame.bind(this)} choosePlayer = {this.choosePlayer.bind(this)} handleNameInput = {this.handleNameInput.bind(this)} online = {this.state.online} selected = {this.state.selected}/>);
    }
}