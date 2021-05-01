import React, { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import { useLocation } from "react-router-dom";

import Editor from "@monaco-editor/react";
import { Convergence } from "@convergence/convergence";
import "@convergencelabs/monaco-collab-ext/css/monaco-collab-ext.min.css";

import { CodeEditorConfig } from "./config";
import { compilerFunc } from "../Functions/compilerFunc";
import MonacoConvergenceAdapter from "./EditorAdaptor";
import Modal from "../Modal/Modal";
import Graph from "../Graph/Graph";

import blackBoardJSON from "./manaco-Themes/blackBoard";
import cobaltJSON from "./manaco-Themes/cobalt";
import merbivoreJSON from "./manaco-Themes/merbivore";
import githubJSON from "./manaco-Themes/github";

import {
  SET_LOADING,
  RESET_LOADING,
  SET_OUTPUT,
  SET_INPUT,
  SET_COMPILE_OFF,
  NOTIFY_OUTPUT_SUCCESS,
  NOTIFY_OUTPUT_ERROR,
  SET_SOME_ONE_SEND_IO,
  RESET_SOME_ONE_SEND_IO,
} from "../../store/Action/action";

const MonacoEditor = (props) => {
  const socket = props.socket;
  const MonacoEditorRef = useRef();
  const inputRef = useRef();
  const outputRef = useRef();
  const [code, setCode] = useState("");
  const [codeValue, setCodeValue] = useState("");
  const location = useLocation();

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

  //compiling the code
  useEffect(async () => {
    if (props.tools.nowCompile === true && props.tools.isLoading === false) {
      props.setOutput("");
      props.setLoading();
      socket.emit('Compile_ON');

      let response = await compilerFunc(
        props.tools.language,
        code,
        props.tools.input
      );
      props.resetCompile();

      try {
        props.setOutput(response.data.output);
        props.notify_output_on();
      } catch (e) {
        props.setOutPut("Oops something went wrong");
        props.notify_output_error_on();
      }
      socket.emit("Compile_OFF")
      props.resetLoading();
      props.resetReceivedIO();
    }
  }, [props.tools.nowCompile]);

  //socket and convergence
  useEffect(async () => {
    socket.on("initialCode", (data) => {
      setCodeValue(data);
    });

    socket.on("initialIO", ({ inputText, outputText }) => {
      props.setInput(inputText);
      props.setOutput(outputText);
      props.recievedIO();
    });

    socket.on("sendInitialIO", ({ id }) => {
      const creator = () => {
        const inputText = inputRef.current.value;
        const outputText = outputRef.current.value;

        const data = {
          id,
          inputText,
          outputText,
        };
        socket.emit("takeInitialIO", data);
      };
      creator();
    });

      socket.on("Compile_ON",()=>{
        props.setLoading();
      })

      socket.on('Compile_OFF',()=>{
        props.resetLoading();
      })

    const credentials = { username: "testuser", password: "changeme" };
    let modelService;
    const currentPath = location.pathname;
    const searchParams = new URLSearchParams(location.search);

    try {
      const domain = await Convergence.connectAnonymously(
        CodeEditorConfig.CONVERGENCE_URL,
        searchParams.get("name").trim()
      );
      modelService = domain.models();

      const model = await modelService.openAutoCreate({
        collection: "Code-n-Collab`",
        id: searchParams.get("room").trim(),
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

  useEffect(() => {
    if (props.tools.someOneSendIO === false)
      socket.emit("changeIO", {
        inputText: props.tools.input,
        outputText: props.tools.output,
      });
  }, [props.tools.input, props.tools.output, props.tools.someOneSendIO]);

  return (
    <>
      <textarea hidden ref={inputRef} value={props.tools.input} />
      <textarea hidden ref={outputRef} value={props.tools.output} />
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
      {props.tools.showGraph === true ? <Graph /> : null}
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
    setOutput: (value) => dispatch({ type: SET_OUTPUT, value }),
    setInput: (value) => dispatch({ type: SET_INPUT, value }),
    setLoading: () => dispatch({ type: SET_LOADING }),
    resetLoading: () => dispatch({ type: RESET_LOADING }),
    resetCompile: () => dispatch({ type: SET_COMPILE_OFF }),
    resetReceivedIO: () => dispatch({ type: RESET_SOME_ONE_SEND_IO }),
    recievedIO: () => dispatch({ type: SET_SOME_ONE_SEND_IO }),
    notify_output_on: () => dispatch({ type: NOTIFY_OUTPUT_SUCCESS }),
    notify_output_error_on: () => dispatch({ type: NOTIFY_OUTPUT_ERROR }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MonacoEditor);
