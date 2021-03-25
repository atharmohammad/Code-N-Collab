import React from "react";
import TextareaAutosize from '@material-ui/core/TextareaAutosize';

import {
  Typography,
  CssBaseline,
  Box,
  Button,makeStyles,Grid
} from "@material-ui/core";

export default function App() {
  return (
    <Grid style={{display:'flex',minHeight:'28vh',backgroundColor:'black'}}>
      <Grid lg={6} style={{ backgroundColor: "#fff",height:'15vh',border:'2px solid black',borderRadius:'5px' }} >
      <textarea placeholder="Input" rows="3" cols="48" style={{border:'none',resize:'none',overflowY:'scroll'
      ,fontSize:'18px',padding:'1vh'}}/>
       </Grid>
      <Grid lg={6} style={{ backgroundColor: "#fff",height:'15vh',border:'2px solid black',borderRadius:'5px'}} >
      <textarea placeholder="Output" rows="3" cols="48" style={{border:'none',resize:'none',overflowY:'scroll'
      ,fontSize:'18px',padding:'1vh'}}/>
      </Grid>
    </Grid>
  );
}
