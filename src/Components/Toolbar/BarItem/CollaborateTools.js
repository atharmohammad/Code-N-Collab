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
  button:{
    '&:hover': {
            backgroundColor: '#fff',
            color:'#3b362a'
      }
  }
}));

 function CollabToolbar(props) {
  const history = useHistory();
  const classes = useStyles();

  const leaveRoomHandler = ()=>{
    try{
      props.leaveRoom();
      history.push('/home')
    }catch(err){
      console.log(err);
    }
  }

  return (
    <Grid style={{display:'flex',margin:'1vh 0 0 25vh'}}>

      <Typography component='div' variant='body1' style={{fontSize:'15px',fontFamily: ['Syne Mono', 'monospace'].join(),fontWeight:'bold',minHeight:'2vh',padding:'.6vh'}} className={classes.button}>
          User
      </Typography>


     <Typography component='div' variant='body1' style={{fontSize:'15px',fontFamily: ['Syne Mono', 'monospace'].join(),fontWeight:'bold',minHeight:'2vh',padding:'.6vh',marginLeft:'5vh'}} className={classes.button}>
         Room Name
     </Typography>

    <Box fontStyle="italic" fontWeight="fontWeightBold" style={{cursor:'pointer',color:'white',height:'4vh'
    ,padding:'.5vh',borderRadius:'5px',backgroundColor:'#872e2e',margin:'.4vh 0 1vh 5vh'}} onClick={leaveRoomHandler}>
    <Typography component='div' variant='body1' style={{fontSize:'10px',fontFamily: ['Syne Mono', 'monospace'].join(),fontWeight:'bold',padding:'.4vh'}} className={classes.button}>
        Leave Room
    </Typography>
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
