import { useEffect, useState } from "react";
import { useLocation, useHistory } from "react-router-dom";
import FilterContest from "./FilterContest/FilterContest";
import LockoutPanel from "../Lockout/LockoutPanel/lockoutPanel";
import * as TYPES from "../../store/Action/action";
import { connect } from "react-redux";
import Spinner from "../Spinner/ContestSpinner/ContestSpinner";
import { StylesProvider } from "@material-ui/styles";

function Contest(props) {
  const socket = props.socket;
  const location = useLocation();
  const history = useHistory();
  const [joined, setJoined] = useState(false);
  const [lockOut, setLockout] = useState("");
  const [startSpinner, setSpinner] = useState(false);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    if (location.state === undefined) {
      history.push({
        pathname: "/newContest",
        search: "?room=" + searchParams.get("room"),
        state: { Name: "Gednady" },
      });
      window.location.reload();
    }
    const user = {
      Name: location.state ? location.state.Name : "Gednady",
      RoomId: searchParams.get("room"),
    };

    socket.emit("Contest-Join", user, ({ error, contest }) => {
      if (error) {
        return history.push({
          pathname: "/homepage",
          state: { error: error },
        });
      } else {
        const updatedContest = contest;
        console.log("updated-contest", updatedContest);
        props.setContest(updatedContest);
        setLockout(updatedContest);
      }
      return setJoined(true);
    });
    socket.on("Update", (updatedContest) => {
      console.log("updated!");
      props.setContest(updatedContest);
      setLockout(updatedContest);
      props.resetProblemLoading();
    });
  }, []);
  console.log('props.questionLoading',props.questionLoading)
  return !props.questionLoading && joined ? (
    lockOut.Started === false ? (
      <FilterContest socket={socket} roomId={lockOut.Id} />
    ) : (
      <LockoutPanel socket={socket} />
    )
  ) : (
    <Spinner />
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
