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
        this.state = {}
    }
    handleNameInput(user){
        this.setState({user});
        axios.post('/online', {user})
    }
    render (){
        return this.state.game ? (<App game ={this.state.game}/>):(<Homepage handleNameInput = {this.handleNameInput.bind(this)}/>);
    }
}