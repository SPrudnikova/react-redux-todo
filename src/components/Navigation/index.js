import React from 'react';
import PropTypes from 'prop-types';
import {NavLink, withRouter} from "react-router-dom";

import './index.scss';
import {connect} from "react-redux";
import {logoutUser, addNewTodo} from "../../actions";

const Navigation = ({navItems, logoutUser, addNewTodo}) => {

  const links = navItems.map((item) => {
    const {key, title} = item;
    return (
      <NavLink key={key} activeClassName="navigation_main_active-link" className='navigation_main_link'
               to={`/${key}`}>{title}</NavLink>
    )
  });

  return (
    <div className="navigation_main">
      <button onClick={addNewTodo}>Add new todo</button>

      {links}

      <button onClick={logoutUser}>logout</button>
    </div>
  );
};


Navigation.propTypes = {
  navItems: PropTypes.array.isRequired,
};

export default withRouter(connect(null, {logoutUser, addNewTodo})(Navigation));

//https://colorscheme.ru/#0841Pw0w0w0w0