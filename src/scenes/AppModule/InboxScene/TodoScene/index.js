import React, {Component} from 'react';
import {connect} from 'react-redux';
import {selectTodo, unSelectTodo} from '../../../../actions/index';
import TodoData from "../../../../components/Todo";

class MessageContainer extends Component {

  componentDidMount() {
    const {id} = this.props.match.params;
    this.props.selectTodo(id);
  }

  componentWillUnmount() {
    this.props.unSelectTodo();
  }

  render() {
    const {_id: selectedId} = this.props.SelectedTodo;
    const body = selectedId !== undefined ? <TodoData selectedTodoData={this.props.SelectedTodo}/> : null;
    return body;
  }

}

const mapStateToProps = ({SelectedTodo: {data}}) => ({SelectedTodo: data});

export default connect(mapStateToProps, {selectTodo, unSelectTodo})(MessageContainer);