import React, { useEffect, useContext, useRef, useState } from "react";
import { MonacoBinding } from 'y-monaco'
import Editor from "@monaco-editor/react";
import * as Y from "yjs";
import { WebrtcProvider } from "y-webrtc";
import { useLocation } from "react-router-dom";
import Modal from "../Modal/Modal";
import Graph from "../Graph/Graph";
import { connect } from "react-redux";
import { SET_LOADING, SET_OUTPUT } from "../../store/Action/action";
import languageMapper from "../../Function/languageMapper";
import RandomColor from "randomcolor";
import blackBoardJSON from "../manaco-Themes/blackBoard";
import cobaltJSON from "../manaco-Themes/cobalt";
import merbivoreJSON from "../manaco-Themes/merbivore";
import githubJSON from "../manaco-Themes/github";
import "./Editor.css"

function EditorC(props) {
  const location = useLocation();
  const [EditorRef, setEditorRef] = useState(null);
  const [code, setCode] = useState("");

  const socket = props.socket;

  const handleEditorDidMount = (editor) => {
    setEditorRef(editor);
  };

  const handleEditorWillMount = (monaco) => {
      // here is the monaco instance
        // do something before editor is mounted
        monaco.editor.defineTheme("blackBoard", blackBoardJSON);
        monaco.editor.defineTheme("cobalt", cobaltJSON);
        monaco.editor.defineTheme("merbivore", merbivoreJSON);
        monaco.editor.defineTheme("github", githubJSON);

    };


  useEffect(async () => {
    if (props.tools.nowCompile === true && props.tools.isLoading === false) {
      props.setOutput("");
      props.setLoading();
      socket.emit("Compile_ON", {
        language: props.tools.language,
        code,
        input: props.tools.input,
        reason: "code-editor",
      });
    }
  }, [props.tools.nowCompile]);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);

    if (EditorRef) {
      const ydoc = new Y.Doc();

      let provider = null;
      try {
        provider = new WebrtcProvider(searchParams.get("room").trim(), ydoc, {
          signaling: [
            "wss://signaling.yjs.dev",
            process.env.REACT_APP_SIGNALLING_URL1,
            process.env.REACT_APP_SIGNALLING_URL2,
          ],
          password: location.state ? location.state.password : null
        });

        const yText = ydoc.getText("monaco");
        const yUndoManager = new Y.UndoManager(yText);

        const awareness = provider.awareness;
        const color = RandomColor();
        awareness.setLocalStateField("user", {
          name: searchParams.get("name").trim(),
          color: color,
        });
        const getBinding = new MonacoBinding(yText, EditorRef.getModel(),new Set([EditorRef]),awareness, {
          yUndoManager,
        });
      } catch (err) {
        alert("error in collaborating try refreshing or come back later !");
      }
      return () => {
        if (provider) {
          provider.disconnect();
          ydoc.destroy();
        }
      };
    }
  }, [EditorRef]);

  return (
    <>
      <Editor
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
}

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

export default connect(mapStateToProps, mapDispatchToProps)(EditorC);
