import { useState, useEffect } from "react";
import Snackbar, { SnackbarOrigin } from "@mui/material/Snackbar";
import { Alert } from "@mui/material";
import { snackBarProps } from "./types";

export interface State extends SnackbarOrigin {
  open: boolean;
}

export default function PositionedSnackbar({ snackMsg, openSnack, setOpenSnack, severity }: snackBarProps): JSX.Element {
  const [state, setState] = useState<State>({
    open: false,
    vertical: "top",
    horizontal: "center",
  });
  const { vertical, horizontal, open } = state;
  useEffect(() => {
    setState({ ...state, open: openSnack });
  }, [openSnack]);
  const handleClose = () => {
    setState({ ...state, open: false });
    setOpenSnack(false);
  };

  return (
    <div>
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        onClose={handleClose}
        key={vertical + horizontal}
        autoHideDuration={6000}
      >
        <Alert onClose={handleClose} severity={severity} sx={{ width: "100%" }}>
          {snackMsg}
        </Alert>
      </Snackbar>
    </div>
  );
}
