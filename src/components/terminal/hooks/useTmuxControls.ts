import { useState } from "react";
import { SessionState, Tab } from "../models";
import { useHandleCommandMode } from "./useHandleCommandMode";

export const useTmuxControls = (
  sessionState: SessionState,
  updateSessionState: (sessionState: Partial<SessionState>) => void,
  getDefaultTab: () => Tab,
) => {
  const [commandMode, setCommandMode] = useState(false);
  const { handleCommandMode } = useHandleCommandMode({ sessionState, getDefaultTab });

  const handleKeyPress = (event: any) => {
    if (commandMode) {
      updateSessionState(handleCommandMode(event));
      setCommandMode(false);
    } else {
      if (event.ctrlKey && event.key === "a") {
        setCommandMode(true);
      }
      if (event.ctrlKey && event.key === "c") {
        // handle canceling the current command
      }
    }
  };

  return { handleKeyPress, sessionState };
};
