import type { RouteObject } from "react-router-dom";
import NotFound from "../pages/NotFound";
import Home from "../pages/home/page";
import TestPage from "../pages/test/page";
import HistoryPage from "../pages/history/page";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/test/:category",
    element: <TestPage />,
  },
  {
    path: "/historial",
    element: <HistoryPage />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
];

export default routes;