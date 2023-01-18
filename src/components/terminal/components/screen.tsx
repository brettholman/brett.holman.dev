import { Box, CssBaseline } from "@mui/material";
import { makeStyles } from "@material-ui/styles";
import { Propmt, PromptHistory } from "./prompt";
import { ResponseBuffer } from "./responseBuffer";
import { Footer } from "./footer";
import { useCommandProcessing } from "../hooks/useCommandProcessing";
import { useState } from "react";
import { FormProvider } from "react-hook-form";
import { useTerminalForm } from "../hooks/useTerminalForm";

interface screenProps {
  currentDirectory: string;
  focused: boolean;
}

const useStyles = makeStyles({
  root: {
    backgroundColor: "#292929",
    minWidth: "100%",
    height: "100vh",
    position: "fixed",
  },
});

export const Screen = ({ currentDirectory, focused }: screenProps) => {
  const classes = useStyles();

  const [previousCommandSuccessful, setPreviousCommandSuccessful] =
    useState(true);

  const { methods } = useTerminalForm();
  const { processCommand, history } = useCommandProcessing();

  const handleProcessCommand = (value: any) => {
    const result = processCommand(value);
    setPreviousCommandSuccessful(result);
  };

  const handleOnClick = (e: any) => {
    e.preventDefault();
    console.log("yo");
    methods.setFocus("hiddenInput");
  };

  return (
    <>
      <CssBaseline />
      <Box className={classes.root} onClick={handleOnClick}>
        <PromptHistory history={history} />
        <FormProvider {...methods}>
          <form>
            <Propmt
              currentDirectory={currentDirectory}
              focused={focused}
              handleProcessCommand={handleProcessCommand}
              previousCommandSuccessful={previousCommandSuccessful}
            />
          </form>
        </FormProvider>
        <ResponseBuffer />
        <Footer />
      </Box>
    </>
  );
};
