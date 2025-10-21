import { GithubFile } from "./githubFile";
export interface GithubRepo {
  sha: string;
  url: string;
  tree: Array<GithubFile>;
  truncated: boolean;
}
