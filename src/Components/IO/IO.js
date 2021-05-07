import React, { useState, useEffect, useRef } from "react";
import { SET_INPUT, SET_OUTPUT } from "../../store/Action/action";

import { connect } from "react-redux";

import { makeStyles, Grid } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  textarea: {
    resize: "none",
    outline: "none",
    border: "2px solid white",
    borderRadius: "10px",
    background: "#272822",
    color: "#fff",
    boxSizing: "content-box",
    padding: "10px 10px 0 10px",
    fontSize: "18px",
    '&::placeholder':{
      color:'#fff'
    }
  },
}));

const Io = (props) => {
  const inputRef = useRef();
  const outputRef = useRef();
  const classes = useStyles();
  const socket = props.socket;
  const [recieved, setRecieved] = useState(1);

  /* recieved { 1 = true for initial load , 2 = true forever ,
    3 = false forever}
    1 is true for changeHandler only so that a
    person can change on initial reload but his initial
    input output dont emit changeIO */

  const changeHandler = (event) => {
    props.setInput(event.target.value);
    inputRef.current.value = event.target.value;
    if (recieved == 1 || recieved == 2) {
      setRecieved(2);
      socket.emit("changeIO", {
        inputText: event.target.value,
        outputText: props.output,
      });
    }
  };

  useEffect(() => {
    console.log("useEffect");
    socket.on("IO_recieved", (data) => {
      setRecieved(3);
      if(data.inputText !== undefined){
        inputRef.current.value = data.inputText;
        props.setInput(data.inputText);
      }
      if(data.outputText !== undefined){
      outputRef.current.value = data.outputText;
      props.setOutput(data.outputText);
      }
      setRecieved(2);
    });
    socket.on("sendInitialIO", (obj) => {
      console.log("sendInitialIO", inputRef.current.value);
      socket.emit("takeInitialIO", {
        id: obj.id,
        inputText: inputRef.current.value,
        outputText: outputRef.current.value,
      });
    });
  }, []);

  useEffect(() => {
    if (recieved == 2) {
      setRecieved(2);
      socket.emit("changeIO", {
        inputText: props.input,
        outputText: props.output,
      });
    }
    outputRef.current.value = props.output;
  }, [props.output]);

  return (
    <Grid
      style={{
        display: "flex",
        height: "100%",
        backgroundColor: "#1f273d",
        flexDirection: "row",
        justifyContent: "space-around",
        padding: "10px",
        boxSizing: "border-box",
      }}
      lg={12}
    >
      <Grid
        style={{
          backgroundColor: "#272822",
          width: "50%",
          zIndex: "100",
          border: "1px solid #fff",
          borderRadius: "5px",
          display: "flex",
          justifyContent: "center",
          padding: "1vh",
          boxSizing: "border-box",
        }}
      >
        <textarea
          rows="7"
          placeholder="Input"
          style={{
            width: "100%",
          }}
          onChange={changeHandler}
          className={classes.textarea}
          ref={inputRef}
        ></textarea>
      </Grid>

      <Grid
        style={{
          backgroundColor: "#272822",
          zIndex: "100",
          width: "50%",
          border: "2px solid #fff",
          borderRadius: "5px",
          display: "flex",
          justifyContent: "center",
          padding: "1vh",
          boxSizing: "border-box",
        }}
      >
        <textarea
          rows="7"
          readOnly={true}
          style={{
            width: "100%",
          }}
          className={classes.textarea}
          ref={outputRef}
        ></textarea>
      </Grid>
    </Grid>
  );
};

const mapStateToProps = (state) => {
  return {
    output: state.tools.output,
    input: state.tools.input,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setInput: (value) => dispatch({ type: SET_INPUT, value }),
    setOutput: (value) => dispatch({ type: SET_OUTPUT, value }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Io);
