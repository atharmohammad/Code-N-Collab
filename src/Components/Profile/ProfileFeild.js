import { useEffect, useState } from "react";
import { Grid, Tooltip, IconButton } from "@material-ui/core";

const ProfileFeild = (props) => {
  return (
    <div
      style={{
        padding: "5px",
        display: "flex",
        margin: "auto",
        marginTop:'10px',
        borderBottom: "2px solid #b5b0a3",
      }}
    >
      <div style={{ fontSize: "25px", width: "50%" }}>{props.title}:</div>
      <div style={{ fontSize: "20px", color: "#524d3f", marginLeft: "50px" }}>
        {props.value}
      </div>
    </div>
  );
};

export default ProfileFeild;
