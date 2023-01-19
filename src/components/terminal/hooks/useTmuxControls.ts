import { useState } from "react";

export const useTmuxControls = () => {
  const [commandMode, setCommandMode] = useState(false);

  const handleKeyPress = (event: any) => {
    if (commandMode) {
      switch (event.key) {
        case "n":
          console.log("switch tabs");
          break;
        case "c":
          console.log("create new tab");
          break;
        case ",":
          console.log("rename window");
          break;
        case "|":
          console.log("split window vertical");
          break;
        case "-":
          console.log("split window horizontal");
          break;
        default:
          console.log("catch all");
      }
      setCommandMode(false);
    }
    if (event.ctrlKey && event.key === "a") {
      setCommandMode(true);
    }
    if (event.ctrlKey && event.key === "l") {
      setCommandMode(false);
    }
  };

  return { handleKeyPress, commandMode };
};
