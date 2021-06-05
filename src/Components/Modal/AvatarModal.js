import { useEffect, useState } from "react";
import { Grid, Typography, Tooltip, IconButton } from "@material-ui/core";
import classes from "./AvatarModal.module.css";
import {AuthContext} from "../../context/auth-context"
import Amongus1 from "../../Assets/images/amongus1.png";
import Amongus2 from "../../Assets/images/amongus2.png";
import Amongus3 from "../../Assets/images/amongus3.png";
import Amongus4 from "../../Assets/images/amongus4.png";
import Amongus5 from "../../Assets/images/amongus5.png";
import Amongus6 from "../../Assets/images/amongus6.png";
import Amongus7 from "../../Assets/images/amongus7.png";


const Amongus = [Amongus1, Amongus2, Amongus3, Amongus5, Amongus6, Amongus7];

const WriterModal = (props) => {
  const { cancelHandler, submitHandler } = { ...props };
  return (
    <>
      <Grid onClick={props.cancelHandler} className={classes.backdrop}></Grid>
      <Grid className={classes.modal}>
        <Grid className={classes.AvatarGridone}>
          {Amongus.map((e, idx) => (
            <img
              onClick={() => {
                props.cancelHandler();
                props.changeHandler(idx);
              }}
              src={Amongus[idx]}
              alt="avatar"
              style={{
                height:'100px',
                width:'90px',
                margin: "30px",
                borderRadius: "10px",
                cursor:"pointer"
              }}
            />
          ))}
        </Grid>
      </Grid>
    </>
  );
};

export default WriterModal;
