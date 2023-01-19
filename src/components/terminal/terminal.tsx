import { Grid } from "@mui/material";
import { useState } from "react";
import { Screen } from "./components/screen";
import { useTmuxControls } from "./hooks/useTmuxControls";

export const Terminal = (): JSX.Element => {
  const [currentDir] = useState("/");

  const { handleKeyPress, commandMode } = useTmuxControls();

  return (
    <Grid onKeyDown={handleKeyPress}>
      <Screen
        currentDirectory={currentDir}
        focused={true}
        commandMode={commandMode}
      />
    </Grid>
  );
};
