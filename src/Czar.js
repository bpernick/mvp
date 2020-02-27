import React from 'react';
import Answer from './Answer'


const Czar = (props) => {
return (<div><div>{`THE CZAR IS ${props.czar}`}</div> <div>{props.renderAnswers && props.answers.map( (answer) => {
 return (<Answer answer={answer} selectAnswer={props.selectAnswer}/>)
 })}
 </div>
</div>)
}

export default Czar;