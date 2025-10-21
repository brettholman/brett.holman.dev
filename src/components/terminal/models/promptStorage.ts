import { CommandStatusCode } from "./commandStatusCode";

export interface PromptStorage {
  input: string;
  statusCode: CommandStatusCode;
  output: JSX.Element;
  currentDirectory: string;
  previousCommandSuccessful: boolean;
  timestamp: Date;
}
