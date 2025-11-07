import { useCallback, useMemo, useRef, KeyboardEvent } from "react";
import { UseFormSetValue } from "react-hook-form";
import { Tab } from "../../models";
import { TerminalForm } from "../useTerminalForm";
import { SupportedCommands } from "../../models/supportedCommands";
import { useFileManipulation } from "../commands/useFileManipulation";
import { parseInput } from "./parseInput";

interface UseTabCompletionArgs {
  tab: Tab;
  setValue: UseFormSetValue<TerminalForm>;
  onSuggestions: (suggestions: string[]) => void;
}

interface CycleState {
  matches: string[];
  activeToken: string;
  baseValue: string;
  options: { appendSpace?: boolean };
  index: number;
}

const replaceActiveToken = (
  currentValue: string,
  activeToken: string,
  replacement: string,
) => {
  if (!activeToken.length) {
    return `${currentValue}${replacement}`;
  }
  return `${currentValue.slice(0, currentValue.length - activeToken.length)}${replacement}`;
};

const longestCommonPrefix = (values: string[]) => {
  if (!values.length) {
    return "";
  }
  return values.reduce((prefix, value) => {
    let nextPrefix = prefix;
    while (value.indexOf(nextPrefix) !== 0 && nextPrefix.length) {
      nextPrefix = nextPrefix.slice(0, nextPrefix.length - 1);
    }
    return nextPrefix;
  });
};

