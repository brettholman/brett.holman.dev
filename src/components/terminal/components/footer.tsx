import { makeStyles } from "@material-ui/styles";
import { CenterStatusBar, LeftStatusBar, RightStatusBar } from "./statusBar";
import { SessionState } from "../models/sessionState";
import { useIsMobile } from "../hooks/useIsMobile";

const useStyles = makeStyles({
  footer: {
    marginTop: "1rem",
    padding: "1rem",
    position: "fixed",
    bottom: 0,
    left: 0,
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

interface FooterProps {
  sessionState: SessionState;
  updateSessionState: (_: Partial<SessionState>) => void;
}

export const Footer = ({ sessionState, updateSessionState }: FooterProps) => {
  const { isMobile } = useIsMobile();
  const classes = useStyles();

  return (
    <div className={classes.footer}>
      <LeftStatusBar
        sessionName="portfolio"
        tabPosition={sessionState.activeTabIndex}
        panePosition={0}
        isMobile={isMobile}
      />
      <CenterStatusBar
        sessionState={sessionState}
        updateSessionState={updateSessionState}
      />
      <RightStatusBar isMobile={isMobile} />
    </div>
  );
};
