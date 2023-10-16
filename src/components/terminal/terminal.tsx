import { Grid } from "@mui/material";
import { useState } from "react";
import { Screen } from "./components/screen";
import { useTmuxControls } from "./hooks/useTmuxControls";
import { SessionState } from "./models/sessionState";
import { useGetDefaultSession } from "./hooks/useGetDefaultSession";

export const Terminal = (): JSX.Element => {
  const [currentDir] = useState("/");

  const { defaultSession } = useGetDefaultSession();

  const [sessionState, setSessionState] =
    useState<SessionState>(defaultSession);

  const updateSessionState = (newState: Partial<SessionState>) => {
    setSessionState({ ...sessionState, ...newState });
  };

  const { handleKeyPress, commandMode } = useTmuxControls(
    sessionState,
    updateSessionState
  );

  return (
    <Grid onKeyDown={handleKeyPress}>
      <Screen
        currentDirectory={currentDir}
        focused={!commandMode}
        commandMode={commandMode}
        sessionState={sessionState}
        updateSessionState={updateSessionState}
      />
    </Grid>
  );
};
