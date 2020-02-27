import React from 'react';
import axios from 'axios';

export default class Homepage extends React.Component{
    constructor(){
        super();
        this.state = {user: ''}
    }
    onChange(e){
        this.setState({user: e.target.value})
        console.log('times are changing')
    }
    onClick(){
        console.log('user', this.state.user)
        this.props.handleNameInput(this.state.user);
        this.setState({user: ''})
    }
        
    render (){
        return (<div>
            <h2>Cards Against Huge Manatees</h2>
            <label>my name:</label>
            <input value ={this.state.user} onChange = {this.onChange.bind(this)}></input>
            <button onClick = {this.onClick.bind(this)}></button>
            {/* <div><h4>Online</h4>
                <div>{this.props.online.map((name, i) => (<div key={i}>{name}</div>))}
                </div>
            </div>
            <div><h4>Create Game</h4>
                <div>{this.props.selected.map((name, i) => (<div key={i}>{name}</div>))}
                </div>
                <button onClick = {this.newGame.bind(this)}>New Game!</button>
            </div> */}
        </div>)
    }
}