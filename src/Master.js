import React from 'react';
import App from './App';
import Homepage from './Homepage';
import axios from 'axios'
import socketIOClient from "socket.io-client";
const endpoint = `/`
const socket = socketIOClient(endpoint);

export default class Master extends React.Component{
    constructor(){
        super();
        this.state = {
            online:[`Log in to see who's online!`],
            selected:[]
        }
    }
    componentDidMount (){
        socket.on('createGame', (game) => {
            console.log('make game')
            this.setState({game})
        })
        socket.on('resOnline', (online) => {
            this.setState({online:Object.keys(online)})
        })
        socket.on('offline', (player) =>{
            let online = this.state.online.filter((user) =>{user !== player})
            let selected = this.state.selected.filter((user) =>{user !== player})
            console.log('reset', selected, online)
            this.setState({selected, online})
        })
    }

    handleNameInput(user){
        this.setState({user});
        socket.emit('online', user)
        // axios.post('/online', {user})
        // .then((data) => {
        //     console.log("online", data.data)
        //     this.setState({online: Object.keys(data.data)})
        // })
    }
    choosePlayer(e){
        // console.log('I choose', e.target.innerText)
        let selected = this.state.selected;
        selected.push(e.target.innerText);
        this.setState({selected})
    }
    newGame(){
        let players= this.state.selected;
        
        socket.emit('newgame', players)

        // axios.post('/newgame', {players})
        // .then((data) =>{
        //     let {game} = data.data;
        //     this.setState({game})
        // })
    }
    render (){
        return this.state.game ? (<App game ={this.state.game} user ={this.state.user}/>):(<Homepage newGame = {this.newGame.bind(this)} choosePlayer = {this.choosePlayer.bind(this)} handleNameInput = {this.handleNameInput.bind(this)} online = {this.state.online} selected = {this.state.selected}/>);
    }
}