import { Box } from "@mui/material";
import { useState } from "react";
import { FormProvider } from "react-hook-form";
import { Screen } from "./components/screen";
import { useTmuxControls } from "./hooks/useTmuxControls";
import { SessionState } from "./models/sessionState";
import { useGetDefaultSession } from "./hooks/useGetDefaultSession";
import { useTerminalForm } from "./hooks/useTerminalForm";

export const Terminal = (): JSX.Element => {
  const defaultSession = useGetDefaultSession();

  const [sessionState, setSessionState] =
    useState<SessionState>(defaultSession);

  const updateSessionState = (newState: Partial<SessionState>) => {
    console.log({ newState });
    setSessionState({ ...sessionState, ...newState });
  };

  const { handleKeyPress, commandMode } = useTmuxControls(
    sessionState,
    updateSessionState
  );

  const { methods } = useTerminalForm({ commandMode });

  return (
    <FormProvider {...methods}>
      <Box onKeyDown={handleKeyPress}>
        <Screen
          focused={!commandMode}
          commandMode={commandMode}
          sessionState={sessionState}
          updateSessionState={updateSessionState}
        />
      </Box>
    </FormProvider>
  );
};
