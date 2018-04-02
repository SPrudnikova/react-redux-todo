import React from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import {List} from 'react-virtualized';

class TodosList extends React.Component {

  constructor (props) {
    super(props);
    this.state = { loading: false }
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
        {this.props.todos.get(index).title}
      </div>
    )
  };

  render () {
    return (
      <List
        width={300}
        height={400}
        rowCount={this.props.todos.size}
        rowHeight={35}
        rowRenderer={this.rowRenderer}
        onScroll={({ clientHeight, scrollHeight, scrollTop }) => {
          if (35 * this.props.todos.size - clientHeight - 100 < scrollTop && !this.state.loading) {
            this.setState({ loading: true });
            setTimeout(() => this.setState({ loading: false }), 1000);
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