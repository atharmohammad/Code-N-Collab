import React, { useEffect, useContext, useRef, useState } from "react";
import { connect } from "react-redux";
import axios from 'axios';

import Editor from "@monaco-editor/react";
import { Convergence } from "@convergence/convergence";
import "@convergencelabs/monaco-collab-ext/css/monaco-collab-ext.min.css";
import { Grid } from "@material-ui/core";

import { CodeEditorConfig } from "./config";
import {compilerFunc} from "../Functions/index";
import MonacoConvergenceAdapter from "./EditorAdaptor";
import Modal from "../Modal/Modal";

import blackBoardJSON from "./manaco-Themes/blackBoard";
import cobaltJSON from "./manaco-Themes/cobalt";
import merbivoreJSON from "./manaco-Themes/merbivore";
import githubJSON from "./manaco-Themes/github";


import { v4 as uuidV4 } from 'uuid';
import socketIOClient from "socket.io-client";

import {
  SET_LOADING,
  RESET_LOADING,
  SET_OUTPUT,
  SET_COMPILE_OFF,
  NOTIFY_OUTPUT_SUCCESS,
  NOTIFY_OUTPUT_ERROR
} from "../../store/Action/action";

const ENDPOINT = "http://127.0.0.1:8080";
const MonacoEditor = (props) => {
  const MonacoEditorRef = useRef();
  const [code, setCode] = useState("");
  const [service,setService] = useState(null);
  const [codeValue,setCodeValue] = useState("");

  const handleEditorWillMount = (monaco) => {
    // here is the monaco instance
    // do something before editor is mounted
    monaco.editor.defineTheme("blackBoard", blackBoardJSON);
    monaco.editor.defineTheme("cobalt", cobaltJSON);
    monaco.editor.defineTheme("merbivore", merbivoreJSON);
    monaco.editor.defineTheme("github", githubJSON);
  };

  const handleEditorDidMount = (editor) => {
    MonacoEditorRef.current = editor;
  };

  useEffect(async () => {
    if (props.tools.nowCompile === true && props.tools.isLoading === false) {
      props.setOutPut("");
      props.setLoading();

      let response = await compilerFunc(
        props.tools.language,
        code,
        props.tools.input
      );
      props.resetCompile();

      try {
        // throw new Error();
        props.setOutPut(response.data.output);
        props.notify_output_on()
        console.log(response.data.output);
      } catch (e) {
        props.setOutPut("Oops something went wrong");
        props.notify_output_error_on()
      }
      props.resetLoading();
    }
  }, [props.tools.nowCompile]);

  useEffect(async () => {
    const socket = socketIOClient(ENDPOINT);
    socket.emit("join",{room:props.credentials.roomName,user:uuidV4()});

    socket.on('initialCode',data=>{
      console.log(data)
      setCodeValue(data)
    })

    const credentials = { username: "testuser", password: "changeme" };
    let modelService;
    try {
      const domain = await Convergence.connectAnonymously(
        CodeEditorConfig.CONVERGENCE_URL,
        props.credentials.userName
      );
      modelService = domain.models();

      const model = await modelService.openAutoCreate({
        collection: "Code-n-Collab`",
        id: props.credentials.roomName,
        ephemeral: false,
        data: { text: code },
      });


      // setService(modelService);

      const adapter = new MonacoConvergenceAdapter(
        MonacoEditorRef.current,
        model.elementAt("text")
      );
      adapter.bind();
    } catch (error) {
      console.error("Could not open model ", error);
    }

    return function cleanup(){
      console.log("Removed :(");
    }

  }, []);

  return (
    <>
      <Editor
        ref={MonacoEditorRef}
        beforeMount={handleEditorWillMount}
        onMount={(editor) => handleEditorDidMount(editor)}
        theme={props.tools.theme}
        value={codeValue}
        language={props.tools.language}
        onChange={(value) => setCode(value || "")}
        options={{
          wordWrap: "on",
          autoIndent: "advanced",
          fontSize: props.tools.fontSize,
        }}
      />
      {props.tools.isLoading === true ? <Modal /> : null}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    ...state,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setOutPut: (value) => dispatch({ type: SET_OUTPUT, value }),
    setLoading: () => dispatch({ type: SET_LOADING }),
    resetLoading: () => dispatch({ type: RESET_LOADING }),
    resetCompile: () => dispatch({ type: SET_COMPILE_OFF }),
    notify_output_on:()=>dispatch({type:NOTIFY_OUTPUT_SUCCESS}),
    notify_output_error_on:()=>dispatch({type:NOTIFY_OUTPUT_ERROR})
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MonacoEditor);
