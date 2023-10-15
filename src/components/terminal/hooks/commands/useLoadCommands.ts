import { useClearScreen } from "./useClearScreen";
import { usePwd } from "./usePwd";
import { useKexp } from "./useKexp";
import { useHelp } from "./useHelp";

interface UseLoadCommandsProps {
  setCommandHistory: () => void; // TODO better
}

export const useLoadCommands = ({
  setCommandHistory,
}: UseLoadCommandsProps) => ({
  ...useClearScreen({ setCommandHistory }),
  ...usePwd(),
  ...useKexp(),
  ...useHelp(),
});
