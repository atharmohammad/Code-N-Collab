import { Grid } from "@material-ui/core";
import React, { useEffect, useState,useContext } from "react";
import classes from "./lockout.module.css";
import { connect } from "react-redux";
import {useLocation} from "react-router-dom";
import {AuthContext} from '../../../context/auth-context'

const Problem = (props) => {

  const location = useLocation();
  const auth = useContext(AuthContext)
  const problems = props.contest.Problems.map((problem) => {
    let bgcolor = "#3959d4";

    if(problem.solved){
      if(problem.author === auth.user.CodeforcesHandle){
        bgcolor = "green"
      }else{
        bgcolor = "#f00505"
      }
    }
      return (
        <a
        style={{backgroundColor:`${bgcolor}`}}
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
