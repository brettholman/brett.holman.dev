import { CommandResponse } from "../../models/commandResponse";

interface UseClearScreenProps {
  setCommandHistory: () => void;
}

export const useClearScreen = ({ setCommandHistory }: UseClearScreenProps) => {
  const clear = (): Promise<CommandResponse | null> => {
    console.log("calling clear");
    setCommandHistory();
    return Promise.resolve(null);
  };

  return { clear };
};
