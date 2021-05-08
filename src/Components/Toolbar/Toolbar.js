import React from "react";
import LanguagePicker from "./BarItem/LanguagePicker";
import ThemePicker from "./BarItem/ThemePicker";
import CollaborateTools from "./BarItem/CollaborateTools";
import Compile from "./BarItem/Compile";
import GraphButton from "./BarItem/GraphButton";
import FontSize from "./BarItem/FontSize";
import RoomTitle from "../../Assets/images/roomTitle.png";
import classes from "./Toolbar.module.css";
import {
  Typography,
  CssBaseline,
  Box,
  Button,
  makeStyles,
  Grid,
} from "@material-ui/core";

export default function Toolbar(props) {
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
          <CollaborateTools />
        </Grid>
      </Grid>
    </Grid>
  );
}
