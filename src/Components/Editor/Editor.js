import React, { useEffect, useContext, useRef, useState } from "react";
import { CodemirrorBinding } from 'y-codemirror';
import { UnControlled as CodeMirrorEditor } from "react-codemirror2";
import * as Y from "yjs";
import { WebrtcProvider } from "y-webrtc";
import { useLocation } from "react-router-dom";
import Modal from "../Modal/Modal";
import Graph from "../Graph/Graph";
import { connect } from "react-redux";
import { SET_LOADING, SET_OUTPUT } from "../../store/Action/action";
import languageMapper from "../../Function/languageMapper";

import RandomColor from "randomcolor";
import "./EditorAddons";

function Editor(props) {
  const location = useLocation();
  const [EditorRef, setEditorRef] = useState(null);
  const [code, setCode] = useState("");

  const socket = props.socket;

  const handleEditorDidMount = (editor) => {
    setEditorRef(editor);
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

      let provider;
      try {
        provider = new WebrtcProvider(searchParams.get("room").trim(), ydoc, {
          signaling: [
            "wss://signaling.yjs.dev",
            process.env.REACT_APP_SIGNALLING_URL1,
            process.env.REACT_APP_SIGNALLING_URL2,
          ],
        });
      } catch (err) {
        console.log("error in collaborating try again");
      }

      const yText = ydoc.getText("codemirror");
      const yUndoManager = new Y.UndoManager(yText);

      const awareness = provider?.awareness;
      const color = RandomColor();
      awareness?.setLocalStateField("user", {
        name: searchParams.get("name").trim(),
        color: color,
      });
      const getBinding = new CodemirrorBinding(yText, EditorRef, awareness, {
        yUndoManager,
      });

      return () => {
        if (provider) {
          provider.disconnect();
        }
      };
    }
  }, [EditorRef]);

  return (
    <div
      style={{
        display: "flex",
        height: "100%",
        width: "100%",
        fontSize: `${props.tools.fontSize}px`,
        overflowY: "auto",
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
          handleEditorDidMount(editor);
          editor.setSize("100vw", "100%");
        }}
      />
      {props.tools.isLoading === true ? <Modal /> : null}
      {props.tools.showGraph === true ? <Graph /> : null}
    </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Editor);
