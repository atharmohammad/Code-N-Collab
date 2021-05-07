import React from "react";
import { Box, Button } from "@material-ui/core";
import { connect } from "react-redux";
import { SET_COMPILE_ON } from "../../../store/Action/action";
import classes from "./tools.module.css";

const Compile = (props) => {
  return (
    <Box
      disabled={props.isCompiling}
      onClick={props.onClickCompile}
      className={classes.navButton}
    >
      Compile
    </Box>
  );
};

const mapStateToProps = (state) => {
  return {
    isCompiling: state.tools.nowCompile,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onClickCompile: () => dispatch({ type: SET_COMPILE_ON }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Compile);
