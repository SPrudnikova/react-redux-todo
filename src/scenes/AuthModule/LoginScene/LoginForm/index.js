import React from 'react';
import {Field, reduxForm} from "redux-form";

import {loginUser} from "actions";
import {connect} from "react-redux";
import Input from "components/Input";

const validate = values => {
  const errors = {};
  if (!values.username) {
    errors.username = 'Required'
  } else if (values.username.length > 15) {
    errors.username = 'Must be 15 characters or less'
  }
  if (!values.password) {
    errors.password = 'Required'
  }
  return errors
};

const LoginForm = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <div>
        <label htmlFor="username">First Name</label>
        <Field name="username" component={Input} placeholder="Username"/>
      </div>
      <div>
        <label htmlFor="password">Last Name</label>
        <Field name="password" component={Input} placeholder="Password"/>
      </div>
      <button type="submit">Submit</button>
    </form>
  )
};

const LoginFormWithRedux = reduxForm({
  form: 'login',
  validate
})(LoginForm);


const LoginFormContainer = (props) => {
  const submit = (values) => {
    props.loginUser(values);
  };

  return <LoginFormWithRedux  onSubmit={submit}/>
};

export default connect(null, {loginUser})(LoginFormContainer);