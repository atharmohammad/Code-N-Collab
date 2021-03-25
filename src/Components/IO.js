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
    <Grid style={{display:'flex',minHeight:'40vh',backgroundColor:'black'}}>
      <Grid lg={6} style={{ backgroundColor: "#fff",height:'20vh',border:'2px solid black',borderRadius:'5px' }} >
       <Typography variant="h4" style={{fontSize:'15px',fontWeight:'bold',display:'flex',justifyContent:'center'}}>INPUT</Typography>
        <textarea rows="5" cols="67" style={{border:'none',margin:'0.1vh 0 0 0.5vh'}}/>
       </Grid>
      <Grid lg={6} style={{ backgroundColor: "#fff",height:'20vh',border:'2px solid black',borderRadius:'5px'}} >
       <Typography variant="h4" style={{fontSize:'15px',fontWeight:'bold',
       display:'flex',justifyContent:'center'}}>OUTPUT</Typography>

      </Grid>
    </Grid>
  );
}
