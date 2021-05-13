import React,{useState,useEffect} from "react";
import LanguagePicker from "./BarItem/LanguagePicker";
import ThemePicker from "./BarItem/ThemePicker";
import Leave from "./BarItem/Leave";
import Compile from "./BarItem/Compile";
import GraphButton from "./BarItem/GraphButton";
import FontSize from "./BarItem/FontSize";
import RoomTitle from "../../Assets/images/roomTitle.png";
import classes from "./Toolbar.module.css";
import {useLocation} from "react-router-dom";

import {
  Typography,
  CssBaseline,
  Box,
  Button,
  makeStyles,
  Grid,
} from "@material-ui/core";

export default function Toolbar(props) {
  const socket = props.socket;
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  return (
    <Grid className={classes.main}>
      <Grid className={classes.imgGrid}>
        <img src={RoomTitle} alt="code-n-collab" />
      </Grid>
      <Grid className={classes.toolWrap}>
        <Grid className={classes.toolsGrid}>
          <LanguagePicker />
          <ThemePicker />
          <FontSize />
        </Grid>
        <Grid className={classes.toolsGrid}>
          <Compile />
          <GraphButton />
          <Leave socket={socket}/>
        </Grid>
      </Grid>
    </Grid>
  );
}
