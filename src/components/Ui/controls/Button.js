import React from "react";
import { Button as MuiButton } from "@mui/material";
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  root: { margin: theme.spacing(0.5),

     textTransform: "none" },
}));

export default function Button(props) {
  const { text, size, color, variant, onClick, ...other } = props;
  const classes = useStyles();
  return (
    <MuiButton
     style={{ color:"white",backgroundColor:'#203040'}}
      variant={variant || "contained"}
      size={size || "large"}
      color={color || "primary"}
      onClick={onClick}
      {...other}
      classes={{ root: classes.root }}
    >
      {text}
    </MuiButton>
  );
}
