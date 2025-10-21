import { CommandStatusCode } from "./commandStatusCode";

export interface CommandResponse {
  statusCode: CommandStatusCode;
  output: JSX.Element;
}
