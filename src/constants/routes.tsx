import { Alert } from "@mui/material";
import { RouteObject } from "react-router-dom";
import { Home } from "../components/Home";
import { GuitarList } from "../modules/GuitarList/GuitarList";
import { GuitarPage } from "../modules/GuitarPage/GuitarPage";

export const ROUTES: RouteObject[] = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/guitars",
    element: <GuitarList />,
  },
  {
    path: "/guitars/:sku",
    element: <GuitarPage />,
  },
  {
    path: "*",
    element: <Alert severity="error">404</Alert>,
  },
];
