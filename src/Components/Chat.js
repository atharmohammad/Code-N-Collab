import React from "react";
import { Paper, Typography, Box, Grid } from "@material-ui/core";

const Chat = () => {
  return (
    <Grid
      style={{
        display: "flex",
        flexFlow: "column",
        minHeight: "80vh",
        width: "35vh",
        overflow: "hidden",
        backgroundColor: "#ededeb",
        border: "2px solid black",
      }}
    >
      <Typography
        style={{ fontSize: "15px", fontWeight: "bold", margin: "1vh 0 0 7vh" }}
      >
        CHAT
      </Typography>
      <Grid style={{ height: "71vh" }}></Grid>
      <input
        type="text"
        placeholder="Send a Message!"
        style={{ height: "10.3vh" }}
      />
    </Grid>
  );
};

export default Chat;
