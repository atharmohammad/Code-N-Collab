import { useEffect } from "react";
import socketio from "socket.io-client";
import Contest from "../Components/Lockout/Contest";

export default function LockoutWrapper(props) {
  const socket = socketio.connect("http://localhost:8080/");

  useEffect(() => {
    return () => {
      console.log("disconnect");
    };
  }, []);

  return <Contest socket={socket} />;
}
