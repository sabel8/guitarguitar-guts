import { RouteObject } from "react-router-dom";
import { Home } from "../components/Home";
import { AcousticPage } from "../pages/AcousticPage";
import { BassPage } from "../pages/BassPage";
import { ElectricPage } from "../pages/ElectricPage";

export const ROUTES: RouteObject[] = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/acoustic",
    element: <AcousticPage />,
  },
  {
    path: "/electric",
    element: <ElectricPage />,
  },
  {
    path: "/bass",
    element: <BassPage />,
  },
  {
    path: "*",
    element: <div>404</div>,
  },
];
