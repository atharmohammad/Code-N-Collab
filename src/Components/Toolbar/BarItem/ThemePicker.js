import React from "react";
import { connect } from "react-redux";

import {
  Grid,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
} from "@material-ui/core";
import classes from "./tools.module.css";
import { SET_THEME } from "../../../store/Action/action";

const ThemePicker = (props) => {
  const handleChange = (event) => {
    props.setTheme(event.target.value);
  };

  return (
    <Grid className={classes.mainGrid}>
      <FormControl>
        <InputLabel style={{ color: "#fff", paddingLeft: "40px" }}>
          Theme
        </InputLabel>
        <Select
          onChange={handleChange}
          displayEmpty
          className={`${classes.selectEmpty} ${classes.navSelect}`}
          value={props.theme}
        >
          <MenuItem value="monokai" selected>
            <em>monokai</em>
          </MenuItem>
          
          <MenuItem value="light">light</MenuItem>
          <MenuItem value="dracula">dracula</MenuItem>
          <MenuItem value="material-palenight">material-palenight</MenuItem>
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
