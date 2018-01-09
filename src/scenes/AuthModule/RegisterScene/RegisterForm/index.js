import React from 'react';
import {Field, reduxForm} from "redux-form";

import {registerUser} from "actions";
import {connect} from "react-redux";
import InputWithLabel from "components/FormElements/InputWithLabel";
import {required, minLength} from "helpers/validationRules";
import VerticalDivider from "components/VerticalDivider";
import "scenes/AuthModule/RegisterScene/RegisterForm/index.scss"

const RegisterForm = (props) => {
  return (
    <form onSubmit={props.handleSubmit} className="register-scene_form">
      <Field name="username" type="text"
             component={InputWithLabel} label="Username"
             validate={[required(), minLength(3)]}
      />
      <VerticalDivider />
      <Field name="password" type="text"
             component={InputWithLabel} label="Password"
             validate={[required(), minLength(3)]}
      />

      <VerticalDivider />
      <button className="btn btn-primary btn-fluid font-uppercase"
              disabled={props.isLoading}
              type="submit">
        Register
      </button>
    </form>
  )
};

const RegisterFormWithRedux = reduxForm({
  form: 'register',
})(RegisterForm);


const RegisterFormContainer = ({registerUser, isLoading}) => {
  const submit = (values) => {
    registerUser(values);
  };

  return <RegisterFormWithRedux  onSubmit={submit} isLoading={isLoading}/>
};

export default connect((state) => ({isLoading: state.User.loading}), {registerUser})(RegisterFormContainer);