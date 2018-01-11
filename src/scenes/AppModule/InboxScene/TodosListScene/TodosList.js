import React from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { List } from 'react-virtualized';

import TodoPreview from './TodoPreview';

class TodosList extends React.Component {

  constructor (props) {
    super(props);
    this.state = {todos: props.todos, loading: false}
  }
  rowRenderer = ({
                          key,         // Unique key within array of rows
                          index,       // Index of row within collection
                          isScrolling, // The List is currently being scrolled
                          isVisible,   // This row is visible within the List (eg it is not an overscanned row)
                          style
                        }) => {
    return (
      <div
        key={key}
        style={style}
      >
        {this.state.todos.get(index).title}
      </div>
    )
  }

  // componentDidMount() {
  //   setInterval(() => {
  //     var items = this.state.items;
  //     items.push({id:items.length + 1});
  //     this.setState({items:items})
  //   }, 500)
  // }

  render () {
    return (
      <List
        width={300}
        height={400}
        rowCount={this.state.todos.size}
        rowHeight={35}
        rowRenderer={this.rowRenderer}
        onScroll={({clientHeight, scrollHeight, scrollTop}) => {
          if (35*this.state.todos.size - clientHeight - 100 < scrollTop && !this.state.loading) {
            this.setState({loading: true});
            console.log('imhere')
            setTimeout(() => this.setState({todos: this.state.todos.concat(this.state.todos), loading: false}), 1000);
          }
        }}
      />
    )
  }

}

TodosList.propTypes = {
  todos: ImmutablePropTypes.list.isRequired
};

export default TodosList;