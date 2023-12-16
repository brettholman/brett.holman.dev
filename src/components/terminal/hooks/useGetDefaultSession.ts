import { SessionState, Tab } from "../models";
import { useAboutMe } from "./commands/useAboutMe";
import { useWelcome } from "./commands/useWelcome";
import { useConvertToHistory } from "./useConvertToHistory";

export const useGetDefaultSession = () => {
  const { aboutMe } = useAboutMe();
  const { welcome } = useWelcome();
  const { convertToHistory } = useConvertToHistory();

  const getDefaultTab = (): Tab => ({
    name: "sh", currentDirectory: "/", history: [], inputBuffer: ""
  });

  const defaultTabs: Array<Tab> = [
    {
      name: "welcome",
      currentDirectory: "/",
      history: [
        convertToHistory(welcome(), "welcome"),
      ],
      inputBuffer: ""
    },
    {
      name: "about",
      currentDirectory: "/",
      history: [convertToHistory(aboutMe(), "about")],
      inputBuffer: ""
    },
    getDefaultTab(),
  ];

  const defaultSessionState = new SessionState(defaultTabs);

  return { defaultSessionState, getDefaultTab };
};
