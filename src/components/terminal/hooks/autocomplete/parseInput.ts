export type AutocompleteContext = "command" | "argument";

export interface ParsedInput {
  activeToken: string;
  commandToken: string;
  completedTokens: string[];
  argumentTokens: string[];
  context: AutocompleteContext;
  endsWithSpace: boolean;
}

const sanitizeInput = (value: string): string => value || "";

export const parseInput = (rawInput: string): ParsedInput => {
  const safeInput = sanitizeInput(rawInput);
  const endsWithSpace = safeInput.endsWith(" ");
  const rawTokens = safeInput
    .split(" ")
    .map((token) => token.trim())
    .filter((token) => token.length);

  if (!rawTokens.length && !endsWithSpace) {
    return {
      activeToken: safeInput.trim(),
      commandToken: safeInput.trim(),
      completedTokens: [],
      argumentTokens: [],
      context: "command",
      endsWithSpace,
    };
  }

  let activeToken = "";
  let completedTokens = rawTokens;

  if (!endsWithSpace && rawTokens.length) {
    activeToken = rawTokens[rawTokens.length - 1];
    completedTokens = rawTokens.slice(0, -1);
  }

  const commandFinalized = completedTokens.length > 0;
  const commandToken = commandFinalized
    ? completedTokens[0]
    : activeToken || "";

  const argumentTokens = commandFinalized
    ? completedTokens.slice(1)
    : [];

  return {
    activeToken,
    commandToken,
    completedTokens,
    argumentTokens,
    context: commandFinalized ? "argument" : "command",
    endsWithSpace,
  };
};
