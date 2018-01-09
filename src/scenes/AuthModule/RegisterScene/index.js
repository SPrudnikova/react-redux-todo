import React from 'react';
import {goBack} from 'react-router-redux';
import {connect} from "react-redux";

import RegisterForm from "scenes/AuthModule/RegisterScene/RegisterForm";
import 'scenes/AuthModule/RegisterScene/index.scss';
import VerticalDivider from "components/VerticalDivider";


const RegisterScene = ({goBack}) => {
  return (
    <div className="register-scene">
      <RegisterForm/>
      <VerticalDivider height="30px"/>
      <button className="btn btn-primary btn-fluid font-uppercase" onClick={goBack}>
        Back
      </button>
    </div>
  )
};

export default connect(null, {goBack})(RegisterScene);