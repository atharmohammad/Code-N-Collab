import React from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";

import { SET_THEME } from "../../../store/Action/action";
import { connect } from "react-redux";

import Grid from "@material-ui/core/Grid";
import classes from "./tools.module.css";
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const ThemePicker = (props) => {
  const handleChange = (event) => {
    props.setTheme(event.target.value);
  };

  return (
    <Grid style={{ display: "flex", margin: "2vh 0 0 4vh" }}>
    <FormControl className={classes.formControl}>
        <InputLabel style={{color:'#fff'}}
        shrink id="demo-simple-select-placeholder-label-label">
          Theme
        </InputLabel>
        <Select
          labelId="demo-simple-select-placeholder-label-label"
          id="demo-simple-select-placeholder-label"
          onChange={handleChange}
          displayEmpty
          className={`${classes.selectEmpty} ${classes.navSelect}`}
          value={props.theme}
        >
          <MenuItem value="vs-dark" selected>
            <em>vs-dark</em>
          </MenuItem>
          <MenuItem value="light">light</MenuItem>
          <MenuItem value="blackBoard">blackBoard</MenuItem>
          <MenuItem value="cobalt">cobalt</MenuItem>
          <MenuItem value="merbivore">merbivore</MenuItem>
          <MenuItem value="github">github</MenuItem>
        </Select>
      </FormControl>
    </Grid>
  );
};

const mapStateToProps = (state) => {
  return {
    theme: state.tools.theme,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setTheme: (value) => dispatch({ type: SET_THEME, value }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ThemePicker);
