import React from "react";
import {Redirect, Switch, Route} from "react-router-dom";

import {MAIN_NAVIGATION} from "../../const/navigationItems";
import InboxScene from "./InboxScene";
import TrashScene from "./TrashScene";
import SentScene from "./SentScene";
import ErrorScene from "../ErrorScene";
import Navigation from "../../components/Navigation";


const AppModule = () => {

    return (
      <div className="root">
        <Navigation navItems={MAIN_NAVIGATION}/>
        <div className="root_scene-layout">
          <Switch>
            <Route path="/in-progress" component={InboxScene}/>
            <Route path="/done" component={SentScene}/>
            <Route path="/open" component={TrashScene}/>

            <Route path="/error" component={ErrorScene}/>

            <Redirect from="/" to="/in-progress" exact/>
            <Route component={ErrorScene} />
          </Switch>
        </div>
      </div>
    )

};

export default AppModule;