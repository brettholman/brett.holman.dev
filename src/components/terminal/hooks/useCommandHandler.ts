import { CommandResponse } from "../models/commandResponse";
import { CommandStatusCode } from "../models/commandStatusCode";
import { SupportedCommands } from "../models/supportedCommands";
import { useLoadCommands } from "./commands/useLoadCommands";

interface UseCommandHandlerProps {
  setCommandHistory: () => void; // TODO better
}

export const useCommandHandler = ({
  setCommandHistory,
}: UseCommandHandlerProps) => {
  const commands = useLoadCommands({ setCommandHistory });

  const handleCommand = async (
    command: SupportedCommands | string,
    args?: string[],
    currentDirectory?: string
  ): Promise<CommandResponse | null> => {
    let response = {} as CommandResponse;
    console.log("handleCommand", { command, args, currentDirectory });
    switch (command.toLowerCase()) {
      case SupportedCommands.PWD:
        response = commands.pwd(currentDirectory || "");
        break;
      case SupportedCommands.KEXP:
        response = await commands.kexp(args);
        break;
      case SupportedCommands.CLEAR_SCREEN:
        commands.clear();
        return null;
      default:
        response.output = `command not found: ${command}`;
        response.statusCode = CommandStatusCode.FAILURE;
        break;
    }
    return response;
  };

  return { handleCommand };
};
