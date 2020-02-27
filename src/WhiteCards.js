import React from 'react';

export default class WhiteCards extends React.Component{
    constructor (props){
        super(props)
        this.state = {selected:[]}
    }
    onClick (e){
        let selected = this.state.selected
        selected.push(e.target.innerText)
        if (selected.length === this.props.pick){
            this.props.submitAnswer(selected);
            this.setState({selected:[]})
        }else{
            this.setState({selected})
        }
    }
    render (){
        return (<div>{this.props.hand.map((card, i) => (<div key ={i} onClick ={this.onClick.bind(this)}>{card}</div>))}</div>)
    }
}
