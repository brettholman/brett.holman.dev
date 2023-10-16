import { useAboutMe } from "./commands/useAboutMe";
import { useHelp } from "./commands/useHelp";
import { useWelcome } from "./commands/useWelcome";
import { useConvertToHistory } from "./useConvertToHistory";

export const useGetDefaultSession = () => {
  const { aboutMe } = useAboutMe();
  const { help } = useHelp();
  const { welcome } = useWelcome();
  const { convertToHistory } = useConvertToHistory();

  return {
    defaultSession: {
      activeTabIndex: 0,
      tabs: [
        {
          name: "help",
          history: [
            convertToHistory(welcome(), "welcome"),
            convertToHistory(help(), "help"),
          ],
        },
        { name: "about", history: [convertToHistory(aboutMe(), "about")] },
        { name: "sh", history: [] },
      ],
    },
  };
};
