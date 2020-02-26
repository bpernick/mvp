import React from 'react';

const Deck = (props) => {
return (<div onClick = {props.onClick}>{`${props.card.text} pick ${props.card.pick}`}</div>)
}

export default Deck;