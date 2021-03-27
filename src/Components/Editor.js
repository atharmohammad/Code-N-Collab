import React, { useEffect, useRef } from "react";
import AceEditor from "react-ace";
import axios from "axios";

import "ace-builds/src-noconflict/mode-c_cpp";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/mode-javascript";

import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/theme-tomorrow";
import "ace-builds/src-noconflict/theme-kuroir";

import "ace-builds/src-noconflict/ext-language_tools";

import {
  makeStyles,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
} from "@material-ui/core";

//main
const Editor = (props) => {
  const editorRef = useRef();

  const goCompile = async (e) => {
    console.log("Compiling",editorRef.current.editor.getValue());
    const url = "/execute";

    const sendData = {
      clientId: "d4b7771b3992895017e5ac5f42ec46e6",
      clientSecret:
        "37f00b6e1c5f23675ff6bd195a0e6d6631b9f8384dd9c25d1a82a5d274256db3",
      script: editorRef.current.editor.getValue(),
      stdin: "",
      language: "cpp14",
      versionIndex: "3",
    };

    try {
      const response = await axios({
        method: "post", //you can set what request you want to be
        url,
        mode: "no-cors",
        data: sendData,
        headers: {
          "Access-Control-Allow-Methods": "*",
          "Content-Type": "application/json",
        },
      });

      console.log("sucessfull", response.data);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Grid style={{ minHeight: "70vh" }}>
      <button onClick={goCompile}>run</button>

      <AceEditor
        ref={editorRef}
        mode="c_cpp"
        theme="monokai"
        fontSize={20}
        height="100%"
        width="100%"
        enableLiveAutocompletion={true}
        name="UNIQUE_ID_OF_DIV"
        editorProps={{ $blockScrolling: true }}
      />
    </Grid>
  );
};

export default Editor;
