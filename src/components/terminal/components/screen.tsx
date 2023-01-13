import { Box, CssBaseline } from "@mui/material";
import { makeStyles } from "@material-ui/styles";
import { Propmt } from "./prompt";
import { ResponseBuffer } from "./responseBuffer";
import { Footer } from "./footer";

interface screenProps {
  currentDirectory: string;
}

const useStyles = makeStyles({
  root: {
    backgroundColor: "#292929",
    minWidth: "100%",
    height: "100vh",
    position: "fixed",
  },
});

export const Screen = ({ currentDirectory }: screenProps) => {
  const classes = useStyles();
  return (
    <>
      <CssBaseline />
      <Box className={classes.root}>
        <Propmt currentDirectory={currentDirectory} />
        <ResponseBuffer />
        <Footer />
      </Box>
    </>
  );
};
