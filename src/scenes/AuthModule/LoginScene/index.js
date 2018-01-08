import React, {Component} from 'react';
import {connect} from "react-redux";
import {NavLink} from "react-router-dom";

import {loginUser} from "../../../actions";

class LoginScene extends Component {

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    }
  }

  render() {
    return (
      <div>
        <input placeholder='login'
               onChange={(event) => this.setState({...this.state, username: event.target.value})}/>
        <input placeholder='password'
               onChange={(event) => this.setState({...this.state, password: event.target.value})}/>
        <button onClick={this.onLogin}>login</button>

        <NavLink to='/register'>Register</NavLink>
      </div>
    );
  }

  onLogin = () => {
    this.props.onLogin(this.state);
  }

}

const AuthSceneContainer = (props) => {
  const onLogin = (data) => {
    return props.loginUser(data);
  };

  return <LoginScene onLogin={onLogin}/>;
};

const mapDispatchToProps = {loginUser};

export default connect(null, mapDispatchToProps)(AuthSceneContainer);