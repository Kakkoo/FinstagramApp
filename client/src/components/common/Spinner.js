import React from 'react';
import spinner from './spinner.gif';

const Spinner = function(){
  return (
    <div className="align-item-center mt-5">
      <div className="mx-auto text-secondary" style={{fontFamily: 'Abel', fontSize: '2em', textAlign: 'center'}}>Loading</div>
    
      <img
        src={spinner}
        style={{ width: '80px', margin: 'auto', display: 'block' }}
        alt="Loading..."
      />
      </div>
      
  );
};
export default Spinner;