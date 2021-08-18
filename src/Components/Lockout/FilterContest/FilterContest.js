import React, { useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import { Button } from "@material-ui/core";
import { connect } from "react-redux";

import TagChips from "../TagChips/TagChips";
import * as TYPE from "../../../store/Action/action";

const FilterContest = (props) => {
  const socket = props.socket;
  //emitting the fetching request to server
  useEffect(() => {
    socket.on("Contest-Starting", () => {
      props.setProblemLoading();
    });
  }, []);

  //Emitting the start of contest with the configuration of the current user
  const startContestHandler = () => {
    socket.emit("Start-Contest", {
      room: props.roomId,
      problemTags: props.contestProblemsTags,
      minRating: props.minRating,
      maxRating: props.maxRating,
      maxDuration: props.maxDuration,
    });
    props.setProblemLoading();
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          justify: "center",
          height: "100%",
          paddingBottom: "20px",
        }}
      >
        <div
          style={{
            width: "200px",
            margin: "auto",
            padding: "20px",
            height: "58vh",
            borderRadius: "10px",
            maxHeight: "450px",
            background: "#fff",
            boxShadow: "0 5px 15px 0px rgba(0,0,0,0.6)",
            overflowY: "auto",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              justify: "center",
              gridGap: "20px",
            }}
          >
            <TextField
              id="outlined-basic"
              label="Min-Rating"
              variant="outlined"
              type="number"
              value={props.minRating}
              onChange={(e) => props.setMinRating(e.target.value)}
            />
            <TextField
              id="outlined-basic"
              label="Max-Rating"
              variant="outlined"
              value={props.maxRating}
              type="number"
              onChange={(e) => props.setMaxRating(e.target.value)}
            />

            <TextField
              id="outlined-basic"
              label="Max-Duration in minutes"
              placeholder="(10-120) default is 30m"
              variant="outlined"
              value={props.maxDuration}
              type="number"
              onChange={(e) => props.setMaxDuration(e.target.value)}
            />

            <TagChips />
          </div>
        </div>
        <Button
          disabled={
            Math.min(props.maxRating, props.minRating) < 500 ||
            Math.max(props.maxRating, props.minRating) > 3000 ||
            props.maxRating < props.minRating ||
            props.maxDuration > 120 ||
            props.maxDuration < 10
          }
          style={{
            background:
              Math.min(props.maxRating, props.minRating) < 500 ||
              Math.max(props.maxRating, props.minRating) > 3000 ||
              props.maxRating < props.minRating ||
              props.maxDuration > 120 ||
              props.maxDuration < 10
                ? "grey"
                : "#872e2e",
            color: "#fff",
            border: "2px solid white",
            borderRadius: "5px",
            padding: "10px",
            width: "140px",
            alignText: "center",
            padding: "auto",
            cursor: "pointer",
            margin: "auto",
            boxShadow: "0 5px 15px 0px rgba(0,0,0,0.6)",
          }}
          onClick={startContestHandler}
        >
          Start Contest
        </Button>
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    contestProblemsTags: state.contest.ProblemTags,
    minRating: state.contest.minRating,
    maxRating: state.contest.maxRating,
    maxDuration: state.contest.maxDuration,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setMinRating: (value) => {
      dispatch({ type: TYPE.UPDATE_MIN_RATING, data: value });
    },
    setMaxRating: (value) => {
      dispatch({ type: TYPE.UPDATE_MAX_RATING, data: value });
    },
    setMaxDuration: (value) => {
      dispatch({ type: TYPE.UPDATE_MAX_DURATION, data: value });
    },
    setProblemLoading: () => {
      dispatch({ type: TYPE.SET_QUESTION_LOADING });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FilterContest);
