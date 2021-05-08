import React, { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";

import Editor from "@monaco-editor/react";

import Modal from "../../Modal/Modal";
import Graph from "../../Graph/Graph";
import blackBoardJSON from "../../manaco-Themes/blackBoard";
import cobaltJSON from "../../manaco-Themes/cobalt";
import merbivoreJSON from "../../manaco-Themes/merbivore";
import githubJSON from "../../manaco-Themes/github";

import {
  SET_LOADING,
  SET_OUTPUT,
} from "../../../store/Action/action";

const MonacoEditor = (props) => {
  const socket = props.socket;
  const [code, setCode] = useState("");
  const MonacoEditorRef = useRef();

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
      socket.emit("Compile_ON", {
        language: props.tools.language,
        code,
        input: props.tools.input,
      });
    }
  }, [props.tools.nowCompile]);


  return (
    <>
      <Editor
        ref={MonacoEditorRef}
        beforeMount={handleEditorWillMount}
        onMount={(editor) => handleEditorDidMount(editor)}
        theme={props.tools.theme}
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
    setLoading: () => dispatch({ type: SET_LOADING }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MonacoEditor);
