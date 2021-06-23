import React, { useEffect, useRef, useState } from "react";
import Editor from "@monaco-editor/react";
import { connect } from "react-redux";
import { UnControlled as CodeMirrorEditor } from "react-codemirror2";

import { SET_LOADING, SET_OUTPUT } from "../../../store/Action/action";
import Modal from "../../Modal/Modal";
import Graph from "../../Graph/Graph";
import languageMapper from "../../../Function/languageMapper";
import "../../Editor/EditorAddons";
import ContestEndedModal from '../../Modal/ContestEndedModal'

const MonacoEditor = (props) => {
  const socket = props.socket;
  const [code, setCode] = useState("");

  //compiling the code

  useEffect(async () => {
    if (props.tools.nowCompile === true && props.tools.isLoading === false) {
      props.setOutput("");
      props.setLoading();
      socket.emit("Compile_ON", {
        language: props.tools.language,
        code,
        input: props.tools.input,
        reason: "lockout",
      });
    }
  }, [props.tools.nowCompile]);

  return (
    <div
      style={{
        display: "flex",
        height: "100%",
        width: "100%",
        fontSize: `${props.tools.fontSize}px`,
        overflow: "auto",
      }}
    >
      <CodeMirrorEditor
        onChange={(editor, data, value) => {
          setCode(value);
        }}
        autoScroll
        options={{
          mode: languageMapper(props.tools.language),
          theme: props.tools.theme,
          lineWrapping: true,
          smartIndent: true,
          lineNumbers: true,
          foldGutter: true,
          tabSize: 2,
          gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"],
          autoCloseTags: true,
          matchBrackets: true,
          autoCloseBrackets: true,
          extraKeys: {
            "Ctrl-Space": "autocomplete",
          },
        }}
        editorDidMount={(editor) => {
          editor.setSize("100vw", "100%");
        }}
      />
      {props.tools.isLoading === true ? <Modal /> : null}
      {props.tools.showGraph === true ? <Graph /> : null}
      {props.contest.showContestEndedModal == true ? (
        <ContestEndedModal />
      ) : null}
    </div>
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
