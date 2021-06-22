import { Grid } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import Problem from "./Problem.js";
import LeaderBoard from "./LeaderBoard";
import Countdown from '../../Coundown/Coundown'
import { connect } from "react-redux";

const LockoutPanel = (props) => {
  const socket = props.socket;
  return (
    <>
    <Countdown stopAt = {props.contest.EndTime} socket = {socket}/>
      <Grid
        container
        direction="column"
        justify="space-around"
        style={{ margin: "5px 5px 100px 5px", boxSizing: "border-box" }}
      >

          <Grid
            style={{
              height: "29vh",
              margin: "2px",
              maxHeight:'250px',
              boxSizing:'border_box',
              border: "10px 10px 10px 10px #fff",
            }}
          >
            <Problem />
          </Grid>
          <Grid
            style={{
              minHeight: "38vh",
              margin: "5px 8px 5px 0",
              boxSizing: "border-box",
            }}
          >
            <LeaderBoard socket={socket} />
          </Grid>
        </Grid>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    contest: state.contest.contest,
  };
};

export default connect(mapStateToProps,null)(LockoutPanel);
