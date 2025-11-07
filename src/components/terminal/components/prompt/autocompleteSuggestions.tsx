import { makeStyles } from "@material-ui/styles";
import { Box } from "@mui/material";

interface AutocompleteSuggestionsProps {
  suggestions: string[];
}

const useStyles = makeStyles({
  container: {
    paddingLeft: "1rem",
    paddingBottom: "0.5rem",
  },
  text: {
    color: "#bcbcbc",
    whiteSpace: "pre-wrap",
    fontFamily: "monospace",
  },
});

export const AutocompleteSuggestions = ({
  suggestions,
}: AutocompleteSuggestionsProps) => {
  const classes = useStyles();

  if (!suggestions.length) {
    return null;
  }

  return (
    <Box className={classes.container}>
      <pre className={classes.text}>{suggestions.join("    ")}</pre>
    </Box>
  );
};
