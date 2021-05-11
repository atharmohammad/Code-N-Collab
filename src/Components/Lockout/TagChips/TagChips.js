import React,{useState} from "react";
import { makeStyles } from "@material-ui/core/styles";
import Chip from "@material-ui/core/Chip";
import Paper from "@material-ui/core/Paper";
import TagFacesIcon from "@material-ui/icons/TagFaces";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import {connect} from "react-redux";
import * as TYPES from "../../../store/Action/action"

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    listStyle: "none",
    padding: theme.spacing(0.5),
    margin: 0
  },
  chip: {
    margin: theme.spacing(0.5)
  }
}));

function TagChips(props) {
  const classes = useStyles();
  const [chipData, setChipData] = useState([]);
  const [tags, setTags] = useState("");

  const handleChange = (event) => {
    setTags(event.target.value);
    let tagAlreadyExists = false;
    let tagKey = chipData.length;

    chipData.every((tag, i) => {
      if(tag.label === event.target.value){
        tagAlreadyExists = true;
        return false
      }
    });

    if(!tagAlreadyExists){
      setChipData([...chipData,{key:tagKey,label:event.target.value}]);
      props.updateProblemTags([...chipData,{key:tagKey,label:event.target.value}]);
    }

  };

  const handleDelete = (chipToDelete) => () => {
    const newChipArray = chipData.filter((chip) => chip.label !== chipToDelete.label)
    setChipData(newChipArray)
    props.updateProblemTags(newChipArray);
  };

  return (
    <div style={{display:"flex",flexDirection:"column"}}>
      <Paper component="ul" className={classes.root}>
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
      <FormControl>
        <InputLabel style={{ color: "black" }}>Tags</InputLabel>
        <Select
          onChange={handleChange}
          displayEmpty
          value={tags}
          style={{ width: "150px" }}
        >
          <MenuItem value="greedy">
            <em>greedy</em>
          </MenuItem>
          <MenuItem value="implementation"> implementation</MenuItem>
          <MenuItem value="math">math</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}

const mapDispatchToProps = dispatch =>{
  return{
    updateProblemTags:(chipsArray)=>{dispatch({type:TYPES.UPDATE_PROBLEM_TAGS,
                                data:chipsArray})}
  }
}

export default connect(null,mapDispatchToProps)(TagChips);
