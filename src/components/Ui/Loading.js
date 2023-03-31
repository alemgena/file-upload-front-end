import { CircularProgress } from "@mui/material";
import React from "react";
const Loading = ({ color }) => {
  return (
  
    <div className="flex justify-center align-center padding">
      <CircularProgress color={color || "primary"} />
    </div>
  );
};

export default Loading;
