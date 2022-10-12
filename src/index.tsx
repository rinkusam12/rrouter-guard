import * as React from 'react';
import {
  createBrowserRouter,
  RouteObject,
  LoaderFunctionArgs,
  redirect,
  ActionFunction,
  RedirectFunction,
} from 'react-router-dom';

export type CanActivateFn = (
  redirect: RedirectFunction
) => boolean | Response | Promise<boolean | Response>;



export interface RouteConfig {
  path: string;
  component: React.ComponentType<any>;
  exact?: boolean;
  routes?: RouteConfig[];
  //Middleware to run before the route is rendered. If any of the middleware return false, the route will not be rendered. The result should be a boolean.
  canActivate?: CanActivateFn[];
  loader?: (args: LoaderFunctionArgs) => Promise<any>;
  action?: ActionFunction;
}


export type MainRouteConfig = RouteConfig;



export function routesWithGuard(routeConfig: MainRouteConfig[]) {
  function renderRoutes(route: MainRouteConfig): RouteObject {
    return {
      path: route.path,
      element: <route.component />,
      action: route.action,
      children: route.routes ? route.routes.map(renderRoutes) : undefined,
      loader: async args => {
        if (!route.canActivate) {
          return route.loader?.(args);
        }
        const shouldRedirect = await Promise.all(
          route.canActivate.map(cb => cb(redirect))
        );
        if (shouldRedirect.find(r => r instanceof Response)) {
          return shouldRedirect.find(r => r instanceof Response);
        } else {
          return route.loader?.(args);
        }
      },
    };
  }

  const router = createBrowserRouter(routeConfig.map(renderRoutes));

  return router;
}
