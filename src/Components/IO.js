import React from "react";
import {
  Typography,
  CssBaseline,
  Box,
  Button,makeStyles,Grid
} from "@material-ui/core";

export default function App() {
  return (
    <Grid style={{display:'flex',minHeight:'40vh'}}>
      <Grid lg={6} style={{ backgroundColor: "#298f3f",height:'20vh' }} >INPUT</Grid>
      <Grid lg={6} style={{ backgroundColor: "#a31f23",height:'20vh' }} >OUTPUT</Grid>
    </Grid>
  );
}
