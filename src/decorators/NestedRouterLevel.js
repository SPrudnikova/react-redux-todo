import React from 'react'
import {Route, Switch} from "react-router-dom";

export default class NestedRouterLevel extends React.Component {
  render() {
    return (
      <Switch>
        {this.props.children}
        <Route to="/error"/>
      </Switch>
    )
  }

}