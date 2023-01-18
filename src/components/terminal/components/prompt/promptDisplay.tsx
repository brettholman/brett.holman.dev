import { makeStyles } from "@material-ui/styles";
import { Box } from "@mui/material";
import { useFormContext } from "react-hook-form";

interface PromptDisplayProps {
  focused: boolean;
}

const useStyles = makeStyles({
  container: {
    paddingLeft: ".5em",
    display: "flex",
    position: "relative",
    justifyContent: "space-evenly",
  },
  caret: {
    paddingTop: ".2em",
    paddingLeft: ".05em",
  },
});

export const PromptDisplay = ({ focused }: PromptDisplayProps) => {
  const classes = useStyles();

  const { watch } = useFormContext();
  return (
    <Box component="span" className={classes.container}>
      <Box component="span" color="#bcbcbc">
        {watch("hiddenInput")}
      </Box>
      <Box component="span" className={classes.caret}>
        <svg>
          <rect
            width=".5em"
            height="1em"
            style={{
              fill: focused ? "rgb(187,187,187)" : "transparent",
              stroke: "rgb(187,187,187)",
              strokeWidth: 3,
            }}
          />
        </svg>
      </Box>
    </Box>
  );
};
