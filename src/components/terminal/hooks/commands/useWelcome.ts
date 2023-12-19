import { CommandResponse } from "../../models/commandResponse";
import { CommandStatusCode } from "../../models/commandStatusCode";

const output = `<span>Hello and welcome to my personal website 👋.
The goal of this website is to emulate a restricted version of my everyday terminal and tmux setup in react.
You can find the <a href="https://github.com/brettholman/brett.holman.dev" target="_blank" rel="noopener">source code here</a>

Try \`help\` to see the commands avaliable</span>`;

export const useWelcome = () => {
  const welcome = (): CommandResponse => ({
    output,
    statusCode: CommandStatusCode.SUCCESS,
  });

  return { welcome };
};
