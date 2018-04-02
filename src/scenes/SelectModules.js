import React from "react";
import {connect} from "react-redux";
import { withRouter } from "react-router-dom";
import {getUser} from '../actions/index';


import {routerReducer} from "react-router-redux";
import AppModule from "./AppModule";
import AuthModule from "./AuthModule";


class SelectModules extends React.Component {

  componentDidMount() {
    this.props.getUser();
  }

  render () {
    const { data, loading } = this.props.user;
    if (loading){
      return <p>Loading</p>
    }
    return data.username ? <AppModule /> : <AuthModule />;
  }

}

const mapStateToProps = ({User, routerReducer}) => ({user: User, routerReducer: routerReducer});


export default withRouter(connect(mapStateToProps, {getUser})(SelectModules));