import { Box, CssBaseline } from "@mui/material";
import { useState } from "react";
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

  return (
    <FormProvider {...methods}>
      <Box onKeyDown={handleKeyPress}>
        <CssBaseline />
        <Screen
          sessionState={sessionState}
          updateSessionState={updateSessionState}
        />
      </Box>
    </FormProvider>
  );
};
