import React from "react";
import LanguagePicker from './BarItem/LanguagePicker'
import ThemePicker from './BarItem/ThemePicker'
import CollaborateTools from './BarItem/CollaborateTools'
import Compile from './BarItem/Compile'
import FontSize from './BarItem/FontSize'


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
        <Grid style={{backgroundColor:'#f7f7f7',height:'6vh',display:'flex',width:'100%'}}>
          <Grid style={{display:'flex'}}>
          <LanguagePicker/>
          <ThemePicker/>
          <FontSize/>
          </Grid>
          <Compile/>
          <CollaborateTools/>
        </Grid>
  );
}