export const useTabCompletion = ({
  tab,
  setValue,
  onSuggestions,
}: UseTabCompletionArgs) => {
  const { findCurrentLocation, getFilesInDirectory, resolvePath } =
    useFileManipulation();

  const commands = useMemo(
    () => Object.values(SupportedCommands).sort(),
    [],
  );

  const cycleStateRef = useRef<CycleState | null>(null);

  const resetCycle = useCallback(() => {
    cycleStateRef.current = null;
  }, []);

  const setInputValue = useCallback(
    (value: string) => {
      setValue("hiddenInput", value, {
        shouldDirty: true,
        shouldTouch: true,
        shouldValidate: false,
      });
    },
    [setValue],
  );

  const finalizeReplacement = useCallback(
    (
      nextValue: string,
      {
        appendSpace,
        preserveSuggestions = false,
      }: { appendSpace?: boolean; preserveSuggestions?: boolean } = {},
    ) => {
      const valueWithSuffix =
        appendSpace && !nextValue.endsWith(" ")
          ? `${nextValue} `
          : nextValue;
      setInputValue(valueWithSuffix);
      if (!preserveSuggestions) {
        resetCycle();
        onSuggestions([]);
      }
    },
    [onSuggestions, resetCycle, setInputValue],
  );

  const getPathSuggestions = useCallback(
    (
      token: string,
      {
        includeFiles = false,
        includeDirectories = true,
      }: { includeFiles?: boolean; includeDirectories?: boolean },
    ): string[] => {
      const normalizedToken = token || "";
      const slashIndex = normalizedToken.lastIndexOf("/");
      const hasSlash = slashIndex >= 0;
      const displayBase = hasSlash
        ? normalizedToken.slice(0, slashIndex + 1)
        : "";
      const pathWithoutTrailingSlash = hasSlash
        ? normalizedToken.slice(0, slashIndex)
        : "";

      const isAbsolute = normalizedToken.startsWith("/");
      const baseTarget = isAbsolute
        ? pathWithoutTrailingSlash || "/"
        : pathWithoutTrailingSlash;

      const baseDirectory = isAbsolute
        ? baseTarget
        : baseTarget
        ? resolvePath(tab.currentDirectory, baseTarget)
        : tab.currentDirectory;

      const directory = findCurrentLocation(baseDirectory);
      if (!directory) {
        return [];
      }

      const partialName = hasSlash
        ? normalizedToken.slice(slashIndex + 1)
        : normalizedToken;

      const directoryEntries =
        includeDirectories !== false ? directory.edges : [];
      const parentEntries =
        includeDirectories !== false && directory.parent
          ? [".."]
          : [];
      const fileEntries = includeFiles
        ? getFilesInDirectory(baseDirectory)
        : [];

      const candidates = Array.from(
        new Set([...parentEntries, ...directoryEntries, ...fileEntries]),
      );

      return candidates
        .filter((name) =>
          partialName ? name.startsWith(partialName) : true,
        )
        .map((name) => `${displayBase}${name}`);
    },
    [
      findCurrentLocation,
      getFilesInDirectory,
      resolvePath,
      tab.currentDirectory,
    ],
  );

  const cycleThroughMatches = useCallback(
    (direction: 1 | -1) => {
      const state = cycleStateRef.current;
      if (!state || !state.matches.length) {
        return false;
      }

      const nextIndex =
        (state.index + direction + state.matches.length) %
        state.matches.length;

      cycleStateRef.current = { ...state, index: nextIndex };

      const replacement = state.matches[nextIndex];
      const nextValue = replaceActiveToken(
        state.baseValue,
        state.activeToken,
        replacement,
      );

      finalizeReplacement(nextValue, {
        ...state.options,
        preserveSuggestions: true,
      });

      return true;
    },
    [finalizeReplacement],
  );

  const applyMatches = useCallback(
    (
      matches: string[],
      currentValue: string,
      activeToken: string,
      options: { appendSpace?: boolean },
    ) => {
      if (!matches.length) {
        resetCycle();
        onSuggestions([]);
        return;
      }

      if (matches.length === 1) {
        resetCycle();
        const nextValue = replaceActiveToken(
          currentValue,
          activeToken,
          matches[0],
        );
        finalizeReplacement(nextValue, options);
        return;
      }

      onSuggestions(matches);
      let cycleBaseValue = currentValue;
      let cycleToken = activeToken;
      const prefix = longestCommonPrefix(matches);

      if (prefix && prefix.length > activeToken.length) {
        const nextValue = replaceActiveToken(
          currentValue,
          activeToken,
          prefix,
        );
        setInputValue(nextValue);
        cycleBaseValue = nextValue;
        cycleToken = prefix;
      }

      cycleStateRef.current = {
        matches,
        baseValue: cycleBaseValue,
        activeToken: cycleToken,
        options,
        index: -1,
      };
    },
    [finalizeReplacement, onSuggestions, resetCycle, setInputValue],
  );

  const handleTabComplete = useCallback(
    (event: KeyboardEvent<HTMLInputElement>, currentValue: string) => {
      if (event.key !== "Tab") {
        return;
      }
      event.preventDefault();

      const direction = event.shiftKey ? -1 : 1;
      if (cycleThroughMatches(direction)) {
        return;
      }

      const parsed = parseInput(currentValue);

      if (parsed.context === "command") {
        const activeValue = parsed.activeToken.toLowerCase();
        const matches = commands.filter((command) =>
          command.startsWith(activeValue),
        );
        applyMatches(matches, currentValue, parsed.activeToken, {
          appendSpace: true,
        });
        return;
      }

      const commandToken = parsed.commandToken.toLowerCase();
      if (!commandToken.length) {
        onSuggestions([]);
        return;
      }

      const resolveCommandSuggestions = (): string[] => {
        switch (commandToken) {
          case SupportedCommands.CD:
            return getPathSuggestions(parsed.activeToken, {
              includeFiles: false,
              includeDirectories: true,
            });
          case SupportedCommands.CAT:
            return getPathSuggestions(parsed.activeToken, {
              includeFiles: true,
              includeDirectories: false,
            });
          case SupportedCommands.LS:
          case SupportedCommands.L:
            return getPathSuggestions(parsed.activeToken, {
              includeFiles: true,
              includeDirectories: true,
            });
          case SupportedCommands.MAN:
            return commands.filter((command) =>
              command.startsWith(parsed.activeToken.toLowerCase()),
            );
          default:
            return [];
        }
      };

      const matches = resolveCommandSuggestions();
      const shouldAppendSpace = commandToken !== SupportedCommands.LS &&
        commandToken !== SupportedCommands.L;

      applyMatches(matches, currentValue, parsed.activeToken, {
        appendSpace: shouldAppendSpace,
      });
    },
    [applyMatches, commands, cycleThroughMatches, getPathSuggestions, onSuggestions],
  );

  return { handleTabComplete, resetCycle };
};
