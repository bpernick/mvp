import React from 'react';
import Answer from './Answer'


const Czar = (props) => {
return (<div className = 'czar'><div className = 'inner-czar'><div>{`Playing as ${props.user}`}</div><div>{`The Czar is ${props.czar}`}</div></div> <div className ={`answers`}>{props.renderAnswers && props.answers.map( (answer) => {
 return (<Answer answer={answer} selectAnswer={props.selectAnswer}/>)
 })}
 </div>
</div>)
}

export default Czar;