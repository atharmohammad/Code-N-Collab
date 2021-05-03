import React, { useEffect, useState } from "react";

import { ReflexContainer, ReflexSplitter, ReflexElement } from "react-reflex";

import Chat from "../Components/Chat/ChatTabs";
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
  const socket = props.socket;
  const location = useLocation();
  const history = useHistory();
  const [joined, setJoined] = useState(false);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);

    if (
      !searchParams.get("name") ||
      !searchParams.get("room") ||
      !location.state
    ) {
      let err = {};

      if (!searchParams.get("name") || !searchParams.get("room")) {
        err = {
          error: "Username or RoomName can't be empty",
        };
      }

      return history.push({
        pathname: "/rooms",
        search:
          "?" +
          (searchParams.has("room") ? "room=" + searchParams.get("room") : ""),
        state: err,
      });
    }
    const password = location.state.password;

    socket.emit(
      "join",
      {
        room: searchParams.get("room"),
        username: searchParams.get("name"),
        password,
      },
      ({ error, user }) => {
        if (error) {
          console.log(error);
          return history.push({
            pathname: "/rooms",
            search:
              "?" +
              (searchParams.has("room")
                ? "room=" + searchParams.get("room")
                : ""),
            state: { error },
          });
        }
        setJoined(true);
        console.log("joined");
      }
    );
  }, []);

  return joined ? (
    <>
      <Toolbar />
      <div style={{ height: "85vh", overflowY: "hidden" }}>
        <ReflexContainer orientation="vertical">
          <ReflexElement
            minSize="10"
            maxSize="900"
            size="350"
            style={{ overflowX: "hidden" }}
          >
            <Problem socket={socket} />
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
                minSize="8"
                maxSize="200"
                size="100"
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
  ) : (
    <></>
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
