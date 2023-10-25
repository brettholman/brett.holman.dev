import { SessionState, Tab } from "../models";
import { useAboutMe } from "./commands/useAboutMe";
import { useHelp } from "./commands/useHelp";
import { useWelcome } from "./commands/useWelcome";
import { useConvertToHistory } from "./useConvertToHistory";

export const useGetDefaultSession = (): SessionState => {
  const { aboutMe } = useAboutMe();
  const { help } = useHelp();
  const { welcome } = useWelcome();
  const { convertToHistory } = useConvertToHistory();

  const defaultTabs: Array<Tab> = [
    {
      name: "help",
      currentDirectory: "/",
      history: [
        convertToHistory(welcome(), "welcome"),
        convertToHistory(help(), "help"),
      ],
    },
    {
      name: "about",
      currentDirectory: "/home",
      history: [convertToHistory(aboutMe(), "about")],
    },
    { name: "sh", currentDirectory: "/Users/brett.holman", history: [] },
  ];

  return new SessionState(defaultTabs);
};
