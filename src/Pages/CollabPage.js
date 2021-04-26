import React, {useEffect } from "react";
import socketio from "socket.io-client";

import { ReflexContainer, ReflexSplitter, ReflexElement } from "react-reflex";

import Chat from "../Components/Chat";
import Editor from "../Components/Editor/Editor";
import IO from "../Components/IO/IO";
import Problem from "../Components/Problem/Problem";
import { connect } from "react-redux";

import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import Toolbar from "../Components/Toolbar/Toolbar";
import "react-reflex/styles.css";
import { useLocation, useHistory } from "react-router-dom";

import * as TYPES from "../store/Action/action";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const CollabPage = (props) => {
  const socket = socketio.connect("http://127.0.0.1:8080");
  const location = useLocation();
  const history = useHistory();

  useEffect(() => {
    const currentPath = location.pathname;
    const searchParams = new URLSearchParams(location.search);

    if (!searchParams.get("name") || !searchParams.get("room")) {
      return history.push(
        "/rooms?" +
          (searchParams.has("room") ? "room=" + searchParams.get("room") : "")
      );
    }

    socket.emit(
      "join",
      { room: searchParams.get("room"), username: searchParams.get("name") },
      ({ error, user }) => {
        if (error) {
          console.log("username is already taken");
          return history.push(
            "/rooms?" +
              (searchParams.has("room")
                ? "room=" + searchParams.get("room")
                : "")
          );
        }

        console.log("joined");
      }
    );

    return () => {
      console.log("socket dissconnect");
      socket.disconnect();
    };
  }, []);

  return (
    <>
      <Toolbar />
      <div style={{ height: "85vh" }}>
        <ReflexContainer orientation="vertical">
          <ReflexElement
            minSize="10"
            maxSize="350"
            size="250"
            style={{ overflow: "hidden" }}
          >
            <Problem />
          </ReflexElement>

          <ReflexSplitter
            className="reflex-thin"
            style={{
              backgroundColor: "#1f273d",
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
                <Editor socket={socket}/>
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
                minSize="10"
                maxSize="200"
                size="100"
                style={{ overflow: "hidden" }}
              >
                <IO />
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
            minSize="10"
            maxSize="270"
            size="200"
            style={{ overflow: "hidden" }}
          >
            <Chat />
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

export default connect(mapStateToProps, mapDispatchToProps)(CollabPage);
