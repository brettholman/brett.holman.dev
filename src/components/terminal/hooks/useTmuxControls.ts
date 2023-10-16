import { useState } from "react";
import { SessionState } from "../models";

export const useTmuxControls = (
  sessionState: SessionState,
  updateSessionState: (sessionState: Partial<SessionState>) => void
) => {
  const [commandMode, setCommandMode] = useState(false);

  const handleKeyPress = (event: any) => {
    const newSessionState = sessionState;
    if (commandMode) {
      switch (event.key) {
        case "n":
          newSessionState.activeTabIndex =
            newSessionState.activeTabIndex + 1 >= newSessionState.tabs.length
              ? 0
              : newSessionState.activeTabIndex + 1;
          break;
        case "c":
          newSessionState.tabs.push({ name: "sh", history: [] });
          break;
        case ",":
          // TODO rename tab mode
          break;
        case "|":
          break;
        case "-":
          break;
        default:
          console.log("catch all");
      }
      setCommandMode(false);
      updateSessionState(newSessionState);
    } else {
      if (event.ctrlKey && event.key === "a") {
        setCommandMode(true);
      }
    }
  };

  return { handleKeyPress, commandMode, sessionState };
};
