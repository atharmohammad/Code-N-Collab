import React from "react";
import { Paper, Typography, Box, Grid } from "@material-ui/core";

const Chat = () => {
  return (
    <Grid style={{display:'flex',flexFlow:'column',minHeight:'80vh',width:'30vh',overflow:'hidden'}}>
        <Box textAlign='center' style = {{height:'10vh', background:'lime'}} >CHAT</Box>

        <Box textAlign='center' style = {{height:'70vh' ,background:'cyan'}} >CONTENT...</Box>

        <Box textAlign='center' style = {{height:'10vh', background:'yellow'}} >TYPING</Box>
      </Grid>
  );
};

export default Chat;
