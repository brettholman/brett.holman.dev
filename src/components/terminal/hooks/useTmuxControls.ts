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
          event.preventDefault();
          break;
        case "c":
          newSessionState.tabs.push(defaultTab());
          event.preventDefault();
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
      if (event.ctrlKey && event.key === "c") {
        // handle canceling the current command
      }
    }
  };

  return { handleKeyPress, commandMode, sessionState };
};
