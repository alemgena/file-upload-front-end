import React from "react";
import { Button } from "@mui/material";
import Tooltip from "@mui/material/Tooltip";
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 0,

    marginLeft:'20px',
        backgroundColor: 'fffbf2'

  },
  secondary: {
    // color: theme.palette.secondary.main,
    "& .MuiButton-label": {
      color: theme.palette.secondary.contrastText,
  
    },
    "&:hover": {
      // backgroundColor: theme.palette.secondary.main,
      // color: theme.palette.secondary.contrastText,
      "& .MuiButton-label": {
        color: theme.palette.secondary.main,
      },
    },
  },
  // primary: {
  //   backgroundColor: theme.palette.primary.main,
  //   color: theme.palette.primary.contrastText,
  //   "& .MuiButton-label": {
  //     color: theme.palette.primary.contrastText,
  //   },
  //   "&:hover": {
  //     backgroundColor: theme.palette.primary.main,
  //     "& .MuiButton-label": {
  //       color: theme.palette.primary.contrastText,
  //     },
  //   },
  // },
}));

export default function ActionButton(props) {
  const { color,disabled, size,children, onClick, title = "add", variant } = props;

  const classes = useStyles();

  return (
    <Tooltip title={title} aria-label="add">
      <Button
      style={{  marginLeft: '10px',color:"white", backgroundColor:'#203040'}}
        variant={variant || "outlined"}
        className={`${classes.root} `}
        onClick={onClick}
        size={size}
        disabled={disabled}
      >
        {children}
      </Button>
    </Tooltip>
  );
}
