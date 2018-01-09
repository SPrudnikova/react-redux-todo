import React from 'react';
import "components/FormElements/InputWithLabel/index.scss";
import FontAwesome from 'react-fontawesome';
import VerticalDivider from 'components/VerticalDivider';

const Input = ({input, label, type, meta: {touched, error}}) => {
  const isError = touched && error;

  const renderError = () => {
    return (
      <p className="error-text font-small">
        <FontAwesome
          name="exclamation-circle"
          className="error-icon"
        />
        {error}
      </p>
    )
  };

  return (
    <div className="input-with-label">
      <label>{label}</label>
      <VerticalDivider height="3px"/>
      <div>
        <input {...input} placeholder={label} type={type} className={isError ? "error-input" : ""}/>
        {isError && renderError()}
      </div>
    </div>
  )
};

export default Input;
