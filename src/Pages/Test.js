import React, { useEffect, useState } from "react";
import Editor from "../Components/LockOut/Editor.js/Editor";
import Toolbar from "../Components/Toolbar/Toolbar"
import socketio from "socket.io-client";

const Test = () => {
  const socket = socketio.connect("http://localhost:8080/");
  useEffect(() => {
    return () => {
      console.log("socket dissconnect");
      socket.disconnect();
    };
  }, []);
  return (
    <>
      <Toolbar />
      <div>hello this is test page</div>
      <Editor socket={socket} />
    </>
  );
};

export default Test;
