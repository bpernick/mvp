import React from 'react';
import Answer from './Answer'


const Czar = (props) => {
return (<div className = 'czar'><div className = 'inner-czar'><div>{`THE CZAR IS ${props.czar}`}</div> <div>{props.renderAnswers && props.answers.map( (answer) => {
 return (<Answer answer={answer} selectAnswer={props.selectAnswer}/>)
 })}
 </div>
 </div>
</div>)
}

export default Czar;