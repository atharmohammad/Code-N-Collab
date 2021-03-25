import React from "react";

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

export default function Toolbar(props) {
  const history = useHistory();
  const classes = useStyles();

  return (
    <Grid style={{display:'flex',margin:'1vh 0 0 25vh'}}>

      <Typography component='div' variant='body1' style={{fontSize:'15px',fontFamily: ['Syne Mono', 'monospace'].join(),fontWeight:'bold',minHeight:'2vh',padding:'.6vh'}} className={classes.button}>
          Username
      </Typography>


     <Typography component='div' variant='body1' style={{fontSize:'15px',fontFamily: ['Syne Mono', 'monospace'].join(),fontWeight:'bold',minHeight:'2vh',padding:'.6vh',marginLeft:'5vh'}} className={classes.button}>
         Room Name
     </Typography>

    <Box fontStyle="italic" fontWeight="fontWeightBold" style={{cursor:'pointer',marginLeft:'5vh',color:'white',height:'4vh'
    ,padding:'.5vh',borderRadius:'5px',backgroundColor:'#d14343',margin:'0 0 2vh 5vh'}}>
    <Typography component='div' variant='body1' style={{fontSize:'10px',fontFamily: ['Syne Mono', 'monospace'].join(),fontWeight:'bold',padding:'.4vh'}} className={classes.button}>
        Leave Room
    </Typography>
   </Box>
    </Grid>
  );
}
