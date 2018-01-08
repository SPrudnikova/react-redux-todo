import React from "react";
import {connect} from "react-redux";
import { withRouter } from "react-router-dom";


import {routerReducer} from "react-router-redux";
import AppModule from "./AppModule";
import AuthModule from "./AuthModule";


class SelectModules extends React.Component {

  render () {
    const token =  localStorage.getItem('sampleToken');
    return token && token !== 'undefined' ? <AppModule /> : <AuthModule />;
  }

}

const mapStateToProps = ({User, routerReducer}) => ({user: User, routerReducer: routerReducer});


export default withRouter(connect(mapStateToProps, {})(SelectModules));