import React, { useEffect, useState } from "react";
import socketio from "socket.io-client";
import CollabPage from "./CollabPage";

const CollabPageWrapper = () => {
  const socket = socketio.connect("http://localhost:8080/");
  useEffect(() => {

    return () => {
      console.log("socket disconnect");
      socket.disconnect();
    };
  }, []);
  return <CollabPage socket={socket} />;
};

export default CollabPageWrapper;
