import React,{useEffect,useState} from "react";
import * as TYPE from '../../../store/Action/action'
import {connect} from 'react-redux'
import {useLocation} from 'react-router-dom'

import {
  Typography,
  CssBaseline,
  Box,
  Button,makeStyles,Grid
} from "@material-ui/core";
import {useHistory} from 'react-router-dom';

const useStyles = makeStyles((theme) => ({

}));

 function CollabToolbar(props) {
  const history = useHistory();
  const classes = useStyles();
  const location = useLocation();
  const [room,setRoom] = useState("");
  const [name,setName] = useState("");

  useEffect(()=>{
    const currentPath = location.pathname;
    const searchParams = new URLSearchParams(location.search);
    if(searchParams.has("room") && searchParams.get("room")){
      setRoom(searchParams.get("room"));
    }
    if(searchParams.has("name") && searchParams.get("name")){
      setName(searchParams.get("name"));
    }
  },[location])


  const leaveRoomHandler = ()=>{
    try{
      props.leaveRoom();
      history.push('/rooms')
      window.location.reload()
    }catch(err){
      console.log(err);
    }
  }

  return (
    <Grid style={{margin:'1.5vh 0 0 10vh'}}>
      <Box style={{cursor:'pointer',
      color:'white',
      height:'4vh',
      width:'13vh',
      borderRadius:'5px',
      backgroundColor:'#872e2e',
      fontSize:'14px',
      padding:'0.5vh 0 0 0.4vh',
      textAlign:'center'}} onClick={leaveRoomHandler}>
          Leave Room
        </Box>
    </Grid>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    leaveRoom: () => dispatch({ type:TYPE.LEAVE_ROOM}),
  };
};

export default connect(null, mapDispatchToProps)(CollabToolbar);
