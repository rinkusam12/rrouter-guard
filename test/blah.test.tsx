import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { RouterProvider } from 'react-router-dom';
import { routesWithGuard } from '../src';

// async function loader() {
//   try {
//     // await returnsPromise()
//   } catch (error) {
//     console.log('That did not go well.')
//   }
// }

describe('it', () => {
  it('renders without crashing', () => {
    const routes = routesWithGuard([
      {
        path: '/',
        component: () => <div>Home</div>,
        exact: true,
      },
    ]);
    // const routes = createBrowserRouter([
    //   {
    //     path: '/',
    //     element: <div>Home</div>,
    //     loader: function() {

    //     },
    //   },
    // ]);

    const div = document.createElement('div');
    ReactDOM.render(
      <div>
        <RouterProvider router={routes} />
      </div>,
      div
    );
    ReactDOM.unmountComponentAtNode(div);
  });
});
