import { useEffect, useState } from "react";
import { Grid, Tooltip, IconButton, TextField } from "@material-ui/core";

const ProfileFeild = (props) => {
  return (
    <TextField
      variant="outlined"
      margin="normal"
      value={props.value}
      style={{ width: props.width }}
      id="Name"
      label={props.title}
      name={props.title}
      autoFocus
      onChange={(event) => console.log(event)}
    />
  );
};

export default ProfileFeild;
