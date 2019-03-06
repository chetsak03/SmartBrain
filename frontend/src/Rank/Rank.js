import React from 'react';

const Rank = ({name, entries}) => {
  return (
  	
    <div className = 'white f3'>{`${name},your entry count is `}
    	<div className = 'f2'>{entries}</div>
    </div>
    
  
  )
}

export default Rank;