import React from "react";
import { CommandResponse } from "../../models/commandResponse";
import { CommandStatusCode } from "../../models/commandStatusCode";

import CodeMirror from "@uiw/react-codemirror";
import { vscodeDark } from "@uiw/codemirror-theme-vscode";

export const useCat = () => {
  const code = "console.log('');";
  const cat = (args: string[]): CommandResponse => {
    return {
      output: <CodeMirror value={code} theme={vscodeDark}></CodeMirror>,
      statusCode: CommandStatusCode.SUCCESS,
    };
  };

  return { cat };
};
