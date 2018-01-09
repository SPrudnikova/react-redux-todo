import React, {Component} from 'react';
import TodosListScene from './TodosListScene';
import TodoScene from './TodoScene';
import {Route} from "react-router-dom";
import NestedRouterLevel from "../../../decorators/NestedRouterLevel";

class InboxScene extends Component {

  render() {
    return (
      <NestedRouterLevel>
        <Route path="/in-progress" component={TodosListScene} exact/>
        <Route path="/in-progress/:id" component={TodoScene} exact/>
      </NestedRouterLevel>
    );
  }

}

export default InboxScene;
