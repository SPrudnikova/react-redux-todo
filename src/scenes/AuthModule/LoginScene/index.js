import React from 'react';
import {NavLink} from "react-router-dom";

import LoginForm from "scenes/AuthModule/LoginScene/LoginForm";

const LoginScene = (props) => {
  return (
    <div>
      <LoginForm />
      <NavLink to='/register'>Register</NavLink>
    </div>
  )
};

export default LoginScene;


