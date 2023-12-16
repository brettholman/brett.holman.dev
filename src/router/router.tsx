import { createBrowserRouter } from "react-router-dom";
import { Terminal } from "../components/terminal";

export const Router = () =>
  createBrowserRouter([
    {
      path: "/",
      element: <Terminal />
    },
  ]);
