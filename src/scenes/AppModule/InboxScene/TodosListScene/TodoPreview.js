import React from 'react';
import {NavLink} from 'react-router-dom';

const TodoPreview = ({previewData: {_id, title}}) => (
  <div>
    <NavLink to={{
      pathname: `/inbox/${_id}`
    }}>
      <span>{title}</span>
    </NavLink>
  </div>
);

export default TodoPreview;