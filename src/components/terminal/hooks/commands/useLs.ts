import { CommandResponse } from "../../models/commandResponse";
import { CommandStatusCode } from "../../models/commandStatusCode";
import { useFileManipulation } from "./useFileManipulation";

const formatOutput = (directories: string[], files: string[]) =>
  [...directories, ...files].join("\t");

export const useLs = () => {
  const { findCurrentLocation, getFilesInDirectory } = useFileManipulation();
  const ls = (directory: string): CommandResponse => {
    if (!directory) {
      return { output: "", statusCode: CommandStatusCode.FAILURE };
    }

    const dirRef = findCurrentLocation(directory);
    if (!dirRef) {
      return {
        output: `${directory}: No such file or directory`,
        statusCode: CommandStatusCode.FAILURE,
      };
    }
    return {
      output: formatOutput(dirRef.edges, getFilesInDirectory(directory)),
      statusCode: CommandStatusCode.SUCCESS,
    };
  };

  const l = (directory: string): CommandResponse => {
    if (!directory) {
      return { output: "", statusCode: CommandStatusCode.FAILURE };
    }

    const dirRef = findCurrentLocation(directory);
    if (!dirRef) {
      return {
        output: `${directory}: No such file or directory`,
        statusCode: CommandStatusCode.FAILURE,
      };
    }
    return {
      output: formatOutput(dirRef.edges, getFilesInDirectory(directory)),
      statusCode: CommandStatusCode.SUCCESS,
    };
  };

  return { ls, l };
};
