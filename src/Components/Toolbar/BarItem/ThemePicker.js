import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';

import {SET_THEME } from '../../../store/Action/action'
import {connect} from 'react-redux'

import Grid from '@material-ui/core/Grid';


const useStyles = makeStyles((theme) => ({
  select: {
    borderRadius: '7px',
    background:'#3b362a',
    position: 'relative',
    fontSize: 12,
    height:'4vh',
    cursor:'pointer',
    color:'#fff',

  },
}));

const ThemePicker = (props) => {
  const classes = useStyles();

  const handleChange = (event) => {
    props.setTheme(event.target.value);
  };

  return (
    <Grid style={{display:'flex',margin:'.8vh 0 0 4vh'}}>
        <select className={classes.select} onChange={handleChange} value={props.theme}>
            <option value='monokai' selected>monokai</option>
            <option value='tomorrow'>tomorrow</option>
            <option value='dracula' >Drakula</option>
            <option value='ambiance' >Ambiance</option>
            <option value='clouds' >Clouds</option>
        </select>
    </Grid>
  );
}

const mapStateToProps = (state) => {
  return {
    theme: state.tools.theme
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setTheme: (value) => dispatch({ type:SET_THEME, value})
  };
};

export default connect(mapStateToProps,mapDispatchToProps)(ThemePicker);
