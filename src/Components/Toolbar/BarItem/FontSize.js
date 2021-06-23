import React from "react";
import { connect } from "react-redux";

import {
  Grid,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
} from "@material-ui/core";
import { SET_FONT_SIZE } from "../../../store/Action/action";
import classes from "./tools.module.css";

const CustomizeFont = (props) => {
  const handleChange = (event) => {
    props.setFontSize(parseInt(event.target.value));
  };

  return (
    <Grid className={classes.mainGrid}>
      <FormControl>
        <InputLabel style={{ color: "#fff", paddingLeft: "50px" }}>
          Font
        </InputLabel>
        <Select
          onChange={handleChange}
          displayEmpty
          className={`${classes.selectEmpty} ${classes.navSelect}`}
          value={props.font}
        >
          <MenuItem value={20} >
            Small
          </MenuItem>
          <MenuItem value={25} selected><em>Medium</em></MenuItem>
          <MenuItem value={35}>Large</MenuItem>
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
