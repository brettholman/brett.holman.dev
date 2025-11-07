import React from "react";
import { CommandResponse } from "../../models/commandResponse";
import { CommandStatusCode } from "../../models/commandStatusCode";
import CodeMirror from "@uiw/react-codemirror";
import { vscodeDark } from "@uiw/codemirror-theme-vscode";
import { useFetchGithubFile } from "./helpers/useFetchGithubFile";
import { useFileManipulation } from "./useFileManipulation";

const decodeContent = (content: string, encoding: string): string => {
  if (encoding !== "base64") {
    return content;
  }

  const sanitizedContent = content.replace(/\n/g, "");
  try {
    if (typeof window !== "undefined" && window.atob) {
      return window.atob(sanitizedContent);
    }
    const buffer = (globalThis as { Buffer?: BufferConstructor }).Buffer;
    if (buffer) {
      return buffer.from(sanitizedContent, "base64").toString("utf-8");
    }
  } catch (error) {
    console.error("Unable to decode GitHub file contents", error);
  }

  return "";
};

export const useCat = () => {
  const { fetchFile } = useFetchGithubFile();
  const { resolvePath, getFileFromPath } = useFileManipulation();

  const cat = async (
    currentDirectory: string,
    args: string[],
  ): Promise<CommandResponse> => {
    if (!args.length) {
      return {
        output: "cat: missing file operand",
        statusCode: CommandStatusCode.FAILURE,
      };
    }

    const targetPath = resolvePath(currentDirectory, args[0]);
    const fileRef = getFileFromPath(targetPath);

    if (!fileRef) {
      return {
        output: `cat: ${args[0]}: No such file`,
        statusCode: CommandStatusCode.FAILURE,
      };
    }

    const githubFile = await fetchFile(fileRef);

    if (!githubFile) {
      return {
        output: `cat: unable to load ${args[0]}`,
        statusCode: CommandStatusCode.FAILURE,
      };
    }

    const decodedContent = decodeContent(githubFile.content, githubFile.encoding);

    return {
      output: (
        <CodeMirror
          value={decodedContent}
          theme={vscodeDark}
          editable={false}
          basicSetup={{ lineNumbers: true }}
        />
      ),
      statusCode: CommandStatusCode.SUCCESS,
    };
  };

  return { cat };
};
