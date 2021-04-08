import React, { useEffect, useContext, useRef, useState } from "react";
import { connect } from "react-redux";

import Editor from "@monaco-editor/react";
import { Convergence } from "@convergence/convergence";
import "@convergencelabs/monaco-collab-ext/css/monaco-collab-ext.min.css";
import { Grid } from "@material-ui/core";

import { CONVERGENCE_URL } from "./config";
import compilerFunc from "../Functions/compilerFunc";
import MonacoConvergenceAdapter from "./EditorAdaptor";
import Modal from "../Modal/Modal";

import {
  SET_LOADING,
  RESET_LOADING,
  SET_OUTPUT,
  SET_COMPILE_OFF,
} from "../../store/Action/action";

const MonacoEditor = (props) => {
  const MonacoEditorRef = useRef();
  const [code, setCode] = useState("");
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
        props.setOutPut(response.data.output);
        console.log(response.data.output);
      } catch (e) {
        props.setOutPut("Oops something went wrong");
      }
      props.resetLoading();
    }
  }, [props.tools.nowCompile]);



  useEffect(async () => {
    const credentials = { username: "testuser", password: "changeme" };
    try {
      const domain = await Convergence.connectAnonymously(
        CONVERGENCE_URL,
        props.credentials.userName
      );
      const modelService = domain.models();

      const model = await modelService.openAutoCreate({
        collection: "Code-n-Collab`",
        id: props.credentials.roomName,
        ephemeral: false,
        data: { text: code },
      });

      const adapter = new MonacoConvergenceAdapter(
        MonacoEditorRef.current,
        model.elementAt("text")
      );
      adapter.bind();
    } catch (error) {
      console.error("Could not open model ", error);
    }
  }, []);


  return (
    <Grid style={{ flexGrow: 1, overflow: "hidden", fontSize: "30px" }}>
      <Editor
        ref={MonacoEditorRef}
        onMount={(editor) => handleEditorDidMount(editor)}
        theme={props.tools.theme}
        defaultValue=""
        language={props.tools.language}
        onChange={(value) => setCode(value || "")}
        options={{
          wordWrap: "on",
          autoIndent: "advanced",
          fontSize: props.tools.fontSize,
        }}
      />
      {props.tools.isLoading === true ? <Modal /> : null}
    </Grid>
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
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MonacoEditor);
