import React from "react";
import { Box } from "@mui/material";
import { PromptStorage } from "../../../models";
import { InputContext } from "../input/inputContext";

interface PromptHistoryProps {
  history: Array<PromptStorage>;
}

export const PromptHistory = ({ history }: PromptHistoryProps): JSX.Element => (
  <Box>
    {history.map((value: PromptStorage, index: number) => (
      <React.Fragment key={index}>
        <InputContext
          historicValue={value.input}
          previousCommandSuccessful={value.previousCommandSuccessful}
          currentDirectory={value.currentDirectory}
        />
        {value.output}
      </React.Fragment>
    ))}
  </Box>
);
