import React,{ useEffect, useRef } from "react";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import { SET_INPUT,RESET_SOME_ONE_SEND_IO } from "../../store/Action/action";

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
  const contentEditableDivRef = useRef();
 
  const changeHandler = (event) => {
    props.setInput(event.currentTarget.innerText);
    console.log(event);
    // console.log(event.target.value)
  };
  
  useEffect(()=>{
    if(props.someOneSendIO === true){
      contentEditableDivRef.current.innerText = props.input;
      props.recievedIO();
    } 
  },[props.someOneSendIO])

  return (
    <Grid
      style={{ display: "flex", minHeight: "28vh", backgroundColor: "#1f273d" }}
    >
      <Grid
        lg={6}
        style={{
          backgroundColor: "#272822",
          height: "27vh",
          zIndex: "100",
          border: "2px solid #fff",
          borderRadius: "5px",
        }}
      >
        <div
          ref = {contentEditableDivRef}
          onInput={changeHandler}
          contentEditable="true" 
          style={{
            width: "auto",
            height: "192px",
            overflowY: "auto",
            fontSize: "17px",
            paddingLeft: "1vh",
            backgroundColor: "#272822",
            color: "#fff",
          }}
        />
      </Grid>

      <Grid
        lg={6}
        style={{
          backgroundColor: "#272822",
          height: "27vh",
          zIndex: "200",
          border: "2px solid #fff",
          borderRadius: "5px",
        }}
      >
        <div
          onInput={changeHandler}
          style={{
            width: "auto",
            height: "192px",
            overflowY: "auto",
            fontSize: "17px",
            paddingLeft: "1vh",
            backgroundColor: "#272822",
            color: "#fff",
          }}
        >
          <pre>{props.output}</pre>
        </div>
      </Grid>
    </Grid>
  );
};

const mapStateToProps = (state) => {
  return {
    output: state.tools.output,
    input: state.tools.input,
    someOneSendIO:state.tools.someOneSendIO,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setInput: (value) => dispatch({ type: SET_INPUT, value }),
    recievedIO:() => dispatch({ type: RESET_SOME_ONE_SEND_IO })
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Io);
