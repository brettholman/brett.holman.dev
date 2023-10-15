import { useState } from "react";
import { SessionState } from "../models";

export const useTmuxControls = () => {
  const [commandMode, setCommandMode] = useState(false);
  const [sessionState, setSessionState] = useState({} as SessionState);

  const handleKeyPress = (event: any) => {
    const newSessionState = sessionState;
    if (commandMode) {
      switch (event.key) {
        case "n":
          break;
        case "c":
          break;
        case ",":
          break;
        case "|":
          break;
        case "-":
          break;
        default:
          console.log("catch all");
      }
      setCommandMode(false);
      setSessionState(newSessionState);
    } else {
      if (event.ctrlKey && event.key === "a") {
        setCommandMode(true);
      }
    }
  };

  return { handleKeyPress, commandMode, sessionState };
};
