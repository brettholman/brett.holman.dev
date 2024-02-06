import { Tab } from "../../models";
import { PromptInput } from "./input/promptInput";
import { InputContext } from "./input/inputContext";

type PromptProps = {
  currentDirectory: string;
  previousCommandSuccessful: boolean;
  tab: Tab;
};

export const Propmt = ({
  currentDirectory,
  previousCommandSuccessful,
  tab,
}: PromptProps) => {
  return (
    <>
      <InputContext
        currentDirectory={currentDirectory}
        previousCommandSuccessful={previousCommandSuccessful}
      />
      <PromptInput tab={tab} />
    </>
  );
};
