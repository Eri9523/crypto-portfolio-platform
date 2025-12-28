import { RouteObject } from "react-router-dom";

export const routes: RouteObject[] = [
  {
    path: "/",
    lazy: () => import("./root"),
    children: [
        {index: true, lazy:() => import('./home')},
        {path: 'portfolio', lazy:() => import("./portfolio/index")},
        {path: 'portfolio/:address', lazy:() => import("./portfolio/[address]/index")},
        {path: 'portfolio/:address/:collection', lazy:() => import("./portfolio/[address]/[collection]/index")},


    ],
  },
];
