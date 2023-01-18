import { PromptStorage } from "../models";

export const useCommandProcessing = () => {
  const history: PromptStorage[] = [];

  // TODO do not use any
  const processCommand = (value: any): boolean => {
    console.log({ value });
    return true;
  };

  return { processCommand, history };
};
