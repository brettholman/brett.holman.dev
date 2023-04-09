import { useState } from "react";
import { UseFormReturn } from "react-hook-form";
import { PromptStorage } from "../models";
import { TerminalForm } from "./useTerminalForm";

export const useCommandProcessing = ({
  getValues,
  setValue,
}: UseFormReturn<TerminalForm>) => {
  const [history, setHistory] = useState<Array<PromptStorage>>([]);

  const processCommand = (
    currentDirectory: string,
    previousCommandSuccessful: boolean
  ): boolean => {
    const rawInput = getValues().hiddenInput;
    const newHistory: PromptStorage = {
      input: rawInput,
      statusCode: 0,
      output: `command not found: ${rawInput}`,
      currentDirectory,
      previousCommandSuccessful,
    };
    setHistory([...history, newHistory]);

    setValue("hiddenInput", "");
    return true;
  };

  return { processCommand, history };
};
