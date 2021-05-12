import React, { useEffect, useState } from "react";
import { ReflexContainer, ReflexSplitter, ReflexElement } from "react-reflex";
import Chat from "../Components/Chat/ChatTabs";
import Editor from "../Components/Lockout/Editor.js/LockOutEditor";
import IO from "../Components/IO/IO";
import Contest from "../Components/Lockout/Contest";
import { connect } from "react-redux";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import Toolbar from "../Components/Toolbar/Toolbar";
import * as TYPES from "../store/Action/action";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const LockOutPage = (props) => {
  const socket = props.socket;

  return (
    <>
      <Toolbar socket={socket} />
      <div style={{ height: "85vh", overflowY: "hidden" }}>
        <ReflexContainer orientation="vertical">
          <ReflexElement
            minSize="300"
            maxSize="300"
            size="300"
            style={{ overflow: "hidden", minWidth: "225px" }}
          >
            <div
              style={{
                margin: "10px 20px 10px 10px",
                height: "96%",
                background: "#313332",
                border: "2px solid black",
                borderRadius: "10px",
                boxShadow: "0 5px 15px 0px rgba(0,0,0,0.6)",
              }}
            >
              <Contest socket={socket} />
            </div>
          </ReflexElement>

          <ReflexSplitter
            className="reflex-thin"
            style={{
              background: "#1f273d",
              opacity: "1",
              border: "0.3px",
            }}
          />

          <ReflexElement orientation="horizontol" maxSize="1900" minSize="400">
            <ReflexContainer>
              <ReflexElement
                minSize="100"
                maxSize="1600"
                style={{ overflow: "hidden" }}
              >
                <Editor socket={socket} />
              </ReflexElement>
              <ReflexSplitter
                className="reflex-thin"
                style={{
                  backgroundColor: "#1f273d",
                  opacity: "1",
                  border: "0.3px",
                }}
              />
              <ReflexElement
                minSize="0"
                maxSize="300"
                size="200"
                style={{ overflow: "hidden" }}
              >
                <IO socket={socket} />
              </ReflexElement>
            </ReflexContainer>
          </ReflexElement>

          <ReflexSplitter
            className="reflex-thin"
            style={{
              backgroundColor: "#1f273d",
              opacity: "1",
              border: "0.3px",
            }}
          />

          <ReflexElement
            minSize="8"
            maxSize="250"
            size="250"
            style={{ overflow: "hidden" }}
          >
            <Chat socket={socket} />
          </ReflexElement>
        </ReflexContainer>

        <Snackbar
          anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
          open={props.output_success}
          autoHideDuration={3000}
          onClose={props.notify_output_off}
        >
          <Alert onClose={props.notify_output_off} severity="success">
            Code Compiled SuccessFully !
          </Alert>
        </Snackbar>
        <Snackbar
          anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
          open={props.output_error}
          autoHideDuration={3000}
          onClose={props.notify_output_error}
        >
          <Alert onClose={props.notify_output_error} severity="error">
            Something Went Wrong!
          </Alert>
        </Snackbar>
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    output_success: state.tools.output_success,
    output_error: state.tools.output_error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    notify_output_off: () => dispatch({ type: TYPES.NOTIFY_OUTPUT_SUCCESS }),
    notify_output_error: () => dispatch({ type: TYPES.NOTIFY_OUTPUT_ERROR }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LockOutPage);
