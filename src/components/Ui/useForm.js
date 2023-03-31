import React, { useState } from "react";
import { makeStyles } from '@material-ui/core/styles'

export function useForm(initialFValues, validateOnChange = false, validate) {
  const [values, setValues] = useState(initialFValues);
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    
    let { name, value } = e.target;

    if (e.target.type === "text" || e.target.type === "textarea")
      value = value.trimLeft();
    setValues({
      ...values,
      logginError: "",

      [name]:
        name === "phone_no" || name === "office_no"
          ? value.replace(/[^+\d]+/g, "")
          : name === "price"
          ? value.replace(/[^.\d]/g, "").replace(/^(\d*\.?)|(\d*)\.?/g, "$1$2")
          : e.target.type === "file"
          ? e.target.files[0]
          : value,
    });

    if (validateOnChange) validate({ [name]: value });
  };

  const resetForm = () => {
    setValues({ ...initialFValues, editing: values.editing });
    setErrors({});
  };

  return {
    values,
    setValues,
    errors,
    setErrors,
    handleInputChange,
    resetForm,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiFormControl-root": {
      width: "100%",
      margin: theme.spacing(0, 1, 1, 0),
    },
  },
}));

export function Form(props) {
  const classes = useStyles();
  const { children, ...other } = props;
  return (
    <form className={classes.root} autoComplete="off" {...other}>
      {props.children}
    </form>
  );
}
