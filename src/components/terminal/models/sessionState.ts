import { PromptStorage } from "./promptStorage";

export interface Tab {
  name: string;
  currentDirectory: string;
  history: Array<PromptStorage>;
}

interface ISessionState {
  getActiveTab: () => Tab;
}

export class SessionState implements ISessionState {
  activeTabIndex: number = 0;
  tabs: Array<Tab> = [];

  constructor(tabs: Array<Tab>) {
    this.activeTabIndex = 0;
    this.tabs = tabs;
  }

  getActiveTab = (): Tab => {
    return this.tabs[this.activeTabIndex];
  };
}
