import React from 'react';
import socketIOClient from "socket.io-client";
const endpoint = '/'
export default class App extends React.Component {

    constructor () {
        super ();
    }
    componentDidMount(){
        // const io = socketIOClient(endpoint);
        // io.on('connection', socket => {
        //     socket.emit('hello', "HELLO WORLD");  
        //   });
        // io.on('news', (news) => { console.log(news) });
    }
    onClick(){
        const socket = socketIOClient(endpoint);
        socket.emit('oof', 'OOOOF!!!')
        socket.on ('oofRes', ((res) => {console.log(res)}))
        socket.on ('news', ((res) => {console.log(res)}))
    }
    render () {
        return (<h1 onClick = {this.onClick.bind(this)}>Hello World</h1>)
    }
}