import React from "react";
import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
import { RouterProvider } from "react-router-dom";
import { Theme } from "./theme/theme";
import { ThemeProvider } from "@emotion/react";
import { Router } from "./router/router";

// it could be your App.tsx file or theme file that is included in your tsconfig.json
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const theme = Theme();

const router = Router();

root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <RouterProvider router={router} />
    </ThemeProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
