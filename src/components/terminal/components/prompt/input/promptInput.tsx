import { Box } from "@mui/material";
import Input from "@mui/material/Input";
import { useEffect } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { Tab } from "../../../models";

interface PromptInputProps {
  tab: Tab;
}

export const PromptInput = ({ tab }: PromptInputProps) => {
  const { register, watch } = useFormContext();

  const currentValue = watch("hiddenInput") || "";

  useEffect(() => {
    if (tab) {
      tab.inputBuffer = currentValue;
    }
  }, [currentValue]);

  return (
    <Box style={{ height: "0px", width: "0px" }}>
      <Input autoFocus {...register("hiddenInput")} value={currentValue} />
    </Box>
  );
};
