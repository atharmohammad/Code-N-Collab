import React, {useEffect} from 'react';
import socketio from "socket.io-client";
import CollabPage from './CollabPage'

const CollabPageWrapper = ()=>{
    const socket = socketio.connect("http://127.0.0.1:8080");
    useEffect(()=>{
        return () => {
            console.log("socket dissconnect");
            socket.disconnect();
          };
    },[])
    return <CollabPage socket = {socket}/>
}

export default CollabPageWrapper