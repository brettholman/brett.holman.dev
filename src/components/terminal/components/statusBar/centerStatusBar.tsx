import { makeStyles } from "@material-ui/styles";
import { Box, Typography } from "@mui/material";
import { SessionState } from "../../models";

const useStyles = makeStyles({
  activeItem: {
    paddingLeft: "1em",
    paddingRight: "1em",
    backgroundColor: "#b7d543",
    textColor: "!important #000000",
  },
  inActiveItem: {
    paddingLeft: "1em",
    paddingRight: "1em",
    color: "#b7d543",
  },
});

type CenterStatusBarProps = {
  sessionState: SessionState;
  updateSessionState: (_: Partial<SessionState>) => void;
};

export const CenterStatusBar = ({
  sessionState,
  updateSessionState,
}: CenterStatusBarProps) => {
  const classes = useStyles();
  return (
    <Box>
      {sessionState.tabs.map((tab, index) => {
        const isActiveTab = index === sessionState.activeTabIndex;
        return (
          <span
            onClick={() => updateSessionState({ activeTabIndex: index })}
            key={`${tab.name}-${index}`}
          >
            <Typography
              variant="body2"
              className={
                isActiveTab ? classes.activeItem : classes.inActiveItem
              }
              component="span"
            >
              {tab.name}
            </Typography>
          </span>
        );
      })}
    </Box>
  );
};
