import React, { useState } from "react";
import { Screen } from './components/screen'


export const Terminal = (): JSX.Element => {
  const [currentDir, _] = useState<string>("/");
  return <Screen currentDirectory={currentDir} />;
};
