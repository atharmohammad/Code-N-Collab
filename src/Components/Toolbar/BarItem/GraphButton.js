import React from "react";
import { Box,Button } from "@material-ui/core";
import { connect } from "react-redux";
import { SHOW_GRAPH } from "../../../store/Action/action";

const GraphButton = (props) => {
  return (
      <Button
        disabled={props.showGraph}
        onClick={() => props.onClickGraph()}
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
        Graph
      </Button>
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
