import React from "react";
import { Button } from "@material-ui/core";
import { connect } from "react-redux";
import {SET_COMPILE_ON } from '../../../store/Action/action'

import { connectAdvanced } from "react-redux";

const Compile = (props) => {
  return (
    <Button
      disabled={props.isCompiling}
      onClick={props.onClickCompile}
      style={{
        height: "4vh",
        backgroundColor: "#872e2e",
        color: "#fff",
        width: "13vh",
        padding: ".5vh 1vh 0 1.3vh",
        borderRadius: "5px",
        margin: "1vh 0 0 24vh",
        cursor: "pointer",
      }}
    >
      Compile
    </Button>
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
