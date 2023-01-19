export interface PromptStorage {
  input: string;
  statusCode: 0 | 1;
  output: string;
  currentDirectory: string;
  previousCommandSuccessful: boolean;
}
