import React from 'react';
import { NavLink, withRouter } from 'react-router-dom';

const TopNav = () => {
  return(
    <nav>
      <NavLink to='/login'>login</NavLink>
      <NavLink to='/orders'>order</NavLink>
    </nav>
  )
}

export default TopNav;