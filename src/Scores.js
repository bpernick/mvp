import React from 'react';

const Scores = (props) => {
return (<div className = 'scores'>{props.scores.map((score,i) => (<div key ={i}>{`${score[0]} has ${score[1]} points`}</div>))}</div>)
}

export default Scores;