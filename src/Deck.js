import React from 'react';

const Deck = (props) => {
return (<div className = 'deck' onClick = {props.onClick}>{`${props.card.text}`}<div className = 'pick'>{`pick ${props.card.pick}`}</div></div>)
}

export default Deck;