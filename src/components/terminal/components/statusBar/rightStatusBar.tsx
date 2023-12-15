import { makeStyles } from "@material-ui/styles";
import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";

const useStyles = makeStyles({
  dayOfWeek: {
    paddingLeft: ".5em",
    textAlign: "right",
    backgroundColor: "#275e83",
  },
  date: {
    textAlign: "right",
    backgroundColor: "#275e83",
  },
  time: {
    paddingRight: ".5em",
    textAlign: "right",
    backgroundColor: "#275e83",
  },
  separator: {
    paddingLeft: ".25em",
    paddingRight: ".25em",
    textAlign: "right",
    backgroundColor: "#275e83",
  },
});

const dayOfWeekLookup = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const padString = (string: string) => string.padStart(2, "0");

const formatDate = (date: Date): string =>
  `${date.getFullYear()}-${padString(
    `${date.getMonth() + 1}`
  )}-${date.getDate()}`;

const formatTime = (date: Date): string =>
  `${padString(date.getHours().toString())}:${padString(
    date.getMinutes().toString()
  )}`;

export const RightStatusBar = ({ isMobile }: { isMobile: boolean }) => {
  const classes = useStyles();

  const [date, setDate] = useState(new Date());
  const [dateString, setDateString] = useState(formatDate(date));
  const [timeString, setTimeString] = useState(formatTime(date));
  const [dayOfWeek, setDayOfWeek] = useState(dayOfWeekLookup[date.getDay()]);

  useEffect(() => {
    if (date) {
      setDateString(formatDate(date));
      setTimeString(formatTime(date));
      setDayOfWeek(dayOfWeekLookup[date.getDay()]);
    }
  }, [date]);

  if (isMobile) {
    return <></>;
  }

  setTimeout(() => setDate(new Date()), 1000);

  return (
    <Box>
      <Typography
        variant="body2"
        className={classes.dayOfWeek}
        component="span"
      >
        {dayOfWeek}
      </Typography>
      <Typography
        variant="body2"
        className={classes.separator}
        component="span"
      >
        {"|"}
      </Typography>
      <Typography variant="body2" className={classes.date} component="span">
        {dateString}
      </Typography>
      <Typography
        variant="body2"
        className={classes.separator}
        component="span"
      >
        {"|"}
      </Typography>
      <Typography variant="body2" className={classes.time} component="span">
        {timeString}
      </Typography>
    </Box>
  );
};
