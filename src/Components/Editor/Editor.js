import React, { useEffect, useContext, useRef, useState } from "react";
import { connect } from "react-redux";
import { v4 as uuidV4 } from "uuid";
import socketIOClient from "socket.io-client";
import { useLocation, useHistory } from "react-router-dom";

import Editor from "@monaco-editor/react";
import { Convergence } from "@convergence/convergence";
import "@convergencelabs/monaco-collab-ext/css/monaco-collab-ext.min.css";

import { CodeEditorConfig } from "./config";
import { compilerFunc } from "../Functions/index";
import MonacoConvergenceAdapter from "./EditorAdaptor";
import Modal from "../Modal/Modal";

import blackBoardJSON from "./manaco-Themes/blackBoard";
import cobaltJSON from "./manaco-Themes/cobalt";
import merbivoreJSON from "./manaco-Themes/merbivore";
import githubJSON from "./manaco-Themes/github";
import useSound from "use-sound";
import roundStart from "../../Assets/sound-effects/RoundStart.mp3";

import {
  SET_LOADING,
  RESET_LOADING,
  SET_OUTPUT,
  SET_INPUT,
  SET_COMPILE_OFF,
  NOTIFY_OUTPUT_SUCCESS,
  NOTIFY_OUTPUT_ERROR,
  SET_SOME_ONE_SEND_IO,
} from "../../store/Action/action";

const ENDPOINT = "http://127.0.0.1:8080";

const MonacoEditor = (props) => {
  const MonacoEditorRef = useRef();
  const inputRef = useRef();
  const outputRef = useRef();
  const [code, setCode] = useState("");
  const [service, setService] = useState(null);
  const [codeValue, setCodeValue] = useState("");
  const [play] = useSound(roundStart);
  const location = useLocation();
  const history = useHistory();
  let socket;
  
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
      props.resetLoading();
    }
  }, [props.tools.nowCompile]);
  
  //socket and convergence
  useEffect(async () => {
    //get query string
    const currentPath = location.pathname;
    const searchParams = new URLSearchParams(location.search);

   socket = socketIOClient(ENDPOINT);

    socket.emit(
      "join",
      { room: searchParams.get("room"), username: searchParams.get("name") },
      ({ error, user }) => {
        if (error) {
          console.log("username is already taken");
          return history.push("/home?" + searchParams.get("room"));
        }

        console.log("joined");
      }
    );
    
    socket.on("initialCode", (data) => {
      console.log(data);
      setCodeValue(data);
    });

    socket.on("initialIO", ({ inputText, outputText }) => {
      console.log("initialIO",inputText, outputText);
      props.setInput(inputText);
      props.setOutput(outputText);
      props.recievedIO();
    });
    
    socket.on("sendInitialIO", ({ id }) => {
      console.log('asking for intialIO');
     
      const creator = () => {
        const inputText = inputRef.current.value
        const outputText = outputRef.current.value
        
        const data = {
          id,
          inputText,
          outputText,
        }
        console.log(inputRef.current.value);
        console.log(outputRef.current.value); 
        socket.emit('takeInitialIO',data);
      }
      creator();
    });

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

      const adapter = new MonacoConvergenceAdapter(
        MonacoEditorRef.current,
        model.elementAt("text")
      );
      adapter.bind();
    } catch (error) {
      console.error("Could not open model ", error);
    }
  }, []);
  
   
  useEffect(()=>{
    return ()=>{
      console.log("back button");
      socket.disconnect()
    }
  },[])
  
  return (
    <>
     <textarea hidden ref={inputRef} value={props.tools.input}/>
     <textarea hidden ref={outputRef} value={props.tools.output}/> 
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
    setOutput: (value) => dispatch({ type: SET_OUTPUT, value }),
    setInput: (value) => dispatch({ type: SET_INPUT, value }),
    setLoading: () => dispatch({ type: SET_LOADING }),
    resetLoading: () => dispatch({ type: RESET_LOADING }),
    resetCompile: () => dispatch({ type: SET_COMPILE_OFF }),
    recievedIO:() => dispatch({ type: SET_SOME_ONE_SEND_IO }),
    notify_output_on: () => dispatch({ type: NOTIFY_OUTPUT_SUCCESS }),
    notify_output_error_on: () => dispatch({ type: NOTIFY_OUTPUT_ERROR }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MonacoEditor);
