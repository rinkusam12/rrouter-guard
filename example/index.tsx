import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { routesWithGuard } from '../src/index';
import { RouterProvider } from 'react-router-dom';
import Home from './home';
import About from './about';
import Layout from './layout';

const App = () => {
  const routes = routesWithGuard([
    {
      path: '/',
      component: Layout,
      exact: true,
      canActivate: [
        function(redirect) {
          return true;
          // return redirect('/login');
        },
      ],
      routes: [
        {
          path: '',
          component: Home,
        },
        {
          path: 'about',
          component: About,
        },
      ],
    },
    {
      path: '/login',
      component: () => <div>Login</div>,
      exact: true,
    },
  ]);

  return (
    <div>
      <RouterProvider router={routes} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
