import { Box } from "@mui/material";
import Input from "@mui/material/Input";
import { useEffect } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { Tab } from "../../models";

interface PromptInputProps {
  tab?: Tab;
}

export const PromptInput = ({ tab }: PromptInputProps) => {
  const { control, watch } = useFormContext();

  const currentValue = watch("hiddenInput");

  useEffect(() => {
    console.log({ currentValue, tab, input: tab?.inputBuffer })
    if (tab) {
      tab.inputBuffer = currentValue;
    }
  }, [currentValue]);

  return (
    <Box style={{ height: "0px", width: "0px" }}>
      <Controller
        name="hiddenInput"
        defaultValue={tab?.inputBuffer}
        control={control}
        render={({ field }) => (
          <Input autoFocus {...field} value={currentValue} />
        )}
      />
    </Box>
  );
};
