import React from "react";
import { Paper, Typography, Box, Grid } from "@material-ui/core";

const Chat = () => {
  return (
    <>
      <Box textAlign='center' style = {{width:'100%', height:'10%', background:'lime'}} >CHAT</Box>
      
      <Box textAlign='center' style = {{width:'100%',height:'80%' ,background:'cyan'}} >CONTENT...</Box>
      
      <Box textAlign='center' style = {{width:'100%',height:'10%', background:'yellow'}} >TYPING</Box>
      
    </>
  );
};

export default Chat;
