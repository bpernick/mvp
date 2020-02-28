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
        return (<div className = 'homepage'>
            <h1>Cards Against Huge Manatees</h1>
            <>{!this.props.user && <><label>WHAT is your name?</label>
            <input value ={this.state.user} onChange = {this.onChange.bind(this)}></input>
            <button onClick = {this.onClick.bind(this)}>Submit</button></>}</>
            <div><h4>Online Now:</h4>
                <div>{this.props.online.map((name, i) => (<div onClick = {this.props.choosePlayer} key={i}>{name}</div>))}
                </div>
            </div>
            <div><h4>My Invites:</h4>
                <div>{this.props.selected.map((name, i) => (<div key={i}>{name}</div>))}
                </div>
                <button className = 'new-game' onClick = {this.props.newGame}>New Game!</button>
            </div>
        </div>)
    }
}