import React, { useEffect, useState, useRef } from "react";
import { Typography, Grid } from "@material-ui/core";
import { v4 as uuidv4 } from "uuid";
import ScrollToBottom from "react-scroll-to-bottom";
import Message from './Message';
import { useLocation } from "react-router-dom";


const Chat = (props) => {
  const socket = props.socket;
  const inputRef = useRef();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  
  const submitHandler = (e) => {
    console.log();
    e.preventDefault();
    const finalValue = inputRef.current.value.trim();
    if (finalValue) socket.emit("clientMsg", { message: finalValue });
    inputRef.current.value = "";
  };

  return (
    <Grid
      style={{
        display: "flex",
        flexFlow: "column",
        height: "75vh",
        width: "31vh",
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
      <Grid style={{ height: "61vh", display: "flex", flexFlow: "row" }}>
        <ScrollToBottom className="messages">
        <div style={{width:'30vh',overflowX: 'hidden'}}>  
        {props.messages.map((message, i) => <div key={i}><Message message={message} name={searchParams.get('name')}/></div>)}
        </div>
        </ScrollToBottom>
      </Grid>
      <form onSubmit={submitHandler} style={{ margin: "2px" }}>
        <input
          ref={inputRef}
          onChange={(e) => {}}
          type="text"
          placeholder="Send a Message!"
          style={{ height: "10vh", width: "95%" }}
        />
      </form>
    </Grid>
  );
};

export default Chat;
