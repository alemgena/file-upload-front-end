import { TableCell, TableRow, Typography } from "@mui/material";
import React from "react"; 

import {
  HourglassEmptyRounded,
  HourglassEmptyOutlined,
}
 from "@mui/icons-material";
import { makeStyles } from "@mui/styles";
const useStyles=makeStyles((them)=>{
  TableCell:{
    
  }
})


 const Norecords = ({ col }) => {
  return (
    
    <TableRow >
      <TableCell colSpan={col} className="table-sm" align="center">
        <Typography variant="h3">
          No records.
          <HourglassEmptyRounded color="primary" fontSize="inherit" />
        </Typography>
      </TableCell>
    </TableRow>
  );
};

export default Norecords;
