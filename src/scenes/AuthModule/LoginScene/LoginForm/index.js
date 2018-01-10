import React from 'react';
import {Field, reduxForm} from "redux-form";

import {loginUser} from "actions";
import {connect} from "react-redux";
import InputWithLabel from "components/FormElements/InputWithLabel";
import {required, minLength} from "helpers/validationRules";
import VerticalDivider from "components/VerticalDivider";
import "scenes/AuthModule/LoginScene/LoginForm/index.scss"
import {compose} from "redux";
import {formNames} from "const/formNames";

const LoginForm = (props) => {
  return (
    <form onSubmit={props.handleSubmit} className="login-scene_form">
      <Field name="username" type="text"
             component={InputWithLabel} label="Username"
             validate={[required(), minLength(3)]}
      />
      <VerticalDivider/>
      <Field name="password" type="text"
             component={InputWithLabel} label="Password"
             validate={[required(), minLength(3)]}
      />

      <VerticalDivider/>
      <button className="btn btn-primary btn-fluid font-uppercase"
              disabled={props.isLoading}
              type="submit">
        Login
      </button>
    </form>
  )
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSubmit: (values) => {
      dispatch(loginUser(values))
    }
  }
};

const mapStateToProps = () => {
  return (state) => {
    return {
      isLoading: state.User.loading,
      initialValues: {
        username: 'Dan20',
        password: 'Hi20'
      }
    }
  }
};

const enhancer = compose(
  connect(mapStateToProps, mapDispatchToProps),
  reduxForm({form: formNames.login, destroyOnUnmount: false,}),
);

export default enhancer(LoginForm);