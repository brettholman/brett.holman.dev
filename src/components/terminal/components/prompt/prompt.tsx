import { makeStyles } from "@material-ui/styles";
import { Box, Typography } from "@mui/material";
import { SyntheticEvent, useState } from "react";
import { FormProvider } from "react-hook-form";
import { useTerminalForm } from "../../hooks/useTerminalForm";
import { PromptDisplay } from "./promptDisplay";
import { PromptInput } from "./promptInput";

type PromptProps = {
  currentDirectory: string;
  handleProcessCommand: (value: any) => void;
  focused: boolean;
  previousCommandSuccessful: boolean;
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
  handleProcessCommand,
  previousCommandSuccessful,
  focused,
}: PromptProps) => {
  const classes = useStyles();

  const onSubmit = (args: SyntheticEvent) => {
    args.preventDefault();
    console.log({ args });
    handleProcessCommand(args);
  };

  return (
    <>
      <PromptInput />
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
        <PromptDisplay focused={focused} />
      </Box>
    </>
  );
};
