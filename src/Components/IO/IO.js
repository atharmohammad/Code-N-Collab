import React from "react";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import { SET_INPUT } from "../../store/Action/action";

import { connect } from "react-redux";
import styles from "./IO.module.css";

import {
  Typography,
  CssBaseline,
  Box,
  Button,
  makeStyles,
  Grid,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({}));

const Io = (props) => {
  const classes = useStyles();

  const changeHandler = (event) => {
    props.setInput(event.target.value);
    // console.log(event.target.value)
  };

  return (
    <Grid
      style={{ display: "flex", minHeight: "28vh", backgroundColor: "#fad87a" }}
    >
      <Grid
        lg={6}
        style={{
          backgroundColor: "#FAFAFA",
          height: "15vh",
          zIndex: "100",
          border: "2px solid black",
          borderRadius: "5px",
        }}
      >
        <textarea
          placeholder="Input"
          onChange={changeHandler}
          rows="3"
          cols="56"
          style={{
            border: "none",
            resize: "none",
            overflowY: "scroll",
            fontSize: "15px",
            padding: "1vh",
          }}
        />
      </Grid>
      <Grid
        style={{
          height: "5vh",
          width: "5vh",
          borderRadius: "50%",
          backgroundColor: "#495969",
          zIndex: "200",
          transform: "translateY(-25px)",
          cursor: "pointer",
        }}
        className={styles.bounce}
      >
        <Grid style={{ alignItem: "center" }}>
          <Grid className={styles.left}></Grid>
          <Grid className={styles.right}></Grid>
        </Grid>
      </Grid>
      <Grid
        lg={6}
        style={{
          backgroundColor: "#FAFAFA",
          height: "15vh",
          zIndex: "200",
          border: "2px solid black",
          borderRadius: "5px",
        }}
      >
        <textarea
          disabled
          value = {props.output}
          placeholder="Output"
          rows="4"
          cols="56"
          style={{
            border: "none",
            resize: "none",
            overflowY: "scroll",
            fontSize: "15px",
            paddingLeft:'1vh'
          }}
        />
      </Grid>
    </Grid>
  );
};

const mapStateToProps = (state) => {
  return {
    output: state.tools.output,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setInput: (value) => dispatch({ type: SET_INPUT, value }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Io);
