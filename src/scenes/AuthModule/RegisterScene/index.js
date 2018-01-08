import React, {Component} from 'react';
import {connect} from "react-redux";

import {registerUser} from "../../../actions";

class RegisterScene extends Component {

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
        <button onClick={this.onRegister}>register</button>
      </div>
    );
  }

  onRegister = () => {
    this.props.onRegister(this.state);
  }

}

const RegisterSceneContainer = (props) => {
  const onRegister = (data) => {
    return props.registerUser(data);
  };

  return (
    <RegisterScene onRegister={onRegister}/>
  )

};

export default connect(null, {registerUser})(RegisterSceneContainer);