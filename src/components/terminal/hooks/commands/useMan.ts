import { CommandStatusCode } from "../../models/commandStatusCode";
import { CommandResponse } from "../../models/commandResponse";

export const useMan = () => {
  const man = (args: string[]): CommandResponse => {
    console.log({ args });
    if (args.length >= 1) {
      if (args[0] === "man") {
        return {
          output: "Come on, man. You can't man man",
          statusCode: CommandStatusCode.FAILURE,
        };
      }
    }
    return {
      output: `No manual entry for ${args[0]}`,
      statusCode: CommandStatusCode.FAILURE,
    };
  };
  return { man };
};
