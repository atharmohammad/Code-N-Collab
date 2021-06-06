import React, { useEffect, useState, useContext } from "react";
import * as TYPE from "../../../store/Action/action";
import { connect } from "react-redux";
import { useLocation } from "react-router-dom";
import classes from "./tools.module.css";
import { Box } from "@material-ui/core";
import {AuthContext} from "../../../context/auth-context"
import { useHistory } from "react-router-dom";

function Leave(props) {
  const history = useHistory();
  const location = useLocation();
  const [room, setRoom] = useState("");
  const [name, setName] = useState("");
  const [title,setTitle] = useState("");
  const auth = useContext(AuthContext);

  const socket = props.socket;
  const searchParams = new URLSearchParams(location.search);

  useEffect(() => {
    const currentPath = location.pathname;
    if(currentPath == "/newContest"){
      setTitle("End Contest");
    }else{
      setTitle("Leave Room")
      if (searchParams.has("room") && searchParams.get("room")) {
        setRoom(searchParams.get("room"));
      }
      if (searchParams.has("name") && searchParams.get("name")) {
        setName(searchParams.get("name"));
      }
    }
  }, [location]);

  const leaveRoomHandler = () => {
    const currentPath = location.pathname;
    if(currentPath === "/newContest"){
      socket.emit("Contest-Update",({roomId:searchParams.get("room")}))
      socket.emit("Leave-Contest",({
        name:auth.user.CodeforcesHandle,
        roomId:searchParams.get("room")
      }));
      history.push("/homepage");
    }else{
      try {
        props.leaveRoom();
        history.push("/rooms");
        window.location.reload();
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <Box className={classes.navButton} onClick={leaveRoomHandler}>
      {title}
    </Box>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    leaveRoom: () => dispatch({ type: TYPE.LEAVE_ROOM }),
  };
};

const mapStateToProps = state =>{
  return{
    contest:state.contest.contest
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Leave);
