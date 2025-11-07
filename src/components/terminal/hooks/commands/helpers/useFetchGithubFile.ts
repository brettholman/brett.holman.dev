import axios from "axios";
import {
  GithubBlob,
  GithubFileWithRepo,
} from "../../../models/githubFile";

export const useFetchGithubFile = () => {
  const fetchFile = async (
    file?: GithubFileWithRepo,
  ): Promise<GithubBlob | null> => {
    if (!file) {
      return null;
    }

    try {
      const response = await axios.get<GithubBlob>(
        `https://api.github.com/repos/brettholman/${file.repo}/git/blobs/${file.sha}`,
      );
      return response.data;
    } catch (error) {
      console.error("Failed to fetch GitHub file", error);
      return null;
    }
  };

  return { fetchFile };
};
