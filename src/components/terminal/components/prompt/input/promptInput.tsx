import { Box } from "@mui/material";
import Input from "@mui/material/Input";
import { useEffect, KeyboardEvent } from "react";
import { useFormContext } from "react-hook-form";
import { Tab } from "../../../models";
import { TerminalForm } from "../../../hooks/useTerminalForm";
import { useTabCompletion } from "../../../hooks/autocomplete/useTabCompletion";

interface PromptInputProps {
  tab: Tab;
  onSuggestions: (suggestions: string[]) => void;
}

export const PromptInput = ({ tab, onSuggestions }: PromptInputProps) => {
  const { register, watch, setValue } = useFormContext<TerminalForm>();
  const currentValue = watch("hiddenInput") || "";

  const { handleTabComplete, resetCycle } = useTabCompletion({
    tab,
    setValue,
    onSuggestions,
  });

  const inputRegistration = register("hiddenInput");

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Tab") {
      handleTabComplete(event, currentValue);
      return;
    }
    resetCycle();
    onSuggestions([]);
    inputRegistration.onKeyDown?.(event);
  };

  useEffect(() => {
    if (tab) {
      tab.inputBuffer = currentValue;
    }
  }, [currentValue, tab]);

  return (
    <Box style={{ height: "0px", width: "0px" }}>
      <Input
        autoFocus
        {...inputRegistration}
        value={currentValue}
        onKeyDown={handleKeyDown}
      />
    </Box>
  );
};
