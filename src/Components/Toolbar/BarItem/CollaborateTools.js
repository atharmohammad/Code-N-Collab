import React from "react";
import * as TYPE from '../../../store/Action/action'
import {connect} from 'react-redux'
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
    <Grid style={{display:'flex',margin:'2vh 0 0 20vh'}}>

      <Typography component='div' variant='body1' style={{fontSize:'15px',fontFamily: ['Syne Mono', 'monospace'].join(),fontWeight:'bold',minHeight:'2vh',padding:'.6vh',color:'#fff'}} className={classes.button}>
          {props.userName}
      </Typography>


     <Typography component='div' variant='body1' style={{fontSize:'15px',fontFamily: ['Syne Mono', 'monospace'].join(),fontWeight:'bold',minHeight:'2vh',padding:'.6vh',marginLeft:'5vh',color:'#fff'}} className={classes.button}>
         {props.roomName}
     </Typography>

    <Box fontStyle="italic" fontWeight="fontWeightBold" style={{cursor:'pointer',color:'white',height:'3.5vh',width:'10vh',borderRadius:'5px',backgroundColor:'#872e2e',margin:'.4vh 0 1vh 5vh'}} onClick={leaveRoomHandler}>
    <Typography component='div' variant='body1' style={{fontSize:'10px',fontFamily: ['Syne Mono', 'monospace'].join(),fontWeight:'bold',padding:'1vh'}} className={classes.button}>
        Leave Room
    </Typography>
   </Box>
    </Grid>
  );
}

const mapStateToProps = state=>{
  return{
    userName:state.credentials.userName,
    roomName:state.credentials.roomName
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    leaveRoom: () => dispatch({ type:TYPE.LEAVE_ROOM}),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CollabToolbar);
