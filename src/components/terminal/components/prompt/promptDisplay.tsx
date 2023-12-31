import { makeStyles } from "@material-ui/styles";
import { Box } from "@mui/material";
import { useFormContext } from "react-hook-form";

interface PromptDisplayProps {
  focused: boolean;
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
  caret: {
    paddingTop: ".2em",
    paddingLeft: ".05em",
  },
});

export const PromptDisplay = ({
  focused,
  historicValue,
}: PromptDisplayProps) => {
  const classes = useStyles();

  const formMethods = useFormContext();
  const value = historicValue || formMethods?.watch("hiddenInput");
  return (
    <Box component="span" className={classes.container}>
      <Box>
        {/* Pre will honor spaces at the end of input, span will not */}
        <span style={{ color: "#bcbcbc" }}>{value}</span>
      </Box>
      {!historicValue && (
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
      )}
    </Box>
  );
};
