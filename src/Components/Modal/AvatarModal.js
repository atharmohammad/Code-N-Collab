import { useEffect, useState } from "react";
import { Grid, Typography, Tooltip, IconButton } from "@material-ui/core";
import classes from "./AvatarModal.module.css";
import {AllAvatars} from "../SelectAvatars/SelectAvatars";


const WriterModal = (props) => {
  const { cancelHandler, submitHandler } = { ...props };
  return (
    <>
      <Grid onClick={props.cancelHandler} className={classes.backdrop}></Grid>
      <Grid className={classes.modal}>
        <Grid className={classes.AvatarGridone}>
          {AllAvatars().map((e, idx) => (
            <img
              onClick={() => {
                props.cancelHandler();
                props.changeHandler(idx);
              }}
              src={e}
              alt="avatar"
              style={{
                height: "100px",
                width: "90px",
                margin: "30px",
                borderRadius: "10px",
                cursor: "pointer",
              }}
            />
          ))}
        </Grid>
      </Grid>
    </>
  );
};

export default WriterModal;
