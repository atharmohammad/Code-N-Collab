import React from "react";
import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-c_cpp";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/ext-language_tools";

import { makeStyles,FormControl,InputLabel,Select,MenuItem } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const changeHandler = (e) => {
console.log(e);
};

//main
const Editor = (props) => {
  const classes = useStyles();


  return (
    <>
         <FormControl variant="filled" className={classes.formControl}>
        <InputLabel id="demo-simple-select-filled-label">Lang..</InputLabel>
        <Select
          labelId="demo-simple-select-filled-label"
          id="demo-simple-select-filled"
          value={0}
          onChange={changeHandler}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
      </FormControl>

    <AceEditor style={{marginTop:'5px'}}
      mode="c_cpp"
      theme="monokai"
      fontSize={16}
      height='80%'
      width="100%"
      onChange={changeHandler}
      enableLiveAutocompletion={true}
      name="UNIQUE_ID_OF_DIV"
      editorProps={{ $blockScrolling: true }}
    />
    </>
  );
};

export default Editor;
