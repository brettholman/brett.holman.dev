import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import { GithubRepo } from "../../../models/githubRepo";

export enum RepositoryName {
  dotfiles = "dotfiles",
  personalSite = "brett.holman.dev",
}

const getRepoUrl = (repoName: RepositoryName) =>
  `https://api.github.com/repos/brettholman/${repoName}/git/trees/master\?recursive\=1`;

export const useLoadGithubFiles = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [repos, setRepos] = useState<Record<RepositoryName, GithubRepo>>(
    {} as Record<RepositoryName, GithubRepo>,
  );

  const fetchRepos = async () => {
    setIsLoading(true);
    const responses = await Promise.all(
      Object.values(RepositoryName).map(async (repo) => {
        const repoFetch = (await axios.get<GithubRepo>(getRepoUrl(repo))).data;
        const tree = repoFetch.tree
          .map((file) => ({
            ...file,
            isLocal: false,
          }))
          .sort((a, b) => (a.path < b.path ? -1 : 1));
        return [repo, { ...repoFetch, tree }] as const;
      }),
    );

    setRepos((prev) => {
      const nextRepos = { ...prev };
      responses.forEach(([repo, repoFetch]) => {
        nextRepos[repo] = repoFetch;
      });
      return nextRepos;
    });
    setIsLoading(false);
  };

  useEffect(() => {
    console.log("useLoadGithubFiles useEffect");
    if (
      !isLoading &&
      Object.keys(repos).length != Object.keys(RepositoryName).length
    )
      fetchRepos();
  }, []);

  return { repos, loading: isLoading };
};
