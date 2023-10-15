import { CommandStatusCode } from "../../models/commandStatusCode";

export const usePwd = () => {
  const pwd = (currentDirectory: string) => {
    const output = "this is some output";
    const statusCode = CommandStatusCode.SUCCESS;
    return { output, statusCode };
  };

  return { pwd };
};
