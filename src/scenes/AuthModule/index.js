import React from "react";
import {Redirect, Switch, Route} from "react-router-dom";

import ErrorScene from "../ErrorScene";
import AuthScene from "./LoginScene";
import RegisterScene from "./RegisterScene";


const AuthModule = () => {

  return (
    <div className="root">
      <div className="root_scene-layout">
        <Switch>
          <Route path='/login' component={AuthScene}/>
          <Route path='/register' component={RegisterScene}/>
          <Redirect to='/login'/>
          <Route component={ErrorScene} />
        </Switch>
      </div>
    </div>
  )

};

export default AuthModule;