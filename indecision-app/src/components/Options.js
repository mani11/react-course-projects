import React from 'react';
import Option from './Option';
const Options = (props) => {
  return (

    <div>
    <div className="widget-header">
      <h3 className="widget-header-title">Your Options</h3>
      <button className="button button-link"
        onClick={props.handleDeleteOptions}>Remove All</button>
    </div>
      <ol>
        {
          props.options.map((option,index) => {
            return <Option handleRemoveOption={props.handleRemoveOption} key={option} optionText={option} count={index+1}></Option>;
          })
        }
      </ol>
    
    </div>

  );

}

export default Options;
