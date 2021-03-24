import React from "react";
import PropTypes from "prop-types";
import {
  AppBar,
  Toolbar,
  Typography,
  CssBaseline,
  useScrollTrigger,
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

function ElevationScroll(props) {
  const { children, window } = props;

  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: window ? window() : undefined,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
}
export default function ElevateAppBar(props) {
  const history = useHistory();
  const classes = useStyles();

  const homeHandler=()=>{
    history.push('/home');
  }

  const collabHandler = ()=>{
    history.push('/editor')
  }
  return (
    <React.Fragment>
      <CssBaseline />
        <Grid style={{backgroundColor:'#f2f2f2',borderBottom:'2px solid black',minHeight:'8vh',display:'flex'}}>
            <Typography component='div' variant='h4' style={{color:'#3b362a',fontSize:'25px',margin:'1vh'}}>
                <Box fontStyle="italic" fontWeight="fontWeightBold" style={{cursor:'pointer',fontFamily: ['Fredoka One', 'cursive'].join()}} onClick={homeHandler}>COLLAB</Box>
            </Typography>
                <Box fontStyle="italic" fontWeight="fontWeightBold" style={{cursor:'pointer',marginLeft:'5vh',color:'white',padding:'.5vh',borderRadius:'5px',backgroundColor:'#3b362a',margin:'1vh 0 2vh 5vh'}} onClick={collabHandler} >
                <Typography component='div' variant='body1' style={{fontSize:'10px',fontFamily: ['Syne Mono', 'monospace'].join(),fontWeight:'bold',minHeight:'2vh',padding:'.6vh'}} className={classes.button}>
                    Collaborate
                </Typography>
               </Box>
        </Grid>
    </React.Fragment>
  );
}
