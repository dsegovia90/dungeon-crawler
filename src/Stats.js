import React from 'react';

function Stats(props){
  return(
    <div>
      <div className='stats-div'>
        <h3 className='stats'>HP: {props.hp}/{props.maxHp}</h3>
        <h3 className='stats'>Attack: {props.attack}</h3>
        <h3 className='stats'>Lvl: {props.level}</h3>
        <h3 className='stats'>Floor: {props.floor}</h3>
      </div>
      <br />
    </div>
  )
}

export default Stats