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
    console.log("process command", { rawInput });
    const newHistory: PromptStorage = {
      input: rawInput,
      statusCode: 0,
      output: `command not found: ${rawInput?.split(" ")?.[0] || ""}`,
      currentDirectory,
      previousCommandSuccessful,
      timestamp: new Date(),
    };
    setHistory([...history, newHistory]);

    setValue("hiddenInput", "");
    return true;
  };

  return { processCommand, history };
};
