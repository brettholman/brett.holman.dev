import { useClearScreen } from "./useClearScreen";
import { usePwd } from "./usePwd";
import { useHelp } from "./useHelp";
import { useAboutMe } from "./useAboutMe";

interface UseLoadCommandsProps {
  currentDirectory: string;
  setCommandHistory: () => void; // TODO better
}

export const useLoadCommands = ({
  currentDirectory,
  setCommandHistory,
}: UseLoadCommandsProps) => ({
  ...useClearScreen({ setCommandHistory }),
  ...usePwd(currentDirectory),
  ...useHelp(),
  ...useAboutMe(),
});
