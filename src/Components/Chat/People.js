import React, { useEffect, useState, useRef } from "react";
import { Typography, Grid } from "@material-ui/core";
import ScrollToBottom from "react-scroll-to-bottom";
import Message from "./Message";
import { useLocation } from "react-router-dom";
import classes from "./Message.module.css";
import { Avatar } from "@material-ui/core";

const People = (props) => {
  console.log(props.persons);

  return (
    <Grid
      style={{
        display: "flex",
        flexFlow: "column",
        height: "75.5vh",
        width: "100%",
        overflow: "hidden",
        background:'#313332',
        border: "2px solid black",
        borderRadius: "10px",
        boxShadow: '0 5px 15px 0px rgba(0,0,0,0.6)',
      }}
    >
      <Typography
        style={{
          fontSize: "15px",
          fontWeight: "bold",
          textAlign: "center",
          color: "#fff",

        }}
      >
        People
      </Typography>
      <Grid style={{ height: "70vh", display: "flex", flexFlow: "row",background:'#313332', }}>
        <ScrollToBottom>
          <div style={{ width: "100%", overflowX: "hidden",background:'#313332', }}>
            {props.persons.map((person, i) => {
              return (
                <div
                  className={`${classes.messageContainer} ${classes.justifyStart}`}
                >
                  <div
                    className={`${classes.messageBox} ${classes.backgroundUser}`}
                  >
                    <Avatar style={{ margin: "1.2vh 1vh 0 0" }}>
                      {person.username[0]}
                    </Avatar>
                    <p
                      className={`${classes.messageText} ${classes.colorLight}`}
                    >
                      {person.username}
                    </p>
                  </div>
                  {props.you == person.id ? (
                    <div className={classes.you}>you</div>
                  ) : (
                    <div className={classes.online} />
                  )}
                </div>
              );
            })}
          </div>
        </ScrollToBottom>
      </Grid>
    </Grid>
  );
};

export default People;
