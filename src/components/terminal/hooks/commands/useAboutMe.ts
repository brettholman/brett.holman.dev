import { CommandResponse } from "../../models/commandResponse";
import { CommandStatusCode } from "../../models/commandStatusCode";

const about = "aboutMe";

export const useAboutMe = () => {
  const aboutMe = (): CommandResponse => {
    return {
      output: about,
      statusCode: CommandStatusCode.SUCCESS,
    } as CommandResponse;
  };

  return { aboutMe };
};
