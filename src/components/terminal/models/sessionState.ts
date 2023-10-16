import { PromptStorage } from "./promptStorage";

interface Tab {
  name: string;
  history: Array<PromptStorage>;
}

export interface SessionState {
  activeTabIndex: number;
  tabs: Array<Tab>;
}
