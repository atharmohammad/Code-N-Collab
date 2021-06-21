import React from "react";
import { connect } from "react-redux";

import { SET_LANGUAGE } from "../../../store/Action/action";
import {
  Grid,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
} from "@material-ui/core";
import classes from "./tools.module.css";

const LanguagePicker = (props) => {
  const handleChange = (event) => {
    props.setLanguage(event.target.value);
  };

  return (
    <Grid className={classes.mainGrid}>
      <FormControl>
        <InputLabel style={{ color: "#fff", paddingLeft: "35px" }}>
          Language
        </InputLabel>
        <Select
          displayEmpty
          className={`${classes.selectEmpty} ${classes.navSelect}`}
          onChange={handleChange}
          value={props.language}
        >
          <MenuItem value="cpp" selected>
            <em>C/C++(14)</em>
          </MenuItem>
          <MenuItem value="csharp">C#</MenuItem>
          <MenuItem value="go">Go</MenuItem>
          <MenuItem value="java">Java</MenuItem>
          <MenuItem value="kotlin">Kotlin</MenuItem>
          <MenuItem value="lua">Lua</MenuItem>
          <MenuItem value="nodejs">NodeJs</MenuItem>
          <MenuItem value="pascal">Pascal</MenuItem>
          <MenuItem value="perl">Perl</MenuItem>
          <MenuItem value="php">Php</MenuItem>
          <MenuItem value="python">Python3</MenuItem>
          <MenuItem value="r">R</MenuItem>
          <MenuItem value="ruby">Ruby</MenuItem>
          <MenuItem value="rust">Rust</MenuItem>
          <MenuItem value="scala">Scala</MenuItem>
          <MenuItem value="shell">Shell</MenuItem>
          <MenuItem value="sql">SQL</MenuItem>
          <MenuItem value="swift">Swift</MenuItem>
          <MenuItem value="">Text</MenuItem>
        </Select>
      </FormControl>
    </Grid>
  );
};

const mapStateToProps = (state) => {
  return {
    language: state.tools.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setLanguage: (value) => dispatch({ type: SET_LANGUAGE, value }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LanguagePicker);
