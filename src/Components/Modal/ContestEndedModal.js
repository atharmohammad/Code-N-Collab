import React from "react";
import { Grid, Button } from "@material-ui/core";
import { connect } from "react-redux";
import * as TYPES from "../../store/Action/action";

const ContestEndedModal = (props) => {
  return (
    <Grid
      style={{
        position: "fixed",
        zIndex: "800",
        backgroundColor: "black",
        height: "45vh",
        width: "40%",
        border: "1px solid #ccc",
        boxShadow: "1px 1px 1px black",
        background: "rgb(39, 41, 43,0.8)",
        padding: "15vh",
        left: "30%",
        top: "150px",
        display: "flex",
        justifyContent: "center",
        boxSizing: "border-box",
        transition: "all 0.3s ease-out",
      }}
    >
      {" "}
      <div>
        <div style={{ display:'flex',color: "#fff", fontSize: "30px" }}>Contest Ended</div>
        <Button
          onClick={props.hideContestEndModal}
          style={{
            cursor: "pointer",
            color: "white",
            height: "50px",
            width: "200px",
            marginTop:'20%',
            borderRadius: "5px",
            background: "#c42b2b",
            fontSize: "14px",
            textAlign: "center",
          }}
        >
          OK
        </Button>
      </div>
    </Grid>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    hideContestEndModal: () =>
      dispatch({ type: TYPES.HIDE_CONTEST_ENDED_MODAL }),
  };
};

export default connect(null, mapDispatchToProps)(ContestEndedModal);
