import { useState } from "react";
import { UseFormReturn } from "react-hook-form";
import { PromptStorage } from "../models";
import { TerminalForm } from "./useTerminalForm";
import { useCommandHandler } from "./useCommandHandler";
import { CommandStatusCode } from "../models/commandStatusCode";

export const useCommandProcessing = ({
  setValue,
  watch,
}: UseFormReturn<TerminalForm>) => {
  const [history, setCommandHistory] = useState<Array<PromptStorage>>([]);

  const clearCommandHistory = () => {
    setCommandHistory([]);
  };

  const { handleCommand } = useCommandHandler({
    setCommandHistory: clearCommandHistory,
  });

  const processCommand = async (currentDirectory: string): Promise<boolean> => {
    const rawInput = watch("hiddenInput");
    const rawCommand = rawInput
      .trim()
      .split(" ")
      .filter((_) => _ !== "");

    if (!rawCommand || rawCommand.length <= 0) {
      setValue("hiddenInput", "");
      return false;
    }

    const [command, ...args] = rawCommand;

    const response = await handleCommand(command, args);

    if (response) {
      const newHistory: PromptStorage = {
        input: rawInput,
        currentDirectory,
        previousCommandSuccessful:
          response.statusCode === CommandStatusCode.SUCCESS,
        timestamp: new Date(),
        ...response,
      };

      setCommandHistory([...history, newHistory]);
    }

    setValue("hiddenInput", "");
    return (
      response === null || response.statusCode === CommandStatusCode.SUCCESS
    );
  };

  return { processCommand, history };
};
