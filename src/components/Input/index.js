import React from 'react';

const Input = (props) => {
  return (
    <div>
      <input type='text' placeholder={props.placeholder} onChange={props.input.onChange} onBlur={props.input.onBlur}/>
      {props.meta.touched && props.meta.error && <span>{props.meta.error}</span>}
    </div>
  )
};

export default Input;
