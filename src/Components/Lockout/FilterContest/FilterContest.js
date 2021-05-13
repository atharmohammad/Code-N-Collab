import { useEffect, useState } from "react";
import { useLocation, useHistory } from "react-router-dom";
import ChatTabs from "../../Chat/ChatTabs";
import Filter from "../Filter/Filter";
import Spinner from "../../Spinner/ContestSpinner/ContestSpinner";
import {connect} from "react-redux";

const FilterContest = (props) => {
  const socket = props.socket;
  const [loadContest,setLoadContest] = useState(false);


  const startContestHandler = ()=>{
    socket.emit("Start-Contest",({room:props.roomId,
          problemTags:props.contestProblemsTags,
          minRating:props.minRating,
          maxRating:props.maxRating}));
    setLoadContest(true)
  }

return !loadContest ? (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <div style={{ display: "flex", flexDirection: "flex-end" }}>
        <Filter />
        <ChatTabs socket={socket} />
      </div>
      <div
        style={{
          background: "blue",
          color: "#fff",
          border: "2px solid white",
          borderRadius: "5px",
          padding: "10px",
          width: "140px",
          alignText: "center",
          cursor: "pointer",
        }}
      onClick={startContestHandler} >
        Start Contest
      </div>
    </div>
  ):<Spinner/>;
};

const mapStateToProps = state=>{
  return{
    contestProblemsTags:state.contest.ProblemTags,
    minRating:state.contest.minRating,
    maxRating:state.contest.maxRating
  }
}

export default connect(mapStateToProps,null)(FilterContest);
