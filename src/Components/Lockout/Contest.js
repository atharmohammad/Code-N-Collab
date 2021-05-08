import {useEffect,useState} from 'react';
import { useLocation, useHistory } from "react-router-dom";
import FilterContest from './FilterContest/FilterContest';
import LockoutPage from '../../Pages/LockoutPage'

export default function Contest(props){
  const socket = props.socket;
  const location = useLocation();
  const history = useHistory();
  const [joined,setJoined] = useState(false);

  useEffect(()=>{
    const searchParams = new URLSearchParams(location.search);

    const user = {
      Name:location.state.Name ? location.state.Name : "Adnan",
      RoomId:searchParams.get("room"),
    }

    socket.emit("Contest-Join",user,(error,u)=>{
      if(error){
        return history.push({
          pathname:"/homepage",
          state:{error:"Room is Full"}
        })
      }
      setJoined(true);
    });
  },[]);

  return joined ? (
    true ? <FilterContest socket={socket} />:
          <LockoutPage socket={socket} />
  ):<></>
}
