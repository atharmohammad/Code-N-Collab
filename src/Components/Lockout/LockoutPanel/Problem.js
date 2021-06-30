import React, { useContext } from "react";
import { Grid } from "@material-ui/core";
import { connect } from "react-redux";

import {AuthContext} from '../../../context/auth-context'
import classes from "./lockout.module.css";

const Problem = (props) => {

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
        rel="noreferrer"
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
