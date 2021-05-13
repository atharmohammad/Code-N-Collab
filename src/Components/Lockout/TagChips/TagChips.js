import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import * as TYPES from "../../../store/Action/action";

import {
  Input,
  InputLabel,
  MenuItem,
  FormControl,
  ListItemText,
  Select,
  Checkbox,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    maxWidth: 180,
  },
  noLabel: {
    marginTop: theme.spacing(3),
  },
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const names = [
  "2-sat",
  "binary search",
  "bitmasks",
  "brute force",
  "chinese remainder theorem",
  "combinatorics",
  "constructive algorithms",
  "data structures",
  "dfs and similar",
  "divide and conquer",
  "dp",
  "dsu",
  "expression parsing",
  "fft",
  "flows",
  "games",
  "geometry",
  "graph matchings",
  "graphs",
  "greedy",
  "hashing",
  "implementation",
  "interactive",
  "math",
  "matrices",
  "meet-in-the-middle",
  "number theory",
  "probabilities",
  "schedules",
  "shortest paths",
  "sortings",
  "string suffix structures",
  "strings",
  "ternary search",
  "trees",
  "two pointers",
];

const MultipleSelect = (props) => {
  const classes = useStyles();

  const handleChange = (event) => {
    props.updateProblemTags(event.target.value);
  };

  return (
    <div>
      <FormControl className={classes.formControl}>
        <InputLabel>Tag</InputLabel>
        <Select
          multiple
          value={props.ProblemTags}
          onChange={handleChange}
          input={<Input />}
          renderValue={(selected) => selected.join(", ")}
        >
          {names.map((name) => (
            <MenuItem key={name} value={name}>
              <Checkbox checked={props.ProblemTags.indexOf(name) > -1} />
              <ListItemText primary={name} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    ProblemTags: state.contest.ProblemTags,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateProblemTags: (chipsArray) => {
      dispatch({ type: TYPES.UPDATE_PROBLEM_TAGS, data: chipsArray });
    },
  };
};

const x=()=>{
  return <></> 
}
export default connect(mapStateToProps, mapDispatchToProps)(MultipleSelect);
