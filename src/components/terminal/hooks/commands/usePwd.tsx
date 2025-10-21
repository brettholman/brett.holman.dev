import React from "react";
import { CommandStatusCode } from "../../models/commandStatusCode";

export const usePwd = (currentDirectory: string) => {
  const pwd = () => {
    const statusCode = CommandStatusCode.SUCCESS;
    return { output: <span>{currentDirectory}</span>, statusCode };
  };

  return { pwd };
};
