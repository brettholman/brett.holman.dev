import { makeStyles } from "@material-ui/styles";
import { Box, Typography } from "@mui/material";
import { Tab } from "../../models";
import { PromptDisplay } from "./promptDisplay";
import { PromptInput } from "./promptInput";

type PromptProps = {
  currentDirectory: string;
  focused: boolean;
  previousCommandSuccessful: boolean;
  tab?: Tab;
  historicValue?: string;
};

const useStyles = makeStyles({
  container: {
    padding: "1rem",
    display: "flex",
    width: "100vw",
  },
  currentDirectory: {
    paddingRight: "1em",
  },
  promptIcon: {},
  promptIconFailure: {
    color: "#bd615f",
  },
  git: {},
});

export const Propmt = ({
  currentDirectory,
  previousCommandSuccessful,
  focused,
  tab,
  historicValue,
}: PromptProps) => {
  const classes = useStyles();

  return (
    <>
      {!historicValue && <PromptInput tab={tab} />}
      <Box className={classes.container}>
        <Typography
          color="secondary"
          className={classes.currentDirectory}
          component="span"
        >
          {currentDirectory}
        </Typography>
        <Typography
          color={previousCommandSuccessful ? "primary" : "error"}
          component="span"
        >
          $
        </Typography>
        <PromptDisplay focused={focused} historicValue={historicValue} />
      </Box>
    </>
  );
};
