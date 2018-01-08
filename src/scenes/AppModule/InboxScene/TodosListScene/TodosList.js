import React from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';

import TodoPreview from './TodoPreview';

const TodosList = ({todos}) => {
  return (
    <div>
      {todos.map((msg) => <TodoPreview key={msg._id} previewData={msg}/>)}
    </div>
  );
};

TodosList.propTypes = {
  todos: ImmutablePropTypes.list.isRequired
};

export default TodosList;