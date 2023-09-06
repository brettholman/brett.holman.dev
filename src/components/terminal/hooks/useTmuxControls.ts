import { useState } from "react";
import { SessionState } from "../models";

export const useTmuxControls = () => {
  const [commandMode, setCommandMode] = useState(false);
  const [sessionState, setSessionState] = useState({} as SessionState);

  console.log({ commandMode });

  const handleKeyPress = (event: any) => {
    console.log({ commandMode, value: event.key, ctrl: event.ctrlKey });
    const newSessionState = sessionState;
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
      setSessionState(newSessionState);
    } else {
      if (event.ctrlKey && event.key === "a") {
        console.log("settingCommandMode");
        setCommandMode(true);
      }
    }
  };

  return { handleKeyPress, commandMode, sessionState };
};
