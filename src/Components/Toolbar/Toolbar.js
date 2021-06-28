import React from "react";
import { Grid } from "@material-ui/core";

import LanguagePicker from "./BarItem/LanguagePicker";
import ThemePicker from "./BarItem/ThemePicker";
import Leave from "./BarItem/Leave";
import Compile from "./BarItem/Compile";
import GraphButton from "./BarItem/GraphButton";
import FontSize from "./BarItem/FontSize";
import HomePageImg from "../HomePageImage/HomePageImg";
import classes from "./Toolbar.module.css";

export default function Toolbar(props) {
  const socket = props.socket;

  return (
    <Grid className={classes.main}>
      <Grid className={classes.imgGrid}>
        <HomePageImg
          styleImg={{ width: "40vw", maxWidth: "210px", maxHeight: "38px" }}
        />
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
          <Leave socket={socket} />
        </Grid>
      </Grid>
    </Grid>
  );
}
