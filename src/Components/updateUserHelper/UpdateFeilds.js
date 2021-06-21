import { useEffect, useState } from "react";
import { TextField } from "@material-ui/core";

import classes from "./update.module.css";

const ProfileFeild = (props) => {
  return (
    <TextField
      className={classes[props.title]}
      variant="outlined"
      margin="normal"
      value={props.value}
      id="Name"
      label={props.title}
      name={props.title}
      placeholder={props.placeHolder}
      autoFocus
      onChange={(event) => props.changeHandler(event.target.value)}
    />
  );
};

export default ProfileFeild;
