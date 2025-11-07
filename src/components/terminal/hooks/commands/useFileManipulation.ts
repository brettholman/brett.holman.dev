import { useEffect, useMemo, useState } from "react";
import fileJson from "../../static/fileStructure.json";
import {
  RepositoryName,
  useLoadGithubFiles,
} from "./helpers/useLoadGithubFiles";
import {
  GithubFile,
  GithubFileWithRepo,
} from "../../models/githubFile";
import { GithubRepo } from "../../models/githubRepo";

interface GraphNode {
  parent: string;
}

export interface Directory extends GraphNode {
  edges: Array<string>;
}

const PARENT_DIR = "..";
const ROOT_DIR = "/";

type FileStructure = Record<string, Directory>;
type DirectoryFiles = Record<string, Array<string>>;
type FileLookup = Record<string, GithubFileWithRepo>;

const cloneStructure = (structure: FileStructure): FileStructure =>
  Object.entries(structure).reduce((acc, [path, directory]) => {
    acc[path] = {
      parent: directory.parent,
      edges: [...directory.edges],
    };
    return acc;
  }, {} as FileStructure);

const joinPaths = (base: string, next: string): string => {
  if (!next) {
    return base;
  }
  if (base === ROOT_DIR) {
    return `${ROOT_DIR}${next}`;
  }
  return `${base}/${next}`;
};

const ensureDirectory = (
  structure: FileStructure,
  path: string,
  parent: string,
): void => {
  if (!structure[path]) {
    structure[path] = { parent, edges: [] };
  }
};

const addEdgeToDirectory = (
  structure: FileStructure,
  path: string,
  child: string,
): void => {
  if (!structure[path]) {
    return;
  }
  if (!structure[path].edges.includes(child)) {
    structure[path].edges = [...structure[path].edges, child].sort();
  }
};

const addFileToDirectory = (
  filesByDirectory: DirectoryFiles,
  directory: string,
  fileName: string,
) => {
  const files = filesByDirectory[directory] || [];
  if (!files.includes(fileName)) {
    filesByDirectory[directory] = [...files, fileName].sort();
  }
};

const buildVirtualFileSystem = (
  baseStructure: FileStructure,
  repos: Record<RepositoryName, GithubRepo>,
) => {
  const directories = cloneStructure(baseStructure);
  const filesByDirectory: DirectoryFiles = {};
  const fileLookup: FileLookup = {};

  Object.entries(repos).forEach(([repoKey, repo]) => {
    const repoName = repoKey as RepositoryName;

    ensureDirectory(directories, "/repos", ROOT_DIR);
    addEdgeToDirectory(directories, "/repos", repoName);

    const basePath = joinPaths("/repos", repoName);
    ensureDirectory(directories, basePath, "/repos");

    repo.tree.forEach((node) => {
      const segments = node.path.split("/").filter((segment) => segment);
      if (!segments.length) {
        return;
      }

      let parentPath = basePath;

      segments.forEach((segment, index) => {
        const isLeaf = index === segments.length - 1;
        const absolutePath = joinPaths(parentPath, segment);

        if (isLeaf && node.type === "blob") {
          addFileToDirectory(filesByDirectory, parentPath, segment);
          fileLookup[absolutePath] = { ...node, repo: repoName };
          return;
        }

        ensureDirectory(directories, absolutePath, parentPath);
        addEdgeToDirectory(directories, parentPath, segment);
        parentPath = absolutePath;
      });
    });
  });

  return { directories, filesByDirectory, fileLookup };
};

const normalizePath = (basePath: string, targetPath: string): string => {
  const baseSegments = basePath.split("/").filter((segment) => segment);
  const isAbsoluteTarget = targetPath.startsWith(ROOT_DIR);
  const workingSegments = isAbsoluteTarget ? [] : [...baseSegments];
  const targetSegments = targetPath.split("/").filter((segment) => segment);

  targetSegments.forEach((segment) => {
    if (segment === ".") {
      return;
    }
    if (segment === "..") {
      workingSegments.pop();
      return;
    }
    workingSegments.push(segment);
  });

  return workingSegments.length
    ? `${ROOT_DIR}${workingSegments.join("/")}`
    : ROOT_DIR;
};

export const useFileManipulation = () => {
  const { repos, loading } = useLoadGithubFiles();

  const baseStructure = useMemo(
    () => cloneStructure(fileJson as FileStructure),
    [],
  );

  const [fileStructure, setFileStructure] =
    useState<FileStructure>(baseStructure);
  const [filesByDirectory, setFilesByDirectory] = useState<DirectoryFiles>({});
  const [fileLookup, setFileLookup] = useState<FileLookup>({});

  useEffect(() => {
    if (!loading && Object.keys(repos).length) {
      const { directories, filesByDirectory, fileLookup } =
        buildVirtualFileSystem(baseStructure, repos);
      setFileStructure(directories);
      setFilesByDirectory(filesByDirectory);
      setFileLookup(fileLookup);
    }
  }, [loading, repos, baseStructure]);

  const findCurrentLocation = (
    absoluteCurrentDirectory: string,
  ): Directory | null => {
    return fileStructure[absoluteCurrentDirectory] || null;
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
        return dirRef.parent || ROOT_DIR;
      case ROOT_DIR:
        return ROOT_DIR;
      default:
        const splitValue = currentDirectory === ROOT_DIR ? "" : "/";
        return `${currentDirectory}${splitValue}${directoryToMoveTo}`;
    }
  };

  const getFilesInDirectory = (directory: string): Array<string> =>
    filesByDirectory[directory] || [];

  const getFileFromPath = (
    absolutePath: string,
  ): GithubFileWithRepo | undefined => fileLookup[absolutePath];

  const resolvePath = (currentDirectory: string, targetPath: string): string =>
    normalizePath(currentDirectory, targetPath);

  return {
    findCurrentLocation,
    isMoveAllowed,
    convertToAbsolutePath,
    getFilesInDirectory,
    getFileFromPath,
    resolvePath,
  };
};
