import { useEffect, useState } from "react";
import FilterContest from "./FilterContest/FilterContest";
import LockoutPanel from "../Lockout/LockoutPanel/lockoutPanel";
import * as TYPES from "../../store/Action/action";
import { connect } from "react-redux";
import Spinner from "../Spinner/ContestSpinner/ContestSpinner";

function Contest(props) {
  const socket = props.socket;

  useEffect(() => {
    socket.on("Update", (updatedContest) => {
      console.log("updated!",updatedContest);
      props.setContest(updatedContest);
      props.resetProblemLoading();
    });
  }, []);
  console.log('props.contest',props.contest)
  return !props.questionLoading? (
    props.contest.Started === false ? (
      <FilterContest socket={socket} roomId={props.contest.Id} />
    ) : (
      <LockoutPanel socket={socket} />
    )
  ) : (<div style={{marginLeft:'-15px'}}>
    <Spinner marginTop='-13px'/>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    contest: state.contest.contest,
    questionLoading: state.contest.questionLoading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setContest: (updatedContest) => {
      dispatch({ type: TYPES.CONTEST_UPDATED, data: updatedContest });
    },
    resetProblemLoading: () => {
      dispatch({ type: TYPES.RESET_QUESTION_LOADING });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Contest);
