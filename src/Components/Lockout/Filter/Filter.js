import { useState } from "react";
import TextField from "@material-ui/core/TextField";
import TagChips from "../TagChips/TagChips";
import * as TYPE from "../../../store/Action/action";
import { connect } from "react-redux";

function Filter(props) {
  return (
    <div style={{ width: "84%" }}>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-around",
        }}
      >
        <TextField
          id="outlined-basic"
          label="Min-Rating"
          variant="outlined"
          value={props.minRating}
          onChange={(e) => props.setMinRating(e.target.value)}
        />
        <TextField
          id="outlined-basic"
          label="Max-Rating"
          variant="outlined"
          value={props.maxRating}
          onChange={(e) => props.setMaxRating(e.target.value)}
        />
        <TagChips />
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
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
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Filter);
