import { makeStyles } from "@material-ui/styles";
import { Box, Typography } from "@mui/material";
import { Caret } from "./caret";
import { PromptInput } from "./promptInput";

type PromptProps = {
  currentDirectory: string;
  previousCommandSuccessful?: boolean;
};

const useStyles = makeStyles({
  container: {
    padding: "1rem",
    display: 'flex',
    width: '100vw'
  },
  currentDirectory: {
    paddingRight: "1em",
  },
  promptIcon: {},
  promptIconFailure: {
    color: "#bd615f",
  },
  git: {},
  caret: {
    paddingLeft: ".5em",
  },
  promptContainer: {
    display: "flex",
    justifyContent: "space-between"
  },
});

export const Propmt = ({
  currentDirectory,
  previousCommandSuccessful = true,
}: PromptProps) => {
  const classes = useStyles();

  return (
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
      <Box component="span" className={classes.promptContainer}>
        <PromptInput />
        <Caret />
      </Box>
    </Box>
  );
};
