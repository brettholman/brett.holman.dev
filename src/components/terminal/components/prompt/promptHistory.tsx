import { Box } from "@mui/material";
import { PromptStorage } from "../../models";
import { ResponseBuffer } from "../responseBuffer";
import { Propmt } from "./prompt";

interface PromptHistoryProps {
  history: Array<PromptStorage>;
}

export const PromptHistory = ({ history }: PromptHistoryProps): JSX.Element => (
  <Box>
    {history.map((value: PromptStorage, index: number) => (
      <>
        <Propmt
          key={index}
          commandMode={false}
          focused={false}
          currentDirectory={value.currentDirectory}
          previousCommandSuccessful={value.previousCommandSuccessful}
          historicValue={value.input}
        />
        <ResponseBuffer value={value.output} />
      </>
    ))}
  </Box>
);
