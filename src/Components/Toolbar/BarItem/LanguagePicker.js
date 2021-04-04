import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import {SET_LANGUAGE } from '../../../store/Action/action'
import {connect} from 'react-redux'
import Grid from '@material-ui/core/Grid';


const useStyles = makeStyles((theme) => ({
  select: {
    borderRadius: '7px',
    background:'#fff',
    position: 'relative',
    fontSize: 12,
    height:'3.5vh',
    cursor:'pointer',
    color:'#1f273d',
  },
}));

const LanguagePicker = (props) => {
  const classes = useStyles();

  const handleChange = (event) => {
    props.setLanguage(event.target.value);
    // console.log(event.target.value)
  };

  return (
    <Grid style={{display:'flex',margin:'.8vh 0 0 40vh'}}>
        <select className={classes.select} onChange={handleChange} value={props.language}>
            <option value='c_cpp' selected>C/C++(14)</option>
            <option value='java'>Java</option>
            <option value='python'>Python3</option>
            <option value='kotlin'>Kotlin</option>
        </select>
    </Grid>
  );
}

const mapStateToProps = (state) => {
  return {
    language: state.tools.language
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setLanguage: (value) => dispatch({ type:SET_LANGUAGE, value})
  };
};

export default connect(mapStateToProps,mapDispatchToProps)(LanguagePicker);
