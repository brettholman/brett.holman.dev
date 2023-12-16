import { CommandResponse } from "../../models/commandResponse";
import { CommandStatusCode } from "../../models/commandStatusCode";

const output = `Hello and welcome to my personal website 👋.
The goal of this website is to emulate a restricted version of my everyday terminal and tmux setup in react.
You can find the source code here:

https://github.com/brettholman/brett.holman.dev

Try \`help\` to see the commands avaliable`;

export const useWelcome = () => {
  const welcome = (): CommandResponse => ({
    output,
    statusCode: CommandStatusCode.SUCCESS,
  });

  return { welcome };
};
