import { makeStyles } from "@material-ui/styles";
import { Grid } from "@mui/material";
import { CenterStatusBar, LeftStatusBar, RightStatusBar } from "./statusBar";

const useStyles = makeStyles({
  footer: {
    marginTop: "1rem",
    padding: "1rem",
    position: "fixed",
    bottom: 0,
    left: 0,
    width: "100%",
  },
});

export const Footer = () => {
  const classes = useStyles();

  return (
    <Grid container className={classes.footer}>
      <Grid item lg={4} sm={0}>
        <LeftStatusBar
          sessionName="portfolio"
          tabPosition={0}
          panePosition={0}
        />
      </Grid>
      <Grid item lg={4} sm={12}>
        <Grid container justifyContent="center">
          <CenterStatusBar activeTabIndex={0} tabs={["sh", "sh"]} />
        </Grid>
      </Grid>
      <Grid item lg={4} sm={0}>
        <RightStatusBar />
      </Grid>
    </Grid>
  );
};
