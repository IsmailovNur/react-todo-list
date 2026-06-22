import { createBrowserRouter } from "react-router-dom";
import MainPage from "../pages/MainPage/MainPage.tsx";
import { AppRoutes } from "./routes.ts";
import NotFoundPage from "../pages/NotFoundPage/NotFoundPage.tsx";


export const router = createBrowserRouter([
  {
    path: AppRoutes.main,
    element: <MainPage />,
  },
  {
    path: AppRoutes.notFound,
    element: <NotFoundPage />,
  },
]);