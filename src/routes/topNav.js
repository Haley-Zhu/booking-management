import React from 'react';
import { Link, withRouter } from 'react-router-dom';

const TopNav = () => {
  return(
    <nav>
      <Link to='/'>login</Link>
      <Link to='/orders'>order</Link>
    </nav>
  )
}

export default withRouter(TopNav);