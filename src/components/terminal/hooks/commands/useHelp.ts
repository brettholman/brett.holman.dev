import { CommandResponse } from "../../models/commandResponse";
import { CommandStatusCode } from "../../models/commandStatusCode";

const output = `There are various commands that are supported. Providing the argument "help" to any command will also provide additional context.
Currently the list of supported commands are as follows:
  - help (prints this message, no arguments accepted at this time)
  - about
  - pwd
  - clear
Give any of the commands a shot! You can start typing at any point (or navigate below to choose a different tab)`;

export const useHelp = () => {
  const help = (): CommandResponse => {
    return { output, statusCode: CommandStatusCode.SUCCESS } as CommandResponse;
  };

  return { help };
};
