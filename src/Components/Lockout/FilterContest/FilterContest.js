import React, { useEffect, useState } from "react";
import TextField from "@material-ui/core/TextField";
import TagChips from "../TagChips/TagChips";
import * as TYPE from "../../../store/Action/action";
import { connect } from "react-redux";
import { Button } from "@material-ui/core";

const FilterContest = (props) => {
  const socket = props.socket;

  useEffect(() => {
    socket.on("Contest-Starting", () => {
      props.setProblemLoading();
    });
  }, []);

  const startContestHandler = () => {
    socket.emit("Start-Contest", {
      room: props.roomId,
      problemTags: props.contestProblemsTags,
      minRating: props.minRating,
      maxRating: props.maxRating,
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
            <TagChips />
          </div>
        </div>
        <Button
          disabled={
            Math.min(props.maxRating, props.minRating) < 500 ||
            Math.max(props.maxRating, props.minRating) > 3000 ||
            props.maxRating < props.minRating
          }
          style={{
            background:
              Math.min(props.maxRating, props.minRating) < 500 ||
              Math.max(props.maxRating, props.minRating) > 3000 ||
              props.maxRating < props.minRating
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
    setProblemLoading: () => {
      dispatch({ type: TYPE.SET_QUESTION_LOADING });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FilterContest);
