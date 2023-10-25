import { useState } from "react";
import { SessionState, Tab } from "../models";

const defaultTab = (): Tab => ({
  name: "sh",
  history: [],
  currentDirectory: "/",
});

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
          newSessionState.tabs.push(defaultTab());
          break;
        case ",":
          // TODO rename tab mode
          break;
        // TODO handle pane splitting
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
