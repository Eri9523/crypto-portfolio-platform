import { Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { routes } from "./routes";
import { DefaultLoading } from "@monorepo-template/lib";

export const AppRouterProvider = () => {
  return (
    <Suspense fallback={<DefaultLoading />}>
      <RouterProvider router={createBrowserRouter(routes)} />
    </Suspense>
  );
};
