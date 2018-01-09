import React from "react";
import {Redirect, Switch, Route, withRouter} from "react-router-dom";
import Notifications from 'react-notification-system-redux';
import {connect} from "react-redux";

import ErrorScene from "../ErrorScene";
import AuthScene from "./LoginScene";
import RegisterScene from "./RegisterScene";


const AuthModule = (props) => {

  return (
    <div className="root">
      <Switch>
        <Route path='/login' component={AuthScene}/>
        <Route path='/register' component={RegisterScene}/>
        <Redirect to='/login'/>
        <Route component={ErrorScene}/>
      </Switch>
      <Notifications notifications={props.notifications} styles={{fontFamily: 'Arial'}}/>
    </div>
  )

};

export default withRouter(connect(
  state => ({ notifications: state.notifications })
)(AuthModule));