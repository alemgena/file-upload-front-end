import React from "react";

import { Card, CardContent } from "@mui/material";

const ContentWrapper = (props) => {
  return (
    <Card className="card-box">
      <CardContent>{props.children}</CardContent>
    </Card>
  );
};
export default ContentWrapper;
