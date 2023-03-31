import React from "react";
import { TextField } from "@mui/material";
import { makeStyles } from '@material-ui/core/styles'
const useStyles = makeStyles(() => ({

  borderTextField: {
    // - The TextField-root
    // - Make the border more distinguishable

    // (Note: space or no space after & matters. See SASS "parent selector".)
    '& .MuiOutlinedInput-root': {
      // - The Input-root, inside the TextField-root
      '& fieldset': {
        // - The <fieldset> inside the Input-root
        borderColor: '#203040',

        // - Set the Input border
      },
      '&:hover fieldset': {
        borderColor: '#203040',

        // - Set the Input border when parent has :hover
      },
      '&.Mui-focused fieldset': {
        borderColor: '#203040',
        label: {
          display: 'none',
        }, // - Set the Input border when parent is focused
      },
    },
  },
  button: {
    backgroundColor: '#203040',
    color: 'white',
    fontFamily: 'Times New Roman',
  },
}))
export default function Input(props) {
  const {
    name,
    label,
    value,
    error = null,
    onChange,
    type,
    focus,
    ...other
  } = props;
const classes=useStyles();
  return (
    <TextField
      variant="outlined"
      label={label}
      name={name}
      className={classes.borderTextField}
      value={value}
      type={type || "text"}
      onChange={onChange}
      autoFocus={focus}
      {...other}
      {...(error && { error: true, helperText: error })}
    />
  );
}
