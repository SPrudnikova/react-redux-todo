import React from 'react';
import {NavLink} from "react-router-dom";

import LoginForm from "scenes/AuthModule/LoginScene/LoginForm";
import 'scenes/AuthModule/LoginScene/index.scss';
import VerticalDivider from 'components/VerticalDivider';

const LoginScene = (props) => {
  return (
    <div className="login-scene">
      <LoginForm />

      <VerticalDivider height="30px"/>

      <div className="login-scene_register-block">
        <p>Do not have any account?</p>
        <NavLink to='/register' className="font-large">Register</NavLink>
      </div>
    </div>
  )
};

export default LoginScene;


