import React, { useState, useEffect, useRef } from "react";
import { makeStyles, Grid } from "@material-ui/core";
import { useLocation } from "react-router-dom";
import { connect } from "react-redux";

import {
  SET_INPUT,
  SET_OUTPUT,
  RESET_LOADING,
  SET_COMPILE_OFF,
  NOTIFY_OUTPUT_SUCCESS,
  NOTIFY_OUTPUT_ERROR,
} from "../../store/Action/action";

const useStyles = makeStyles((theme) => ({
  textarea: {
    resize: "none",
    outline: "none",
    width: "100%",
    border: "2px solid white",
    borderRadius: "10px",
    background: "#272822",
    color: "#fff",
    boxSizing: "content-box",
    padding: "10px 10px 0 10px",
    fontSize: "18px",
    "&::placeholder": {
      color: "grey",
    },
  },
  IoContainer: {
    display: "flex",
    height: "100%",
    backgroundColor: "#1f273d",
    flexDirection: "row",
    justifyContent: "space-around",
    padding: "10px",
    boxSizing: "border-box",
  },
  IoGrid: {
    backgroundColor: "#272822",
    zIndex: "100",
    width: "50%",
    border: "2px solid #fff",
    borderRadius: "5px",
    display: "flex",
    justifyContent: "center",
    padding: "1vh",
    boxSizing: "border-box",
  },
}));

const Io = (props) => {
  const inputRef = useRef();
  const outputRef = useRef();
  const classes = useStyles();
  const socket = props.socket;
  const location = useLocation();

  const [recieved, setRecieved] = useState(1);
  const [reason, setReason] = useState("");

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
        reason: reason,
      });
    }
  };

  useEffect(() => {
    props.setInput(null);
    props.setOutput(null);
    props.resetLoading();
  }, []);

  //Listening to the output response after compilation
  useEffect(() => {
    if (location.pathname === "/newContest") {
      setReason("lockout");
    } else {
      setReason("code-editor");
    }
    socket.on("COMPILE_OFF", (data) => {
      const response = data;
      props.resetCompile();
      props.resetLoading();
      if (response && response.output !== undefined) {
        props.setOutput(response.output || "");
        props.notify_output_on();
      } else {
        props.setOutput(response.e || "Oops something went wrong");
        props.notify_output_error_on();
      }
    });
  }, [location]);

  //Listening to the IO recieved from other peers
  useEffect(() => {
    socket.on("IO_recieved", (data) => {
      setRecieved(3);
      if (data.inputText !== undefined) {
        inputRef.current.value = data.inputText;
        props.setInput(data.inputText);
      }
      if (data.outputText !== undefined) {
        outputRef.current.value = data.outputText;
        props.setOutput(data.outputText);
      }
      setRecieved(2);
    });

    //Send the initial IO to the new user
    socket.on("sendInitialIO", (obj) => {
      socket.emit("takeInitialIO", {
        id: obj.id,
        inputText: inputRef.current.value,
        outputText: outputRef.current.value,
        reason: "code-editor",
      });
    });
  }, []);

  //Emitting the IO changes to other users
  useEffect(() => {
    if (recieved == 2 && location.pathname !== "newContest") {
      setRecieved(2);
      socket.emit("changeIO", {
        inputText: props.input,
        outputText: props.output,
        reason: reason,
      });
    }
    outputRef.current.value = props.output;
  }, [props.output]);

  return (
    <Grid className={classes.IoContainer} lg={12}>
      <Grid className={classes.IoGrid}>
        <textarea
          rows="7"
          placeholder="Input"
          onChange={changeHandler}
          className={classes.textarea}
          ref={inputRef}
        ></textarea>
      </Grid>

      <Grid className={classes.IoGrid}>
        <textarea
          rows="7"
          readOnly={true}
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
    resetLoading: () => dispatch({ type: RESET_LOADING }),
    resetCompile: () => dispatch({ type: SET_COMPILE_OFF }),
    notify_output_on: () => dispatch({ type: NOTIFY_OUTPUT_SUCCESS,value:true }),
    notify_output_error_on: () => dispatch({ type: NOTIFY_OUTPUT_ERROR,value:true }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Io);
