import React,{useState,useEffect,useRef} from "react";
import ScrollToBottom from "react-scroll-to-bottom";
import './Problem.css';
import Spinner from '../Spinner/ProblemSpinner';

import {
  Typography,
  CssBaseline,
  Box,
  Button,
  makeStyles,
  Grid,
} from "@material-ui/core";
import styles from "./Problem.module.css";
import stars from '../../Assets/css/style.module.css'


export default function App(props) {
  const socket = props.socket;
  const [link,setLink] = useState(null);
  const [problem,setProblem] = useState(null);
  const[loader,setLoader] = useState(false);
  const ProblemRef = useRef();

  useEffect(()=>{
    socket.on('problem',problem=>{
      ProblemRef.current.innerHTML = problem;
      setLoader(false);
      console.log(problem)
    })
  },[])

  const changeHandler = (e)=>{
    setLink(e.target.value);
  }

  const problemFetchHandler = ()=>{
    if(link.trim().length > 5){
      setLoader(true);
      socket.emit('codeforces-problem',link);
      setLink("");
      ProblemRef.current.innerHTML = "";
    }
  }

  return (
    <>
    <div className={stars.stars}></div>

      <Grid
        style={{
          minHeight: "90vh",
          maxWidth: "120vh",
          display: "flex",
          flexFlow: "column",
          padding: "1vh",
          border: "2px solid black",
          backgroundColor: "#2b2b2a",
        }}
      >
      <div style={{backgroundColor:'#3F51B5',paddingLeft:'2vh'
      ,borderRadius:'5px',fontSize:'20px',
    textAlign:'center'}}>
        <p  style={{ fontSize: "18px",color:"#fff"}}>
          Problems
        </p>
      </div>
      <Grid style={{ display: "flex", minHeight: "4vh",
      margin: "1vh 0 0 0",flexDirection:'row',maxWidth:'110vh' }}>
          <input placeholder="Problem Link" style={{ width: "110vh"
          ,margin:'2vh 0 0 0',
          borderRadius:'10px',
        outline:'none',
      border:'2px solid blue'}}
          onChange={changeHandler} value={link}/>
          <div
          style={{
            minHeight: "4vh",
            backgroundColor: "#872e2e",
            color: "#fff",
            maxWidth: "8vh",
            borderRadius: "5px",
            margin: "2.5vh 0 0 1vh",
            padding:'1vh 1vh 0 1vh',
            cursor: "pointer",
            textAlign:'center'
          }}
          onClick={problemFetchHandler}>
          Fetch
          </div>
        </Grid>
        {loader ? <Spinner/> : null}
        <ScrollToBottom>
        <Grid style={{color:'black'}} ref={ProblemRef}>
        </Grid>
        </ScrollToBottom>
      </Grid>
    </>
  );
}
