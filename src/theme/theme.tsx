import { createTheme } from "@mui/material";

export const Theme = () =>
  createTheme({
    typography: {
      fontFamily: "Roboto Mono, monospace",
      body1: {},
    },
    palette: {
      primary: {
        main: "#bcbcbc",
      },
      info: {
        main: "#c7a53f",
      },
      secondary: {
        main: "#839f61",
      },
      error: {
        main: "#bd615f",
      },
    },
  });
