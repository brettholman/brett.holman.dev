import { makeStyles } from "@material-ui/styles";
import { Box, Typography } from "@mui/material";
import { PromptDisplay } from "../promptDisplay";

type PromptProps = {
  currentDirectory: string;
  previousCommandSuccessful: boolean;
  focused: boolean;
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
});

export const InputContext = ({
  currentDirectory,
  previousCommandSuccessful,
  focused,
  historicValue,
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
      <PromptDisplay focused={focused} historicValue={historicValue} />
    </Box>
  );
};
