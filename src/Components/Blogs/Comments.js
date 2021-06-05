import { useState, useEffect } from "react";
import { Grid, Box, Button, Typography, Avatar } from "@material-ui/core";
import Comment from "./Comment";

const Comments = (props) => {

  return (
    <div
      style={{
        margin: "30px 10px 30px 10px",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div>
      {props.comments.map((item, key) => (
        <Comment comment={item} key={key} deleteHandler = {() => props.deleteHandler(item._id)}/>
      ))}
      </div>
    </div>
  );
};

export default Comments;
