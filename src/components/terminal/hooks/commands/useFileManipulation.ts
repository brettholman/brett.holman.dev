import fileJson from "../../static/fileStructure.json";

interface GraphNode {
  parent: string;
}

export interface File {}

export interface Directory extends GraphNode {
  edges: Array<string>;
}

const PARENT_DIR = "..";
const ROOT_DIR = "/";

export const useFileManipulation = () => {
  const fileStructure: Record<string, Array<File | Directory>> = fileJson;

  const findCurrentLocation = (
    absoluteCurrentDirectory: String,
  ): Directory | null => {
    let currentDirectoryKey: string;
    const splitDirectoryKey = absoluteCurrentDirectory
      .split("/")
      .filter((_) => _);

    // In the case we're in the root directory fall back to manually setting the key value as '/'
    if (absoluteCurrentDirectory === ROOT_DIR) {
      currentDirectoryKey = ROOT_DIR;
    } else {
      currentDirectoryKey = `/${
        splitDirectoryKey[splitDirectoryKey.length - 1]
      }`;
    }
    const foundReference = fileStructure[currentDirectoryKey]?.[0];

    return foundReference && "edges" in foundReference
      ? (foundReference as Directory)
      : null;
  };

  const isMoveAllowed = (
    directory: Directory,
    nextDirectory: string,
  ): boolean => {
    if (nextDirectory === "..") {
      return !!directory.parent;
    }
    return directory.edges.includes(nextDirectory);
  };

  const convertToAbsolutePath = (
    currentDirectory: string,
    directoryToMoveTo: string,
    dirRef: Directory,
  ): string => {
    switch (directoryToMoveTo) {
      case PARENT_DIR:
        return dirRef.parent;
      case ROOT_DIR:
        return ROOT_DIR;
      default:
        const splitValue = currentDirectory === ROOT_DIR ? "" : "/";
        return `${currentDirectory}${splitValue}${directoryToMoveTo}`;
    }
  };

  return { findCurrentLocation, isMoveAllowed, convertToAbsolutePath };
};
