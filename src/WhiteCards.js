import React from 'react';

const WhiteCards = (props) => {
return (<div>{props.hand.map((card, i) => (<div key ={i}>{card}</div>))}</div>)
}

export default WhiteCards;