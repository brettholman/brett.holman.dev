import { Box, CssBaseline } from "@mui/material";
import { makeStyles } from "@material-ui/styles";
import { Propmt, PromptHistory } from "./prompt";
import { ResponseBuffer } from "./responseBuffer";
import { Footer } from "./footer";
import { useCommandProcessing } from "../hooks/useCommandProcessing";
import { useState } from "react";
import { FormProvider } from "react-hook-form";
import { useTerminalForm } from "../hooks/useTerminalForm";
import { SessionState } from "../models";

interface ScreenProps {
  currentDirectory: string;
  focused: boolean;
  commandMode: boolean;
  sessionState: SessionState;
}

const useStyles = makeStyles({
  root: {
    backgroundColor: "#292929",
    minWidth: "100%",
    height: "100vh",
    position: "fixed",
  },
});

export const Screen = ({
  currentDirectory,
  focused,
  commandMode,
  sessionState,
}: ScreenProps) => {
  const classes = useStyles();

  const [previousCommandSuccessful, setPreviousCommandSuccessful] =
    useState(true);

  const { methods } = useTerminalForm();
  const { processCommand, history } = useCommandProcessing(methods);

  const handleOnClick = (e: any) => {
    e.preventDefault();
    console.log("yo");
    methods.setFocus("hiddenInput");
  };

  const handleOnSubmit = (event: any) => {
    event.preventDefault();
    const previousCommand = processCommand(currentDirectory, false);
    setPreviousCommandSuccessful(previousCommand);
  };

  return (
    <>
      <CssBaseline />
      <Box className={classes.root} onClick={handleOnClick}>
        <PromptHistory history={history} />
        <FormProvider {...methods}>
          <form onSubmit={handleOnSubmit}>
            <Propmt
              currentDirectory={currentDirectory}
              focused={focused}
              previousCommandSuccessful={previousCommandSuccessful}
              commandMode={commandMode}
            />
          </form>
        </FormProvider>
        <ResponseBuffer />
        <Footer activeTabIndex={sessionState.activeTabIndex} />
      </Box>
    </>
  );
};
