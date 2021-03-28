import React from "react";
import { Button } from "@material-ui/core";
import { connect } from "react-redux";

import { connectAdvanced } from "react-redux";

const Spinner = (props) => {
  return (
    <></>
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
