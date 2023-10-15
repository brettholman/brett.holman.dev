import { CommandStatusCode } from "./commandStatusCode";

export interface PromptStorage {
  input: string;
  statusCode: CommandStatusCode;
  output: string;
  currentDirectory: string;
  previousCommandSuccessful: boolean;
  timestamp: Date;
}
