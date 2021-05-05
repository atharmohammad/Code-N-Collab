import React, {useEffect,useState} from 'react';
import { Convergence } from "@convergence/convergence";
import { CodeEditorConfig } from "./config";
import Editor from './Editor';
import { useLocation,useHistory } from "react-router-dom";

const Wrapper = (props)=>{
    const socket = props.socket;
    const location = useLocation();
    const [domain,setDomain] = useState(null);

    useEffect(()=>{

        const currentPath = location.pathname;
        const searchParams = new URLSearchParams(location.search);

        Convergence.connectAnonymously(
          CodeEditorConfig.CONVERGENCE_URL,
          searchParams.get("name").trim()
        ).then(dom=>{
          setDomain(dom);
        }).catch(e=>console.log(e));
    },[])

    useEffect(()=>{
      return()=>{
        if(domain){
          console.log("disposed")
          domain.dispose();
        }
      }
    },[domain]);

    return(
      <>
      {domain ? <Editor socket = {socket} domain={domain}/> : <p>Loading..!</p>}
      </>
    )
}

export default Wrapper
