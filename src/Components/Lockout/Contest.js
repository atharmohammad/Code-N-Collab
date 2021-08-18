import { useEffect } from "react";
import { connect } from "react-redux";

import * as TYPES from "../../store/Action/action";
import FilterContest from "./FilterContest/FilterContest";
import Spinner from "../Spinner/ContestSpinner/ContestSpinner";
import LockoutPanel from "../Lockout/LockoutPanel/lockoutPanel";

function Contest(props) {
  const socket = props.socket;

  //Updating the contest on the Event Update
  useEffect(() => {
    socket.on("Update", (updatedContest) => {
      props.setContest(updatedContest);
      props.resetProblemLoading();
    });
  }, []);

  //Render LockoutPanel if contest has started and the problems from codeforces are loaded
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
