import {useEffect,useState} from 'react';
import { useLocation, useHistory } from "react-router-dom";
import FilterContest from './FilterContest/FilterContest';
import LockoutPage from '../../Pages/LockoutPage'

export default function Contest(props){
  const socket = props.socket;
  const location = useLocation();
  const history = useHistory();
  const [joined,setJoined] = useState(false);
  const [lockoutContest,setContest] = useState(null);

  useEffect(()=>{
    const searchParams = new URLSearchParams(location.search);
    console.log(location.state)
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
        console.log(contest);
        setContest(contest)
      }
      return setJoined(true);
    });
    socket.on("Update",(contest)=>{
      console.log("updated!")
      setContest(contest)
    })
  },[]);

  return joined ? (
    lockoutContest.Started === false? <FilterContest
    socket={socket} roomId={lockoutContest.Id} />:
          <LockoutPage socket={socket} />
  ):<></>
}
