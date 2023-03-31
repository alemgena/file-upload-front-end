import React from "react";
import Snackbar from "@mui/material/Snackbar";
import { makeStyles } from '@material-ui/core/styles'

import Alert from "@mui/material/Alert";

const useStyles = makeStyles((theme) => ({
  root: {
    top: theme.spacing(9),
    paddingRight: theme.spacing(2),
  },
}));

export default function Notification(props) {
  const { notify, setNotify } = props;

  const classes = useStyles();

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setNotify({
      ...notify,
      isOpen: false,
    });
  };

  return (
    <Snackbar
      className={classes.root}
      open={notify.isOpen}
      autoHideDuration={notify.hide === true ? 3000 : undefined}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      onClose={handleClose}
    >
      <Alert severity={notify.type||"success"} onClose={handleClose}>
        {notify.message}
      </Alert>
    </Snackbar>
  );
}
