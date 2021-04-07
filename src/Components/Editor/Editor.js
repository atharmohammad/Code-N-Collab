import React, { useEffect, useContext, useRef,useState } from "react";
import Editor from "@monaco-editor/react";
import { Convergence } from "@convergence/convergence";
import { CONVERGENCE_URL } from "./config";
import MonacoConvergenceAdapter from "./EditorAdaptor";
import "@convergencelabs/monaco-collab-ext/css/monaco-collab-ext.min.css";


const MonacoEditor = () => {
  const MonacoEditorRef = useRef();
  const [code,setCode] = useState("");
  const handleEditorDidMount = (editor) => {
    MonacoEditorRef.current = editor;
  };

  useEffect(() => {
    Convergence.connectAnonymously(CONVERGENCE_URL, 'Athar')
      .then((domain) => {
        return domain.models().openAutoCreate({
          collection: "Code-n-Collab`",
          id: '2',
          ephemeral: false,
          data: { text: code },
        });
      })
      .then((model) => {
        console.log(MonacoEditorRef.current);
        const adapter = new MonacoConvergenceAdapter(MonacoEditorRef.current, model.elementAt("text"));
        adapter.bind();
      })
      .catch((error) => {
        console.error("Could not open model ", error);
      });
  }, []);

  useEffect(() => {
    MonacoEditorRef.current?.setValue("");
  }, []);

  try{
    console.log(MonacoEditorRef.StandaloneCodeEditor.getValue());
  }catch(e){
    console.log(e);
  }

  return (
    <div style={{ flexGrow: 1, overflow: "hidden" }}>
      <Editor
        ref={MonacoEditorRef}
        onMount={(editor) => handleEditorDidMount(editor)}
        theme='vs-dark'
        defaultValue=""
        language='javascript'
        onChange={(value) => setCode(value || "")}
        options={{ wordWrap: "on", autoIndent: "advanced" }}
      />
    </div>
  );
};

export default MonacoEditor;
