import React from 'react';
import {Field, reduxForm} from "redux-form";

import {registerUser} from "actions";
import {connect} from "react-redux";
import {compose} from "redux";
import InputWithLabel from "components/FormElements/InputWithLabel";
import {required, minLength} from "helpers/validationRules";
import VerticalDivider from "components/VerticalDivider";
import "scenes/AuthModule/RegisterScene/RegisterForm/index.scss"
import {findUserByUsername} from "services/User";
import {formNames} from "const/formNames";

const asyncUsernameValidate = (values) => {
  return findUserByUsername(values.username)
    .then((res) => {
      if (res.username) {
        throw { username: 'That username is taken' }
      }
    })
};

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

const mapDispatchToProps = (dispatch) => {
  return {
    onSubmit: (values) => {
      dispatch(registerUser(values))
    }
  }
};

const mapStateToProps = () => {
  return (state) => {
    return {
      isLoading: state.User.loading,
      initialValues: {
        username: state.form.login.values.username,
        password: state.form.login.values.password
      }
    }
  }
};

const enhancer = compose(
  connect(mapStateToProps, mapDispatchToProps),
  reduxForm({form: formNames.register,   asyncValidate: asyncUsernameValidate, asyncBlurFields: ['username']}),
);

export default enhancer(RegisterForm);

// const RegisterFormWithRedux = reduxForm({
//   form: 'register',
//   asyncValidate: asyncUsernameValidate,
//   asyncBlurFields: ['username']
// })(RegisterForm);
//
//
// const RegisterFormContainer = ({registerUser, isLoading}) => {
//   const submit = (values) => {
//     registerUser(values);
//   };
//
//   return <RegisterFormWithRedux  onSubmit={submit} isLoading={isLoading}/>
// };
//
// export default connect((state) => ({isLoading: state.User.loading}), {registerUser})(RegisterFormContainer);