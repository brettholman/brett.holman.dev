import { useClearScreen } from "./useClearScreen";
import { usePwd } from "./usePwd";
import { useHelp } from "./useHelp";
import { useAboutMe } from "./useAboutMe";
import { useCd } from "./useCd";
import { useLs } from "./useLs";
import { useMan } from "./useMan";
import { useCat } from "./useCat";

interface UseLoadCommandsProps {
  currentDirectory: string;
  setCurrentDirectory: (newDir: string) => void;
  setCommandHistory: () => void; // TODO better
}

export const useLoadCommands = ({
  currentDirectory,
  setCurrentDirectory,
  setCommandHistory,
}: UseLoadCommandsProps) => ({
  ...useClearScreen({ setCommandHistory }),
  ...usePwd(currentDirectory),
  ...useHelp(),
  ...useAboutMe(),
  ...useCd({ setCurrentDirectory }),
  ...useLs(),
  ...useMan(),
  ...useCat(),
});
