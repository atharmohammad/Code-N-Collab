import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import {SET_LANGUAGE } from '../../../store/Action/action'
import {connect} from 'react-redux'
import Grid from '@material-ui/core/Grid';
import classes from './tools.module.css'

const LanguagePicker = (props) => {

  const handleChange = (event) => {
    props.setLanguage(event.target.value);
  };

  return (
    <Grid style={{display:'flex',margin:'2vh 0 0 5vh'}}>
        <select className={classes.navSelect} onChange={handleChange} value={props.language}>
            <option value='cpp' selected>C/C++(14)</option>
            <option value='csharp'>C#</option>
            <option value='go'>Go</option>
            <option value='java'>Java</option>
            <option value='kotlin'>Kotlin</option>
            <option value='lua'>Lua</option>
            <option value='nodejs'>NodeJs</option>
            <option value='pascal'>Pascal</option>
            <option value='perl'>Perl</option>
            <option value='php'>Php</option>
            <option value='python'>Python3</option>
            <option value='r'>R</option>
            <option value='ruby'>Ruby</option>
            <option value='rust'>Rust</option>
            <option value='scala'>Scala</option>
            <option value='shell'>Shell</option>
            <option value='sql'>SQL</option>
            <option value='swift'>Swift</option>
            <option value=''>Text</option>
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
