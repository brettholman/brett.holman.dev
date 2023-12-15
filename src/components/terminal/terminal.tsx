import { Box } from "@mui/material";
import { useState, useEffect } from "react";
import { FormProvider } from "react-hook-form";
import { Screen } from "./components/screen";
import { useTmuxControls } from "./hooks/useTmuxControls";
import { SessionState } from "./models/sessionState";
import { useGetDefaultSession } from "./hooks/useGetDefaultSession";
import { useTerminalForm } from "./hooks/useTerminalForm";

export const Terminal = (): JSX.Element => {
  const { defaultSessionState, getDefaultTab } = useGetDefaultSession();

  const [sessionState, setSessionState] =
    useState<SessionState>(defaultSessionState);

  const updateSessionState = (newState: Partial<SessionState>) => {
    setSessionState({ ...sessionState, ...newState });
  };

  const { handleKeyPress } = useTmuxControls(
    sessionState,
    updateSessionState,
    getDefaultTab,
  );

  const { methods } = useTerminalForm();
  useEffect(() => {
    console.log({ sessionState })
  }, [sessionState.tabs])

  return (
    <FormProvider {...methods}>
      <Box onKeyDown={handleKeyPress}>
        <Screen
          focused={true} // todo delete me
          sessionState={sessionState}
          updateSessionState={updateSessionState}
        />
      </Box>
    </FormProvider>
  );
};
