import React from 'react';


class Answer extends React.Component{
    constructor(props){
        super(props);
    }
    onClick(){
        this.props.selectAnswer(this.props.answer)
    }
    render(){
        return (<div>
            {this.props.answer.cards.map( (card,i) => (<div key = {i} onClick = {this.onClick.bind(this)}>{card}</div>))}
        </div>)
        }
    }

export default Answer;