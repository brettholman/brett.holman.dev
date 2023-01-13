import { makeStyles } from "@material-ui/styles";
import { Box, Typography } from "@mui/material";

const useStyles = makeStyles({
  activeItem: {
    paddingLeft: '1em',
    paddingRight: '1em',
    backgroundColor: "#b7d543",
  },
  inActiveItem: {
    paddingLeft: '1em',
    paddingRight: '1em',
    color: "#b7d543",
  },
});

type CenterStatusBarProps = {
  activeTabIndex: number;
  tabs: Array<string>;
  lastTabIndex?: number;
};

export const CenterStatusBar = ({
  activeTabIndex,
  lastTabIndex,
  tabs,
}: CenterStatusBarProps) => {
  const classes = useStyles();
  return (
    <Box>
      {tabs.map((name, index) => {
        const isActiveTab = index === activeTabIndex;
        // TODO this is terrible
        const displayText = index === lastTabIndex ? `${index}:${name}-` : `${index}:${name}`;
        return (
          <Typography
            key={`${name}-${index}`}
            variant="body2"
            className={isActiveTab ? classes.activeItem : classes.inActiveItem}
            component="span"
          >
            {isActiveTab ? name : displayText}
          </Typography>
        );
      })}
    </Box>
  );
};
