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
  const testHandler = ()=>{
    history.push('/test')
  }
  return (
    <React.Fragment>
      <CssBaseline />
        <Grid style={{backgroundColor:'#fff',borderBottom:'2px solid black',minHeight:'8vh',display:'flex'}}>
            <Typography component='div' variant='h4' style={{color:'black',fontSize:'25px',margin:'1vh 1vh 1vh 3vh',border:'2px solid black',padding:'1vh',borderRadius:'5px'}}>
                <Box fontStyle="italic" fontWeight="fontWeightBold" style={{cursor:'pointer',fontFamily: ['Fredoka One', 'cursive'].join()}} onClick={homeHandler}>Code - N - Collab</Box>
            </Typography>
                <Box fontStyle="italic" fontWeight="fontWeightBold" style={{cursor:'pointer',color:'white',padding:'.5vh',borderRadius:'5px',backgroundColor:'black',margin:'2vh 0 2.4vh 5vh'}} onClick={collabHandler} >
                <Typography component='div' variant='body1' style={{fontSize:'10px',fontFamily: ['Syne Mono', 'monospace'].join(),fontWeight:'bold',minHeight:'2vh',padding:'1vh'}} className={classes.button}>
                    Collaborate
                </Typography>
               </Box>

               <Box fontStyle="italic" fontWeight="fontWeightBold" style={{cursor:'pointer',color:'white',padding:'.5vh',borderRadius:'5px',backgroundColor:'black',margin:'2vh 0 2.4vh 5vh'}} onClick={testHandler} >
               <Typography component='div' variant='body1' style={{fontSize:'10px',fontFamily: ['Syne Mono', 'monospace'].join(),fontWeight:'bold',minHeight:'2vh',padding:'1vh'}} className={classes.button}>
                   Test
               </Typography>
              </Box>
        </Grid>
    </React.Fragment>
  );
}
