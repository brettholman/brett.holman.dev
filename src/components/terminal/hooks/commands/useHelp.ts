import { CommandResponse } from "../../models/commandResponse";

export const useHelp = () => {
  const help = async (): Promise<CommandResponse> => {
    return {} as CommandResponse;
  };

  return { help };
};
