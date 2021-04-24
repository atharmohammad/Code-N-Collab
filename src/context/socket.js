import React from "react";
import socketio from "socket.io-client";

export let socket = socketio.connect("http://127.0.0.1:8080");
export let SocketContext = React.createContext()
