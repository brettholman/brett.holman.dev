import { CommandResponse } from "../../models/commandResponse";
import { useFileManipulation } from "./useFileManipulation";
import { CommandStatusCode } from "../../models/commandStatusCode";

export const manMessage = `This message will attempt to explain how to use \`cd\` (on this site).

\`cd\` allows you to traverse the playground file structure, mimicking what you might find in a Linux file system.

It is implemented using an adjacency list to represent files/directories/parent directories within the folder structure.

You can traverse the folders by referencing the folder name that you want to move to under conditions:

The folder you want to move to must be either a child or a parent of the current folder.
You cannot make absolute path jumps, for example: \`cd /bin/$someDir\`
If you want to go up a directory, you can use \`cd ..\` this will move you up one directory.

If you want to move to a child directory, you can use \`cd bin\` (as an example from the \`/\` directory).
`;

const createCommandResponse = (
  output: string,
  statusCode: CommandStatusCode,
): CommandResponse => ({
  output,
  statusCode,
});

interface UseCdProps {
  setCurrentDirectory: (newDir: string) => void;
}

export const useCd = ({ setCurrentDirectory }: UseCdProps) => {
  const { isMoveAllowed, findCurrentLocation, convertToAbsolutePath } =
    useFileManipulation();

  const cd = (
    currentDirectory: string,
    newDirectory: Array<string>,
  ): CommandResponse => {
    if (newDirectory.length !== 1) {
      return createCommandResponse(
        `Unable to parse Arguments: ${newDirectory.join(" ")}`,
        CommandStatusCode.FAILURE,
      );
    }

    const argDir = newDirectory[0];
    const dirRef = findCurrentLocation(currentDirectory);
    if (!dirRef) {
      setCurrentDirectory("/");
      return createCommandResponse("", CommandStatusCode.FAILURE);
    }
    if (isMoveAllowed(dirRef, argDir)) {
      const updatedAbsolutePath = convertToAbsolutePath(
        currentDirectory,
        argDir,
        dirRef,
      );
      setCurrentDirectory(updatedAbsolutePath);
      return createCommandResponse("", CommandStatusCode.SUCCESS);
    } else {
      return createCommandResponse(
        `No such file file or directory: ${argDir}`,
        CommandStatusCode.FAILURE,
      );
    }
  };

  return { cd };
};
