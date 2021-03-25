import React from "react";
import { Paper, Typography, Box, Grid } from "@material-ui/core";

const Chat = () => {
  return (
    <Grid style={{display:'flex',flexFlow:'column',minHeight:'80vh',width:'35vh',
    overflow:'hidden',backgroundColor:'#f7f7f7',border:'2px solid black',borderRadius:'5px'}}>
         <Typography style={{fontSize:'15px',fontWeight:'bold',margin:'1vh 0 0 7vh'}}>CHAT</Typography>
         <Grid style={{height:'71vh'}}></Grid>
         <input type='text' placeholder="Send a Message!" style={{height:'10.3vh'}}/>
      </Grid>
  );
};

export default Chat;
