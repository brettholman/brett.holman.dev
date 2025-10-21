import React from "react";
import { CommandResponse } from "../models/commandResponse";
import { CommandStatusCode } from "../models/commandStatusCode";
import { SupportedCommands } from "../models/supportedCommands";
import { useLoadCommands } from "./commands/useLoadCommands";

interface UseCommandHandlerProps {
  currentDirectory: string;
  setCurrentDirectory: (newDir: string) => void;
  setCommandHistory: () => void; // TODO better
}

export const useCommandHandler = ({
  currentDirectory,
  setCurrentDirectory,
  setCommandHistory,
}: UseCommandHandlerProps) => {
  const { pwd, help, aboutMe, clear, cd, ls, l, man, cat } = useLoadCommands({
    currentDirectory,
    setCurrentDirectory,
    setCommandHistory,
  });

  const handleCommand = async (
    command: SupportedCommands | string,
    args: string[],
  ): Promise<CommandResponse | null> => {
    let response = {} as CommandResponse;
    console.log("handleCommand", { command, args });
    switch (command.toLowerCase()) {
      case SupportedCommands.PWD:
        response = pwd();
        break;
      case SupportedCommands.HELP:
        response = help();
        break;
      case SupportedCommands.ABOUT:
        response = aboutMe();
        break;
      case SupportedCommands.CLEAR_SCREEN:
        clear();
        return null;
      case SupportedCommands.CD:
        response = cd(currentDirectory, args);
        break;
      case SupportedCommands.LS:
        response = ls(currentDirectory);
        break;
      case SupportedCommands.L:
        response = l(currentDirectory);
        break;
      case SupportedCommands.MAN:
        response = man(args);
        break;
      case SupportedCommands.CAT:
        response = cat(args);
        break;
      default:
        response = {
          output: <span>command not found {command}</span>,
          statusCode: CommandStatusCode.FAILURE,
        };
        break;
    }
    return response;
  };

  return { handleCommand };
};
