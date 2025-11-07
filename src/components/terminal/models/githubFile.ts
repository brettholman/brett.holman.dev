export interface GithubFile {
  path: string;
  mode: string;
  type: string;
  sha: string;
  size: string;
  url: string;
  isLocal: boolean;
}

export interface GithubFileWithRepo extends GithubFile {
  repo: string;
}

export interface GithubBlob {
  content: string;
  encoding: string;
  size: number;
  url: string;
}
