import { TextField } from "@mui/material";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles({
  root: {
    paddingLeft: "1em",
    overflow: "auto",
    backgroundColor: "transparent",
    resize: "none",
    caretColor: "transparent",
    height: "1em",
    border: "none",
    borderRight: "none",
    borderLeft: "none",
    color: "white",
    flexGrow: 0,
    flexShrink: 1,
    flexBasis: "auto",
  },
  innerText: {
    // color: "#bcbcbc", // TODO use theme
    color: "white", // TODO use theme
  },
});

export const PromptInput = () => {
  const classes = useStyles();
  return (
    <TextField
      autoFocus
      spellCheck="false"
      className={classes.root}
      unselectable="on"
      InputProps={{
        className: classes.innerText,
      }}
    />
  );
};
