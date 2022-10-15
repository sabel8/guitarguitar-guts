import { RouteObject } from "react-router-dom";
import { Home } from "../components/Home";
import { GuitarList } from "../modules/GuitarList/GuitarList";

export const ROUTES: RouteObject[] = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/guitars",
    element: <GuitarList />
  },
  {
    path: "*",
    element: <div>404</div>,
  },
];
