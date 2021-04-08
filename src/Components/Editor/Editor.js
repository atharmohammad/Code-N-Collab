import React, { useEffect, useContext, useRef,useState } from "react";
import Editor from "@monaco-editor/react";
import { Convergence } from "@convergence/convergence";
import { CONVERGENCE_URL } from "./config";
import MonacoConvergenceAdapter from "./EditorAdaptor";
import "@convergencelabs/monaco-collab-ext/css/monaco-collab-ext.min.css";
import {Grid} from '@material-ui/core'
import {connect} from 'react-redux';

const MonacoEditor = (props) => {
  const MonacoEditorRef = useRef();
  const [code,setCode] = useState("");
  const handleEditorDidMount = (editor) => {
    MonacoEditorRef.current = editor;
  };

  useEffect(async() => {
     const credentials = { username: "testuser", password: "changeme" };
    try{
      const domain = await Convergence.connectAnonymously(CONVERGENCE_URL, 'Athar');
      const modelService = domain.models();

      const model = await modelService.openAutoCreate({
        collection: "Code-n-Collab`",
        id: '2',
        ephemeral: false,
        data: { text: code },
      });

      const adapter = new MonacoConvergenceAdapter(MonacoEditorRef.current, model.elementAt("text"));
      adapter.bind();
    }catch(error){
      console.error("Could not open model ", error);
    };
  }, []);

  // try{
  //   console.log(MonacoEditorRef.StandaloneCodeEditor.getValue());
  // }catch(e){
  //   console.log(e);
  // }

  return (
    <Grid style={{ flexGrow: 1, overflow: "hidden",fontSize:'30px' }}>
      <Editor
        ref={MonacoEditorRef}
        fontSize='40'
        onMount={(editor) => handleEditorDidMount(editor)}
        theme='vs-dark'
        defaultValue=""
        language={props.language}
        onChange={(value) => setCode(value || "")}
        options={{ wordWrap: "on", autoIndent: "advanced" }}
      />
    </Grid>
  );
};

const mapStateToProps = state=>{
  return{
    language:state.tools.language
  }
}

export default connect(mapStateToProps,null)(MonacoEditor);
