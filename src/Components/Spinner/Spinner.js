import React from "react";
import { Button } from "@material-ui/core";
import { connect } from "react-redux";
import classes from "./Spinner.module.css";

import { connectAdvanced } from "react-redux";

const Spinner = (props) => {
  return (
    <div className={classes.square}>
      <div></div>
      <div></div>
    </div>
  );
};

export default Spinner;
