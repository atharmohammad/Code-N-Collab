import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Chip,
  Paper,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
} from "@material-ui/core";
import { connect } from "react-redux";
import * as TYPES from "../../../store/Action/action";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    listStyle: "none",
    padding: theme.spacing(0.5),
    margin: 0,
  },
  chip: {
    margin: theme.spacing(0.5),
  },
}));

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

const TagChips = (props) => {
  const classes = useStyles();
  const [chipData, setChipData] = useState([]);
  const [tags, setTags] = useState("");

  const handleChange = (event) => {
    setTags(event.target.value);
    let tagKey = chipData.length;

    const chipIndex = chipData.findIndex(
      (tag, i) => tag.label === event.target.value
    );

    if (chipIndex === -1) {
      setChipData([...chipData, { key: tagKey, label: event.target.value }]);
      props.updateProblemTags([
        ...chipData,
        { key: tagKey, label: event.target.value },
      ]);
    }
  };

  const handleDelete = (chipToDelete) => () => {
    const newChipArray = chipData.filter(
      (chip) => chip.label !== chipToDelete.label
    );
    setChipData(newChipArray);
    props.updateProblemTags(newChipArray);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column"}}>
      <FormControl>
        <InputLabel style={{ color: "black" }}>Tags</InputLabel>
        <Select
          onChange={handleChange}
          displayEmpty
          value={tags}
          style={{ width: "150px" }}
        >
          {names.map((name) => (
            <MenuItem key={name} value={name}>
              {name}
            </MenuItem>
          ))}
        </Select>
        <Paper component="ul" className={classes.root} style={{marginTop:'10px'}}>
          {chipData.map((data) => {
            return (
              <li key={data.key}>
                <Chip
                  label={data.label}
                  onDelete={handleDelete(data)}
                  className={classes.chip}
                />
              </li>
            );
          })}
        </Paper>
      </FormControl>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateProblemTags: (chipsArray) => {
      dispatch({ type: TYPES.UPDATE_PROBLEM_TAGS, data: chipsArray });
    },
  };
};

export default connect(null, mapDispatchToProps)(TagChips);
