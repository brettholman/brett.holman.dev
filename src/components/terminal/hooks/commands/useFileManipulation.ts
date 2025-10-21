import { useEffect, useMemo, useState } from "react";
import fileJson from "../../static/fileStructure.json";
import {
  RepositoryName,
  useLoadGithubFiles,
} from "./helpers/useLoadGithubFiles";
import { GithubFile } from "../../models/githubFile";

interface GraphNode {
  parent: string;
}

export interface Directory extends GraphNode {
  edges: Array<string>;
}

const PARENT_DIR = "..";
const ROOT_DIR = "/";

export const useFileManipulation = () => {
  const { repos, loading } = useLoadGithubFiles();

  const [fileStructure, setFileStructure] =
    useState<Record<string, Array<GithubFile | Directory>>>(fileJson);

  const loadGithubRepos = () => {
    Object.entries(repos).map(([repoName, githubRepo]) => {
      console.log(`loading ${repoName}`);
      fileStructure[repoName] = githubRepo.tree;
    });
  };

  useEffect(() => {
    if (Object.keys(repos).length == Object.keys(RepositoryName).length)
      loadGithubRepos();
  }, [loading]);

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
