import { makeStyles } from "@material-ui/styles";
import { Box } from "@mui/material";
import { useFormContext } from "react-hook-form";

interface PromptDisplayProps {
  historicValue?: string;
}

const useStyles = makeStyles({
  container: {
    height: "1em",
    paddingLeft: ".5em",
    display: "flex",
    position: "relative",
    justifyContent: "center",
  },
  input: {
    color: "#bcbcbc",
    display: "contents",
  },
  caret: {
    paddingTop: ".2em",
    paddingLeft: ".05em",
  },
});

export const PromptDisplay = ({ historicValue }: PromptDisplayProps) => {
  const classes = useStyles();

  const formMethods = useFormContext();
  const value = historicValue || formMethods?.watch("hiddenInput");
  return (
    <div className={classes.container}>
      <pre className={classes.input}>{value}</pre>
      {!historicValue && (
        <Box component="span" className={classes.caret}>
          <svg>
            <rect
              width=".5em"
              height="1em"
              style={{
                fill: "rgb(187,187,187)",
                stroke: "rgb(187,187,187)",
                strokeWidth: 3,
              }}
            />
          </svg>
        </Box>
      )}
    </div>
  );
};
