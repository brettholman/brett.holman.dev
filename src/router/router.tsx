import { createBrowserRouter } from "react-router-dom";
import { App } from "../components";

export const Router = () =>
  createBrowserRouter([
    {
      path: "/",
      element: <App />
    },
  ]);
