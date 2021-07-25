import React,{useState} from "react";
import { Grid } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import LanguagePicker from "./BarItem/LanguagePicker";
import ThemePicker from "./BarItem/ThemePicker";
import Leave from "./BarItem/Leave";
import Compile from "./BarItem/Compile";
import GraphButton from "./BarItem/GraphButton";
import FontSize from "./BarItem/FontSize";
import HomePageImg from "../../Assets/images/HomePageImg.png";
import classes from "./Toolbar.module.css";

export default function Toolbar(props) {
  const socket = props.socket;
  const history = useHistory();

  const chooseFileHandler = async(event)=>{
    const reader = new FileReader()
    reader.onload = async (event) => { 
      const text = (event.target.result)
      console.log(text)
    };
    reader.readAsText(event.target.files[0])
  }


  return (
    <Grid className={classes.main}>
      <Grid className={classes.imgGrid} title='Go to Home Page' onClick={() => history.push("/homepage")}>
        <img
          src={HomePageImg}
          
          alt="Code-N-Collab"
          style={{ width: "100%",minHeight:'32px'}}
        />
      </Grid>
      <Grid className={classes.toolWrap}>
        <Grid className={classes.toolsGrid}>
          <LanguagePicker />
          <ThemePicker />
          <FontSize />
          <input type="file" onChange={chooseFileHandler} />
        </Grid>
        <Grid className={classes.toolsGrid}>
          <Compile />
          <GraphButton />
          <Leave socket={socket} />
        </Grid>
      </Grid>
    </Grid>
  );
}
