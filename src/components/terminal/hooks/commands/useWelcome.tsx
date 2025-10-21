import React from "react";
import { CommandResponse } from "../../models/commandResponse";
import { CommandStatusCode } from "../../models/commandStatusCode";
import { useIsMobile } from "../useIsMobile";
const createLink = (href: string, innerText: string) => (
  <a href={href} target="_blank" rel="noopener">
    {innerText}
  </a>
);

const desktopTmuxOutput = (
  <b>
    <br />
    My tmux session is using the project tmux-powerline which is the status bars
    at the bottom of the screen (if on desktop)
    {createLink(
      "https://github.com/erikw/tmux-powerline",
      "You can find the project code here",
    )}
  </b>
);

const output = (isMobile: boolean): JSX.Element => (
  <div>
    <h2>Hello and welcome to my personal website 👋.</h2>The goal of this
    website is to emulate a restricted version of my everyday terminal and tmux
    setup in {createLink("https://react.dev/", "react")}.
    <br />
    <h4>
      You can find the{" "}
      {createLink(
        "https://github.com/brettholman/brett.holman.dev",
        "source code here",
      )}
      {!isMobile && desktopTmuxOutput}
    </h4>
    <b>
      <i>Try `help` to see the commands avaliable</i>
    </b>
  </div>
);

export const useWelcome = () => {
  const { isMobile } = useIsMobile();
  const welcome = (): CommandResponse => ({
    output: output(isMobile),
    statusCode: CommandStatusCode.SUCCESS,
  });

  return { welcome };
};
