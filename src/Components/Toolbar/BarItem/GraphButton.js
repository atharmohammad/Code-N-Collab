import React from "react";
import { Box,Button } from "@material-ui/core";
import { connect } from "react-redux";
import { SHOW_GRAPH } from "../../../store/Action/action";
import classes from './tools.module.css'
const GraphButton = (props) => {
  return (
      <Box
        disabled={props.showGraph}
        onClick={() => props.onClickGraph()}
        className={classes.navButton}
      >
        Graph
      </Box>
  );
};

const mapStateToProps = (state) => {
  return {
    showGraph: state.tools.showGraph,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onClickGraph: () => dispatch({ type: SHOW_GRAPH }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(GraphButton);
