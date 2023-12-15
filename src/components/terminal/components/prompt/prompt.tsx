import { Tab } from "../../models";
import { PromptInput } from "./input/promptInput";
import { InputContext } from "./input/inputContext";

type PromptProps = {
  currentDirectory: string;
  focused: boolean;
  previousCommandSuccessful: boolean;
  tab: Tab;
};

export const Propmt = ({
  currentDirectory,
  previousCommandSuccessful,
  focused,
  tab,
}: PromptProps) => {
  return (
    <>
      <InputContext currentDirectory={currentDirectory} previousCommandSuccessful={previousCommandSuccessful} focused={focused} />
      <PromptInput tab={tab} />
    </>
  );
};
