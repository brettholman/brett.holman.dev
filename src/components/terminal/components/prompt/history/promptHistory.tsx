import React from "react";
import { Box } from "@mui/material";
import { PromptStorage } from "../../../models";
import { ResponseBuffer } from "./responseBuffer";
import { InputContext } from "../input/inputContext";

interface PromptHistoryProps {
  history: Array<PromptStorage>;
}

export const PromptHistory = ({ history }: PromptHistoryProps): JSX.Element => (
  <Box>
    {history.map((value: PromptStorage, index: number) => (
      <React.Fragment key={index}>
        <InputContext focused={false} historicValue={value.input} previousCommandSuccessful={value.previousCommandSuccessful} currentDirectory={value.currentDirectory} />
        <ResponseBuffer value={value.output} />
      </React.Fragment>
    ))}
  </Box>
);
