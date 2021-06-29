import React, { useEffect, useState, useContext } from "react";
import { ReflexContainer, ReflexSplitter, ReflexElement } from "react-reflex";
import { useLocation, useHistory } from "react-router-dom";
import { connect } from "react-redux";

import Chat from "../Components/Chat/ChatTabs";
import Editor from "../Components/Lockout/Editor.js/LockOutEditor";
import IO from "../Components/IO/IO";
import Contest from "../Components/Lockout/Contest";
import Rules from "../Components/Lockout/LockoutPanel/Rules";
import Toolbar from "../Components/Toolbar/Toolbar";
import * as TYPES from "../store/Action/action";
import Spinner from "../Components/Spinner/ContestSpinner/ContestSpinner";
import { AuthContext } from "../context/auth-context";
import Snacker from '../Components/Snacker/Snaker'

const LockOutPage = (props) => {
  const socket = props.socket;
  const location = useLocation();
  const history = useHistory();
  const [joined, setJoined] = useState(false);
  const [error, setError] = useState(null);
  const auth = useContext(AuthContext);

  const closeSnackBarHandler = () => {
    return history.push({
      pathname: "/homepage",
    });
  };

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    props.contestEnded(false)
    
    const user = {
      Name: auth.user.CodeforcesHandle,
      RoomId: searchParams.get("room"),
    };

    socket.emit("Contest-Join", user, ({ error, contest }) => {
      if (error) {
        return setError(error);
      } else {
        const updatedContest = contest;
        props.setContest(updatedContest);
      }
      setJoined(true);
      
      if (contest.EndTime) {
        const now = new Date().getTime();
        props.contestEnded(contest.EndTime <= now);
      }
    });
  }, []);

  return joined ? (
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
            {props.contest && props.contest.Started ? (
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
            ) : (
              <div
                style={{
                  background: "#313332",
                  boxShadow: "0 5px 15px 0px rgba(0,0,0,0.6)",
                  height: "97%",
                  width: "96%",
                  margin: "auto",
                  borderRadius: "10px",
                }}
              >
                <Rules />
              </div>
            )}
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
        <Snacker
        open={props.output_success}
        horizontal='center'
        message='Code Compiled SuccessFully !' 
        onClose={props.notify_output_off}
      />

        <Snacker
        open={props.output_error}
        horizontal='center'
        severity="error"
        message='Something Went Wrong!' 
        onClose={props.notify_output_error}
      />
      </div>
    </>
  ) : (
    <>
      <Spinner margin={"0px"} />
      <Snacker
        open={error !== null}
        severity="error"
        horizontal='center'
        timer={5000}
        message ={error} 
        onClose={() => {setError(null);closeSnackBarHandler()}}
      />
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    output_success: state.tools.output_success,
    output_error: state.tools.output_error,
    contest: state.contest.contest,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    notify_output_off: () => dispatch({ type: TYPES.NOTIFY_OUTPUT_SUCCESS }),
    notify_output_error: () => dispatch({ type: TYPES.NOTIFY_OUTPUT_ERROR }),
    setContest: (updatedContest) => {
      dispatch({ type: TYPES.CONTEST_UPDATED, data: updatedContest });
    },
    contestEnded: (status) => {
      dispatch({ type: TYPES.CONTEST_ENDED, data: status });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LockOutPage);
