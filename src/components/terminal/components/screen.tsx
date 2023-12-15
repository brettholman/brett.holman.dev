import { CssBaseline } from "@mui/material";
import { makeStyles } from "@material-ui/styles";
import { Propmt, PromptHistory } from "./prompt";
import { ResponseBuffer } from "./responseBuffer";
import { Footer } from "./footer";
import { useCommandProcessing } from "../hooks/useCommandProcessing";
import { useState } from "react";
import { FormProvider, useFormContext } from "react-hook-form";
import { SessionState } from "../models";
import { TerminalForm } from "../hooks/useTerminalForm";

interface ScreenProps {
  focused: boolean;
  commandMode: boolean;
  sessionState: SessionState;
  updateSessionState: (_: Partial<SessionState>) => void;
}

const useStyles = makeStyles({
  root: {
    backgroundColor: "#292929",
    minWidth: "100%",
    height: "100vh",
    padding: 0
  },
  scrollActive: {
    overflowY: "scroll",
    overflowX: "hidden",
    width: "100vw",
    height: "95vh"
  }
});

export const Screen = ({
  focused,
  commandMode,
  sessionState,
  updateSessionState,
}: ScreenProps) => {
  const classes = useStyles();

  const [previousCommandSuccessful, setPreviousCommandSuccessful] =
    useState(true);

  const methods = useFormContext<TerminalForm>();

  const { processCommand, history } = useCommandProcessing({
    ...methods,
    sessionState,
    updateSessionState,
  });

  const handleOnSubmit = async (event: any) => {
    event.preventDefault();
    const previousCommand = await processCommand(
      sessionState.getActiveTab().currentDirectory
    );
    setPreviousCommandSuccessful(previousCommand);
    const bottomEl = document.getElementsByClassName('form-entry');
    bottomEl[0].scrollIntoView({ block: 'end' });
  };

  return (
    <>
      <CssBaseline />
      <div className={classes.root}>
        <div className={classes.scrollActive}>
          <PromptHistory history={history} />
          <FormProvider {...methods}>
            <form onSubmit={handleOnSubmit} className="form-entry">
              <Propmt
                currentDirectory={sessionState.getActiveTab().currentDirectory}
                focused={focused}
                previousCommandSuccessful={previousCommandSuccessful}
                commandMode={commandMode}
              />
            </form>
          </FormProvider>
          <ResponseBuffer />
        </div>
        <Footer
          sessionState={sessionState}
          updateSessionState={updateSessionState}
        />
      </div>
    </>
  );
};
