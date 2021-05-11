import { Grid } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import classes from "./lockout.module.css";
import {connect} from "react-redux";

const Problem = (props) => {
  useEffect(()=>{
    console.log(props.contest)
  },[])
  return (
    <>
      <Grid
        className={classes.anchorContainer}
      >
        <a
          className={classes.anchorTag}
          href="https://codeforces.com/problemset/problem/1516/B"
          title="Question1"
          target="_blank"
        >
          1500
        </a>

        <a
          className={classes.anchorTag}
          href="https://codeforces.com/problemset/problem/1516/B"
          title="Question2"
          target="_blank"
        >
          1700
        </a>
        <a
          className={classes.anchorTag}
          href="https://codeforces.com/problemset/problem/1516/B"
          title="Question3"
          target="_blank"
        >
          1500
        </a>
        <a
          className={classes.anchorTag}
          href="https://codeforces.com/problemset/problem/1516/B"
          title="Question4"
          target="_blank"
        >
          1600
        </a>
        <a
          className={classes.anchorTag}
          href="https://codeforces.com/problemset/problem/1516/B"
          title="Question5"
          target="_blank"
        >
          1700
        </a>
      </Grid>
    </>
  );
};

const mapStateToProps = state=>{
  return{
    contest:state.contest.contest
  }
}

export default connect(mapStateToProps,null)(Problem);
