import {useEffect,useState} from 'react';
import { useLocation, useHistory } from "react-router-dom";
import FilterContest from './FilterContest/FilterContest';
import Problem from '../Lockout/LockoutPanel/Problem'
import * as TYPES from "../../store/Action/action";
import {connect} from "react-redux";
import Spinner from "../Spinner/ContestSpinner/ContestSpinner";

function Contest(props){
  const socket = props.socket;
  const location = useLocation();
  const history = useHistory();
  const [joined,setJoined] = useState(false);
  const [lockOut,setLockout] = useState("");
  const [startSpinner,setSpinner] = useState(false);

  useEffect(()=>{
    const searchParams = new URLSearchParams(location.search);
    if(location.state === undefined){
      history.push({
        pathname:"/newContest",
        search:"?room=" + searchParams.get("room"),
        state:{Name:"Adnan"}
      })
      window.location.reload();
    }
    const user = {
      Name:location.state ? location.state.Name : "Adnan",
      RoomId:searchParams.get("room"),
    }

    socket.emit("Contest-Join",user,({error,contest})=>{
      if(error){
        return history.push({
          pathname:"/homepage",
          state:{error:error}
        })
      }else{
        const updatedContest = contest;
        console.log(updatedContest);
        props.setContest(updatedContest)
        setLockout(updatedContest)
      }
      return setJoined(true);
    });
    socket.on("Update",(updatedContest)=>{
      console.log("updated!")
      props.setContest(updatedContest);
      setLockout(updatedContest)
    })
  },[]);

  return joined ? (
    lockOut.Started === false? <FilterContest
    socket={socket} roomId={lockOut.Id} />:
          <Problem socket={socket}/>
  ):<Spinner/>
}

const mapStateToProps = state=>{
  return{
    contest:state.contest.contest
  }
}

const mapDispatchToProps = dispatch=>{
  return{
    setContest:(updatedContest)=>{dispatch({type:TYPES.CONTEST_UPDATED,data:updatedContest})}
  }
}

export default connect(null,mapDispatchToProps)(Contest)
