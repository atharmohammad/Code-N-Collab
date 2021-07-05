import React from "react";
import { Grid } from "@material-ui/core";

import Spinner from "../Spinner/Spinner";
import classes from './Modal.module.css'

const Modal = (props) => {
  return (
    <div
      className={classes.modal}
    >
      <Spinner />
    </div>
  );
};

export default Modal;
