import { useEffect, useState } from "react";
import { Grid, Typography, Tooltip, IconButton } from "@material-ui/core";
import classes from "./AvatarModal.module.css";

const WriterModal = (props) => {
  const { cancelHandler, submitHandler } = { ...props };
  return (
    <>
      <Grid onClick={props.cancelHandler} className={classes.backdrop}></Grid>
      <Grid className={classes.modal}>
        <Grid className={classes.AvatarGridone}></Grid>
      </Grid>
    </>
  );
};

export default WriterModal;
