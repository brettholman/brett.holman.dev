import { makeStyles } from "@material-ui/styles";
import { Box, Typography } from "@mui/material";
import { useState } from "react";
import { PromptDisplay } from "./promptDisplay";
import { PromptInput } from "./promptInput";

type PromptProps = {
  currentDirectory: string;
  previousCommandSuccessful?: boolean;
  focused?: boolean;
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
  focused,
  previousCommandSuccessful = true,
}: PromptProps) => {
  const classes = useStyles();

  const [value, updateValue] = useState("");

  return (
    <>
      <PromptInput
        updateValue={(value) => {
          console.log({ value });
          updateValue(value);
        }}
      />
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
        <PromptDisplay value={value} focused={true} />
      </Box>
    </>
  );
};
