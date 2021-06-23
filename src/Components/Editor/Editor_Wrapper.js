import React, { useEffect, useState } from "react";
import Editor from "./Editor"
import Spinner from "../Spinner/EditorSpinner/EditorSpinner";
import * as Y from "yjs";
import { WebrtcProvider } from "y-webrtc";
//Wrapper for connecting editor to Yjs WebrtcProvider

const Wrapper = (props) => {
  const socket = props.socket;
  let provider = null;
  const [ydoc,setYdoc] = useState(null);

  useEffect(()=>{
    const newYdoc = new Y.Doc();
    setYdoc(newYdoc);

    try {
      provider = new WebrtcProvider("asddasdfadgadsvadfas", ydoc, {
        signaling: [
          "wss://signaling.yjs.dev",
          "wss://y-webrtc-signaling-eu.herokuapp.com",
          "wss://y-webrtc-signaling-us.herokuapp.com",
        ],
      });
    } catch (err) {
      console.log("error in collaborating try again")
    }
  },[])

  useEffect(() => {
    return () => {
      if (provider) {
        provider.disconnect()
      }
    };
  }, [provider]);

  return (
    <>
        <Editor socket={socket} provider={provider} ydoc={ydoc}/>
   </>
  );
};

export default Wrapper;
