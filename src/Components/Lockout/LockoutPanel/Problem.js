import { Grid } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import classes from "./lockout.module.css";
import { connect } from "react-redux";

const Problem = (props) => {
  const problems = props.contest.Problems.map((problem) => {
    return (
      <a
        className={classes.anchorTag}
        href={problem.link}
        title={problem.name}
        target="_blank"
      >
        {problem.points}
      </a>
    );
  });

  return (
    <>
      <Grid className={classes.anchorContainer}>{problems}</Grid>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    contest: state.contest.contest,
  };
};

export default connect(mapStateToProps, null)(Problem);
