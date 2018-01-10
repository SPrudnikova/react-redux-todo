import React, {Component} from 'react';
import {connect} from 'react-redux';
import ImmutablePropTypes from 'react-immutable-proptypes';
import TodosList from './TodosList';
import {getTodosData} from '../../../../actions/index';
import {inprogressTodosSelector} from "selectors";

class TodoListScene extends Component {

  componentDidMount() {
    this.props.getTodosData();
  }

  render() {
    return (
      <div>
        <TodosList todos={this.props.todos}/>
      </div>
    );
  }
}

TodoListScene.propTypes = {
  todos: ImmutablePropTypes.list.isRequired
};

const mapStateToProps = (state) => ({todos: inprogressTodosSelector(state)});

export default connect(mapStateToProps, {getTodosData})(TodoListScene);