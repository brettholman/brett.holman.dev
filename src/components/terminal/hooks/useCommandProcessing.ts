import { UseFormReturn } from "react-hook-form";
import { PromptStorage, SessionState } from "../models";
import { TerminalForm } from "./useTerminalForm";
import { useCommandHandler } from "./useCommandHandler";
import { CommandStatusCode } from "../models/commandStatusCode";
import { useConvertToHistory } from "./useConvertToHistory";

interface Props {
  sessionState: SessionState;
  updateSessionState: (_: Partial<SessionState>) => void;
}

export const useCommandProcessing = ({
  setValue,
  watch,
  sessionState,
  updateSessionState,
}: UseFormReturn<TerminalForm> & Props) => {
  const clearCommandHistory = () => {
    sessionState.getActiveTab().history = [];
    updateSessionState(sessionState);
  };

  const setCurrentDirectory = (newDir: string): void => {
    sessionState.getActiveTab().currentDirectory = newDir;
    updateSessionState(sessionState);
  };

  const { handleCommand } = useCommandHandler({
    currentDirectory: sessionState.getActiveTab().currentDirectory,
    setCurrentDirectory,
    setCommandHistory: clearCommandHistory,
  });

  const { convertToHistory } = useConvertToHistory();

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
      const newHistory: PromptStorage = convertToHistory(
        response,
        rawInput,
        currentDirectory,
      );

      sessionState.getActiveTab().history.push(newHistory);
    }

    setValue("hiddenInput", "");
    return (
      response === null || response.statusCode === CommandStatusCode.SUCCESS
    );
  };

  return {
    processCommand,
    history: sessionState.tabs[sessionState.activeTabIndex].history,
  };
};
