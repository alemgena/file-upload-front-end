import { GiEmptyHourglass } from "react-icons/gi";
import React from "react";
const EmptyData = () => {
    return (
      <div
        className="flex justify-center items-center margin col-12 space-x-1 "
        style={{ fontSize: "30px" }}
      >
        <GiEmptyHourglass />
        <span> No Records</span>
      </div>
    );
}

export default EmptyData
