import React from 'react';


const Answer = (props) => {
return (<div>
    {props.answer.cards.map( (card,i) => (<div key = {i}>{card}</div>))}</div>)
}
export default Answer;