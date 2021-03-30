import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import {SET_FONT_SIZE } from '../../../store/Action/action'
import {connect} from 'react-redux'
import Grid from '@material-ui/core/Grid';


const useStyles = makeStyles((theme) => ({
  select: {
    borderRadius: '7px',
    background:'#3b362a',
    position: 'relative',
    fontSize: 14,
    height:'3.5vh',
    cursor:'pointer',
    color:'#fff',
  },
}));

const CustomizeFont = (props) => {

  const classes = useStyles();

  const handleChange = (event) => {
    props.setFontSize(parseInt(event.target.value));
    // console.log(event.target.value)
  };

  return (
    <Grid style={{display:'flex',margin:'.8vh 0 0 5vh'}}>
        <select className={classes.select} onChange={handleChange} value={props.font}>
            <option value={18}>small</option>
            <option value={21} selected>Medium</option>
            <option value={28}>Large</option>
        </select>
    </Grid>
  );
}

const mapStateToProps = (state) => {
  return {
    font: state.tools.fontSize
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setFontSize: (value) => dispatch({ type:SET_FONT_SIZE, value})
  };
};

export default connect(mapStateToProps,mapDispatchToProps)(CustomizeFont);
