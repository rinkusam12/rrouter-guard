import * as React from 'react';
import { Outlet } from 'react-router-dom';
const Layout = () => {
  return (
    <div>
       <h1>Hello CodeSandbox</h1>
      <Outlet />
    </div>
  );
};

export default Layout;
