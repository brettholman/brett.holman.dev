import { makeStyles } from "@material-ui/styles";
import { Grid } from "@mui/material";
import { CenterStatusBar, LeftStatusBar, RightStatusBar } from "./statusBar";
import { SessionState } from "../models/sessionState";

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

interface FooterProps {
  sessionState: SessionState;
  updateSessionState: (_: Partial<SessionState>) => void;
}

export const Footer = ({ sessionState, updateSessionState }: FooterProps) => {
  const classes = useStyles();

  const width = window.innerWidth;
  const isMobile = width <= 768;

  return (
    <Grid container className={classes.footer}>
      <Grid item lg={4} sm={0}>
        <LeftStatusBar
          sessionName="portfolio"
          tabPosition={1}
          panePosition={0}
          isMobile={isMobile}
        />
      </Grid>
      <Grid item lg={4} sm={12}>
        <Grid container justifyContent="center">
          <CenterStatusBar
            sessionState={sessionState}
            updateSessionState={updateSessionState}
          />
        </Grid>
      </Grid>
      <Grid item lg={4} sm={0}>
        <RightStatusBar isMobile={isMobile} />
      </Grid>
    </Grid>
  );
};
