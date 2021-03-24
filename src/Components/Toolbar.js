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
        <Grid style={{backgroundColor:'#f2f2f2',height:'4vh',display:'flex',width:'100%',borderBottom:'2px solid black'}}>
        </Grid>
  );
}
