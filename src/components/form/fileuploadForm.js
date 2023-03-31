import Controls from "../Ui/controls/Controls";
import React from "react";
import { Form } from "../Ui/useForm";
import { Grid, TextField } from "@mui/material";
import { makeStyles } from "@material-ui/core";
import { useEffect, useRef, useState } from "react";
import FileApiRequests from "../request/fileUpload";
import produce from "immer";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import Button from "@mui/material/Button";
const useStyles = makeStyles((theme) => ({
  icon: {
    borderRadius: "50%",
    height: "40px",
    width: "40px",
  },
}));
const ProductForm = ({
  NotifyMessage,
  setOpenPopup,
setFiles
}) => {
  const [errorMessage, setErrorMessage] = React.useState("");
  const [image, setImage] = React.useState(null);
  const{addFile}=FileApiRequests()
  const handleInputChange = (event) => {
    const fileSize = event.target.files[0].size;
    const maxFileSize = 10485760; // 10 MB in bytes
    if (fileSize > maxFileSize) {
      setErrorMessage("File size exceeds 10 MB limit.");
    } else {
      setImage(event.target.files[0]);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    let formData = new FormData();

    if (image) {
      formData.append("image", image);
      addFile(formData).then((data) => {
        if (data.err) {
          setValues({ ...values, submitting: false });
          NotifyMessage({
            message: data.err,
            type: "error",
          });
        } else {
            setFiles(
                produce((draft) => {
                  draft.unshift({ ...data.file });
                })
              );
          NotifyMessage({
            message: "File created.",
            type: "success",
          });
          setOpenPopup(false);
          resetForm();
        }
      });
    }
  };

  return (
    <>
    {errorMessage&&
    <div>{errorMessage}</div>
    }
    <Form onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={8}>
          <TextField fullWidth type="file" onChange={handleInputChange} />
        </Grid>
        <Grid item xs={12}>
          <Controls.Button
            color="primary"
            variant="outlined"
            text={"Add"}
            className="Button"
            type="submit"
          />
        </Grid>
      </Grid>
    </Form>
    </>
  );
};
export default ProductForm;
