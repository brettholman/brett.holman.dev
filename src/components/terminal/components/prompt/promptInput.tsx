import { Box } from "@mui/material";
import Input from "@mui/material/Input";
import { Controller, useFormContext } from "react-hook-form";

interface PromptInputProps {
  commandMode: boolean;
}

export const PromptInput = ({ commandMode }: PromptInputProps) => {
  const { control, watch } = useFormContext();

  const currentValue = watch("hiddenInput");
  return (
    <Box style={{ height: "0px", width: "0px" }}>
      <Controller
        name="hiddenInput"
        control={control}
        render={({ field }) => (
          <Input autoFocus {...field} value={currentValue} />
        )}
      />
    </Box>
  );
};
