import { makeStyles } from "@material-ui/styles";
import { Box, Typography } from "@mui/material";
import axios from "axios";
import { useMemo, useState } from "react";

const useStyles = makeStyles({
  sessionName: {
    textAlign: "left",
    paddingLeft: ".5em",
    paddingRight: ".5em",
    backgroundColor: "#b7d543",
  },
  hostName: {
    textAlign: "left",
    paddingLeft: ".5em",
    paddingRight: ".5em",
    backgroundColor: "#0e6eff",
  },
  ipAddress: {
    textAlign: "left",
    paddingLeft: ".5em",
    paddingRight: ".5em",
    backgroundColor: "#275e83",
  },
});

interface LeftStatusBarProps {
  sessionName: string;
  tabPosition: number;
  panePosition: number;
}

export const LeftStatusBar = ({
  sessionName,
  tabPosition,
  panePosition,
}: LeftStatusBarProps) => {
  const classes = useStyles();

  const [ipAddress, setIpAddress] = useState("");

  const getData = async () => {
    const res = await axios.get("https://geolocation-db.com/json/");
    setIpAddress(res.data.IPv4);
  };
  useMemo(() => {
    getData();
  }, []);

  return (
    <Box>
      <Typography
        variant="body2"
        className={classes.sessionName}
        component="span"
      >{`${sessionName}:${tabPosition}.${panePosition}`}</Typography>
      <Typography variant="body2" className={classes.hostName} component="span">
        brett.holman.dev
      </Typography>
      <Typography
        variant="body2"
        className={classes.ipAddress}
        component="span"
      >
        {ipAddress}
      </Typography>
    </Box>
  );
};
