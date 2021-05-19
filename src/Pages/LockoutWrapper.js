import { useEffect } from "react";
import socketio from "socket.io-client";
import LockoutPage from './LockoutPage' 

export default function LockoutWrapper(props) {
  const socket = socketio.connect("http://localhost:8080/");

  useEffect(() => {
    return () => {
      console.log("disconnect");
      socket.disconnect();
    };
  }, []);

  return <LockoutPage socket={socket} />;
}
