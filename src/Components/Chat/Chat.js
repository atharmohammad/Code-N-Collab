import React, { useEffect, useState, useRef } from "react";
import { Typography, Grid } from "@material-ui/core";
import { v4 as uuidv4 } from "uuid";
import ScrollToBottom from "react-scroll-to-bottom";
import Message from './Message';
import { useLocation } from "react-router-dom";
import classes from'./Message.module.css';

const Chat = (props) => {
  const socket = props.socket;
  const inputRef = useRef();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const submitHandler = (e) => {
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
        height: "74vh",
        width: '100%',
        overflow: "hidden",
        background:'#313332',
        border: "2px solid black",
        borderRadius:'10px',
        boxShadow: '0 5px 15px 0px rgba(0,0,0,0.6)',
      }}
    >
      <Typography
        style={{ fontSize: "15px", fontWeight: "bold", textAlign:'center',color:'#fff' }}
      >
        CHAT
      </Typography>
      <Grid style={{ height: "63.5vh", display: "flex", flexFlow: "row",background:'#313332',}}>

        <ScrollToBottom  className={classes.scroll_messages} >
        <div className={classes.messages}>
        {props.messages.map((message, i) => <div key={i}><Message message={message} name={searchParams.get('name')}/></div>)}
        </div>
        </ScrollToBottom>
      </Grid>
      <form onSubmit={submitHandler} style={{ padding: "0 2px 1px 2px",
      background:'#313332'}}>
        <input
          ref={inputRef}
          onChange={(e) => {}}
          type="text"
          placeholder="Send a Message!"
          className={classes.input}
        />
      </form>
    </Grid>
  );
};

export default Chat;
