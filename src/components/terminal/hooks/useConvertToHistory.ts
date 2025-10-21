import { PromptStorage } from "../models";
import { CommandResponse } from "../models/commandResponse";
import { CommandStatusCode } from "../models/commandStatusCode";

export const useConvertToHistory = () => {
  const convertToHistory = (
    response: CommandResponse,
    input: string,
    currentDirectory = "/",
  ): PromptStorage => ({
    input,
    currentDirectory,
    previousCommandSuccessful:
      response.statusCode === CommandStatusCode.SUCCESS,
    timestamp: new Date(),
    ...response,
  });

  return { convertToHistory };
};
