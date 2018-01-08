import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';

const TodoData = (props) => {
  const {title} = props.selectedTodoData;
  return (
    <div>
      <span>{title}</span>
    </div>
  )
};

TodoData.propTypes = {
  selectedTodoData: ImmutablePropTypes.contains({
    title: PropTypes.string.isRequired,
  }).isRequired,
};

export default TodoData;
