import { SessionState, Tab } from "../models";

interface UseHandleCommandModeInput {
  sessionState: SessionState,
  getDefaultTab: () => Tab,
}

export const useHandleCommandMode = ({ sessionState, getDefaultTab }: UseHandleCommandModeInput) => {
  const handleCommandMode = (event: any): Partial<SessionState> => {
    const newSessionState: SessionState = sessionState;
    switch (event.key) {
      case "n":
        newSessionState.activeTabIndex =
          newSessionState.activeTabIndex + 1 >= newSessionState.tabs.length
            ? 0
            : newSessionState.activeTabIndex + 1;
        break;
      case "c":
        newSessionState.tabs.push(getDefaultTab());
        newSessionState.activeTabIndex = newSessionState.tabs.length - 1;
        break;
      // TODO - do I want to support this? Seems silly.
      case "1":
      case "2":
      case "3":
      case "4":
      case "5":
      case "6":
      case "7":
      case "8":
      case "9":
        newSessionState.activeTabIndex = +event.key - 1
        break;
      default:
        console.log("catch all");
    }
    event.preventDefault();
    return newSessionState;
  }
  return { handleCommandMode };
}
