import React from "react";
import { Box } from "@mui/material";
import { PromptStorage } from "../../models";
import { ResponseBuffer } from "../responseBuffer";
import { Propmt } from "./prompt";
import { CommandStatusCode } from "../../models/commandStatusCode";

interface PromptHistoryProps {
  history: Array<PromptStorage>;
}

export const PromptHistory = ({ history }: PromptHistoryProps): JSX.Element => (
  <Box>
    {history.map((value: PromptStorage, index: number) => (
      <React.Fragment key={index}>
        <Propmt
          commandMode={false}
          focused={false}
          currentDirectory={value.currentDirectory}
          previousCommandSuccessful={
            value.statusCode === CommandStatusCode.SUCCESS ? true : false
          }
          historicValue={value.input}
        />
        <ResponseBuffer value={value.output} />
      </React.Fragment>
    ))}
  </Box>
);
