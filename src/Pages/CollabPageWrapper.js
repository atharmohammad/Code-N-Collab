import React, {useEffect,useState} from 'react';
import socketio from "socket.io-client";
import CollabPage from './CollabPage'
import { Convergence } from "@convergence/convergence";
import { CodeEditorConfig } from "../Components/Editor/config";
import { useLocation,useHistory } from "react-router-dom";

const CollabPageWrapper = ()=>{
    const socket = socketio.connect("http://localhost:8080/");
    // const location = useLocation();
    // const [domain,setDomain] = useState(null);


    useEffect(()=>{

        // const currentPath = location.pathname;
        // const searchParams = new URLSearchParams(location.search);
        //
        // Convergence.connectAnonymously(
        //   CodeEditorConfig.CONVERGENCE_URL,
        //   searchParams.get("name").trim()
        // ).then(dom=>{
        //   setDomain(dom);
        // })

      return () => {
          console.log("socket dissconnect");
          socket.disconnect();
        };
    },[])

    // useEffect(()=>{
    //   return()=>{
    //     if(domain){
    //       console.log("disposed")
    //       domain.dispose();
    //     }
    //   }
    // },[domain]);

    return(
        <CollabPage socket = {socket} />
    )
}

export default CollabPageWrapper
