import React, { Suspense, lazy } from "react";
import { Router, Switch, Route } from "react-router-dom";
import { history } from 'utils';
import { BlockLoading } from 'zent';
import random from 'number-random';

const routes: Array<{component: any, path: string}> = [
  {
    component: lazy(() => import(/* webpackChunkName: "home" */'pages/Home')),
    path: "/",
  },
  {
    component: lazy(() => import(/* webpackChunkName: "not-found" */'pages/NotFound')),
    path: "/not-found",
  }
];

export default function AppRouter() {
  return (
    <Router history={history}>
      <Suspense fallback={
        <BlockLoading loading icon="circle" iconSize={64} iconText="加载中" />
      }>
        <Switch>
          {routes &&
            routes.map((route: { component: any; path: string }) => {
              const key = random(100, 999);
              return (<Route
                path={route.path}
                key={key}
                component={(props: unknown) => (
                  <route.component {...props}></route.component>
                )}
              ></Route>);
            })}
        </Switch>
      </Suspense>
    </Router>
  );
}
