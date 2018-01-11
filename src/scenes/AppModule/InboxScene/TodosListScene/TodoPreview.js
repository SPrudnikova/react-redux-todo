import React from 'react';
import {NavLink} from 'react-router-dom';

const TodoPreview = ({previewData: {_id, title, dateStart}}) => (
  <div>
    <NavLink to={{
      pathname: `/in-progress/${_id}`
    }}>
      <span>{title} </span>
      <span> {dateStart}</span>
    </NavLink>
  </div>
);

export default TodoPreview;