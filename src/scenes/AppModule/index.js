import React from "react";
import {Redirect, Switch, Route} from "react-router-dom";

import {MAIN_NAVIGATION} from "../../const/navigation-items";
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
            <Route path="/inbox" component={InboxScene}/>
            <Route path="/sent" component={SentScene}/>
            <Route path="/trash" component={TrashScene}/>

            <Route path="/error" component={ErrorScene}/>

            <Redirect from="/" to="/inbox" exact/>
            <Route component={ErrorScene} />
          </Switch>
        </div>
      </div>
    )

};

export default AppModule;