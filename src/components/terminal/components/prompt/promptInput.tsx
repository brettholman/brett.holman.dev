import { TextField } from "@mui/material";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles({
  root: {
    display: 'none',
    paddingLeft: "1em",
    borderColor: "transparent",
    backgroundColor: "transparent",
    resize: "none",
    height: 0,
    width: 0,

    position: "fixed",
    bottom: 0,
  },
  innerText: {
    // color: "#bcbcbc", // TODO use theme
    color: "white", // TODO use theme
  },
});

interface PromptInputProps {
  updateValue: (input: string) => void
}

export const PromptInput = ({ updateValue }: PromptInputProps) => {
  const classes = useStyles();
  return (
    <TextField
      onChange={(value) => updateValue(value.currentTarget.value)}
      hidden
      autoFocus
      spellCheck="false"
      className={classes.root}
      unselectable="on"
      InputProps={{
        className: classes.innerText,
        hidden: true
      }}
    />
  );
};
