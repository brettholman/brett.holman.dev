import React from "react";
import { makeStyles } from "@material-ui/styles";
import { Propmt, PromptHistory } from "./prompt";
import { AutocompleteSuggestions } from "./prompt/autocompleteSuggestions";
import { Footer } from "./footer";
import { useCommandProcessing } from "../hooks/useCommandProcessing";
import { useEffect, useState } from "react";
import { FormProvider, useFormContext } from "react-hook-form";
import { SessionState, Tab } from "../models";
import { TerminalForm } from "../hooks/useTerminalForm";

interface ScreenProps {
  sessionState: SessionState;
  updateSessionState: (_: Partial<SessionState>) => void;
}

const useStyles = makeStyles({
  root: {
    backgroundColor: "#292929",
    minWidth: "100%",
    height: "100vh",
    padding: 0,
  },
  scrollActive: {
    overflowY: "scroll",
    overflowX: "hidden",
    width: "100vw",
    height: "95vh",
  },
});

export const Screen = ({ sessionState, updateSessionState }: ScreenProps) => {
  const classes = useStyles();

  const [previousCommandSuccessful, setPreviousCommandSuccessful] =
    useState(true);

  const [activeTab, setActiveTab] = useState<Tab>(sessionState.getActiveTab());
  const [suggestions, setSuggestions] = useState<string[]>([]);

  useEffect(() => {
    const nextActiveTab = sessionState.getActiveTab();
    console.log({ inputBuffer: nextActiveTab.inputBuffer });
    setActiveTab(nextActiveTab);
    setSuggestions([]);
  }, [sessionState]);

  const methods = useFormContext<TerminalForm>();

  const { processCommand, history } = useCommandProcessing({
    ...methods,
    sessionState,
    updateSessionState,
  });

  const handleOnSubmit = async (event: any) => {
    event.preventDefault();
    const previousCommand = await processCommand(
      sessionState.getActiveTab().currentDirectory,
    );
    setPreviousCommandSuccessful(previousCommand);
    setSuggestions([]);
    const bottomEl = document.getElementsByClassName("form-entry");
    bottomEl[0].scrollIntoView({ block: "end" });
  };

  // TODO move the form to the prompt component?
  return (
    <div className={classes.root}>
      <div className={classes.scrollActive}>
        <PromptHistory history={history} />
        <FormProvider {...methods}>
          <form onSubmit={handleOnSubmit} className="form-entry">
            <Propmt
              currentDirectory={sessionState.getActiveTab().currentDirectory}
              previousCommandSuccessful={previousCommandSuccessful}
              tab={activeTab}
              onSuggestions={setSuggestions}
            />
            <AutocompleteSuggestions suggestions={suggestions} />
          </form>
        </FormProvider>
      </div>
      <Footer
        sessionState={sessionState}
        updateSessionState={updateSessionState}
      />
    </div>
  );
};
