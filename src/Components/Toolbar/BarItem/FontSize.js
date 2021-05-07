import React from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { SET_FONT_SIZE } from "../../../store/Action/action";
import { connect } from "react-redux";
import Grid from "@material-ui/core/Grid";
import classes from "./tools.module.css";
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const CustomizeFont = (props) => {
  const handleChange = (event) => {
    props.setFontSize(parseInt(event.target.value));
    // console.log(event.target.value)
  };

  return (
    <Grid style={{ display: "flex", margin: "2vh 0 0 5vh" }}>
    <FormControl className={classes.formControl}>
        <InputLabel style={{color:'#fff'}}
        shrink id="demo-simple-select-placeholder-label-label">
          Font
        </InputLabel>
        <Select
          labelId="demo-simple-select-placeholder-label-label"
          id="demo-simple-select-placeholder-label"
          onChange={handleChange}
          displayEmpty
          className={`${classes.selectEmpty} ${classes.navSelect}`}
          value={props.font}
        >
          <MenuItem value={20} selected>
            <em>small</em>
          </MenuItem>
          <MenuItem value={25}>Medium</MenuItem>
          <MenuItem value={30}>Large</MenuItem>
        </Select>
      </FormControl>
    </Grid>
  );
};

const mapStateToProps = (state) => {
  return {
    font: state.tools.fontSize,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setFontSize: (value) => dispatch({ type: SET_FONT_SIZE, value }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CustomizeFont);
