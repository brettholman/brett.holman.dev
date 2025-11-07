import { parseInput } from "./parseInput";

describe("parseInput", () => {
  it("returns command context for empty input", () => {
    const result = parseInput("");
    expect(result.context).toBe("command");
    expect(result.activeToken).toBe("");
    expect(result.commandToken).toBe("");
    expect(result.argumentTokens).toEqual([]);
  });

  it("tracks active command token before completion", () => {
    const result = parseInput("pw");
    expect(result.context).toBe("command");
    expect(result.activeToken).toBe("pw");
    expect(result.commandToken).toBe("pw");
  });

  it("moves to argument context after command finalized", () => {
    const result = parseInput("pwd ");
    expect(result.context).toBe("argument");
    expect(result.commandToken).toBe("pwd");
    expect(result.activeToken).toBe("");
  });

  it("identifies partially typed arguments", () => {
    const result = parseInput("cd repo");
    expect(result.context).toBe("argument");
    expect(result.commandToken).toBe("cd");
    expect(result.activeToken).toBe("repo");
  });
});
