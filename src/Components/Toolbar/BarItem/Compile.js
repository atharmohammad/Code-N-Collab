import React from "react";
import { Box } from "@material-ui/core";
import { connect } from "react-redux";
import {SET_COMPILE_ON } from '../../../store/Action/action'

import { connectAdvanced } from "react-redux";

const Compile = (props) => {
  return (
    <Box
      disabled={props.isCompiling}
      onClick={props.onClickCompile}
      style={{
        height: "5vh",
        backgroundColor: "#872e2e",
        color: "#fff",
        width: "20vh",
        padding: "1.2vh 1vh 0 1.3vh",
        borderRadius: "5px",
        margin: "0.5vh 0 0 20vh",
        cursor: "pointer",
      }}
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
    onClickCompile: () => dispatch({ type:SET_COMPILE_ON}),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Compile);
