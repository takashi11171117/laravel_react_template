import React from 'react';
import { Link } from 'react-router-dom';

export const LinkNavigation: React.FC = () => {
  return (
    <div>
      <Link to="/">HOME</Link>
      <br />
      <Link to="page1">PAGE1</Link>
      <br />
      <Link to="page2">PAGE2</Link>
      <br />
      <Link to="users">User</Link>
      <br />
      <Link to="todos">Todo</Link>
    </div>
  );
}