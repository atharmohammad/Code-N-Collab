import React, { useEffect, useRef } from "react";
import AceEditor from "react-ace";
import axios from "axios";
import { connect } from "react-redux";
import { SET_LOADING, RESET_LOADING, SET_OUTPUT,SET_COMPILE_OFF } from "../store/Action/action";


import "ace-builds/src-noconflict/mode-c_cpp";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/mode-kotlin";

import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/theme-tomorrow";
import "ace-builds/src-noconflict/theme-ambiance";
import "ace-builds/src-noconflict/theme-nord_dark";
import "ace-builds/src-noconflict/theme-dracula";
import "ace-builds/src-noconflict/theme-clouds";

import "ace-builds/src-noconflict/ext-language_tools";

import {
  makeStyles,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
} from "@material-ui/core";

const languageMapper=(lang_mode) => {

  switch(lang_mode){
   case 'c_cpp': return {language:'cpp14',versionIndex:'3'}
   case 'python': return {language:'python3',versionIndex:'3'}
   case 'java': return {language:'java',versionIndex:'3'}
   case 'kotlin': return {language:'kotlin',versionIndex:'2'}

  }
  return {language:'cpp14',versionIndex:'3'} 
}

//main
const Editor = (props) => {
  const editorRef = useRef();

    useEffect( async() => {

    if(props.nowCompile === true && props.isLoading === false){
        props.setOutPut('')
        props.setLoading() 
        console.log("Compiling", editorRef.current.editor.getValue());
        const url = "/execute";
        
        const {language,versionIndex} = languageMapper(props.language)
        
        const sendData = {
          clientId: "d4b7771b3992895017e5ac5f42ec46e6",
          clientSecret:
            "37f00b6e1c5f23675ff6bd195a0e6d6631b9f8384dd9c25d1a82a5d274256db3",
          script: editorRef.current.editor.getValue(),
          stdin: props.input,
          language,
          versionIndex
        };
        
        let response;
        try {
           
          response = await axios({
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
          props.setOutPut("404")
        }
        props.resetCompile();
        
        try{
           props.setOutPut(response.data.output)
           console.log(response.data.output)
        }catch(e){
          props.setOutPut("Oops something went wrong")
        }
        
        props.resetLoading();
      };
     
  },[props.nowCompile]);

  
  return (
    <Grid style={{ minHeight: "70vh" }}>
      
      <AceEditor
        ref={editorRef}
        mode={props.language}
        theme={props.theme}
        fontSize={props.fontSize}
        height="100%"
        width="100%"
        enableLiveAutocompletion={true}
        name="UNIQUE_ID_OF_DIV"
        editorProps={{ $blockScrolling: true }}
      />
    </Grid>
  );
};

const mapStateToProps = (state) => {
  return {
    ...state
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setOutPut: (value) => dispatch({ type: SET_OUTPUT, value }),
    setLoading: () => dispatch({ type: SET_LOADING}),
    resetLoading: () => dispatch({ type: RESET_LOADING}),
    resetCompile: () => dispatch({ type: SET_COMPILE_OFF}),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Editor);
