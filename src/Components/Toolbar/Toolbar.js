import React from "react";
import LanguagePicker from './BarItem/LanguagePicker'
import ThemePicker from './BarItem/ThemePicker'
import CollaborateTools from './BarItem/CollaborateTools'
import Compile from './BarItem/Compile'
import FontSize from './BarItem/FontSize'
import RoomTitle from '../../Assets/images/roomTitle.png'
import Link from '../Link/Link'
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
        <Grid container direction='row' style={{backgroundColor:'#1f273d',height:'15vh',}}>
          <Grid style={{height:'15vh',margin:'4vh 0 0 2.5vh'}}>
            <img src={RoomTitle} alt='code-n-collab'/>
          </Grid>
          <Grid container direction='column' justify="center"
          alignItems="center" style={{width:'50%'}}>
            <Link/>
            <Grid direction='row' style={{display:'flex',width:'100%',paddingTop:'.5vh'}}>
              <Grid style={{display:'flex'}}>
                <LanguagePicker/>
                <ThemePicker/>
                <FontSize/>
              </Grid>
              <Compile/>
              <CollaborateTools/>
            </Grid>
          </Grid>
        </Grid>
  );
}
