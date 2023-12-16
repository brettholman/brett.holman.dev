import { CommandStatusCode } from "../../models/commandStatusCode";

export const usePwd = (currentDirectory: string) => {
  const pwd = () => {
    const statusCode = CommandStatusCode.SUCCESS;
    return { output: currentDirectory, statusCode };
  };

  return { pwd };
};
