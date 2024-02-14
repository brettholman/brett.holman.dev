import { CommandResponse } from "../../models/commandResponse";
import { CommandStatusCode } from "../../models/commandStatusCode";
import { useIsMobile } from "../useIsMobile";

const createLink = (href: string, innerText: string) =>
  `<a href=${href} target="_blank" rel="noopener">${innerText}</a>`;

const desktopTmuxOutput = `My tmux session is using the project tmux-powerline which is the status bars at the bottom of the screen (if on desktop) ${createLink(
  "https://github.com/erikw/tmux-powerline",
  "You can find the project code here",
)}`;

const output = (
  isMobile: boolean,
) => `<span>Hello and welcome to my personal website 👋.
The goal of this website is to emulate a restricted version of my everyday terminal and tmux setup in react.
You can find the ${createLink(
  "https://github.com/brettholman/brett.holman.dev",
  "source code here",
)}

${!isMobile && desktopTmuxOutput}

Try \`help\` to see the commands avaliable</span>`;

export const useWelcome = () => {
  const { isMobile } = useIsMobile();
  const outputString = output(isMobile);
  const welcome = (): CommandResponse => ({
    output: outputString,
    statusCode: CommandStatusCode.SUCCESS,
  });

  return { welcome };
};
