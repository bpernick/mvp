import React from 'react';
import socketIOClient from "socket.io-client";
const endpoint = '/'
const socket = socketIOClient(endpoint);
export default class App extends React.Component {

    constructor () {
        super ();
    }
    componentDidMount (){
        socket.on ('oofRes', ((res) => {console.log(res)}))
        socket.on ('news', ((res) => {console.log(res)}))
    }
    onClick(){
        socket.emit('getBlackCards', 'oof')
    }
    render () {
        return (<h1 onClick = {this.onClick.bind(this)}>Hello World</h1>)
    }
}