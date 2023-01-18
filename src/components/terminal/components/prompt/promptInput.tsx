import { makeStyles } from "@material-ui/styles";
import { Box } from "@mui/material";
import Input from "@mui/material/Input";
import { Controller, useFormContext } from "react-hook-form";

const useStyles = makeStyles({
  root: {
    display: "none",
    paddingLeft: "1em",
    borderColor: "transparent",
    backgroundColor: "transparent",
    resize: "none",
    height: "1px",
    width: "1px",
    position: "fixed",
    bottom: 0,
  },
});

interface PromptInputProps {}

export const PromptInput = () => {
  const { control } = useFormContext();
  return (
    <Box style={{ height: "0px", width: "0px" }}>
      <Controller
        name="hiddenInput"
        control={control}
        render={({ field }) => <Input autoFocus {...field} />}
      />
    </Box>
  );
};
