import { useState, useEffect } from "react";
import {
  Grid,
  Box,
  Button,
  Typography,
  Avatar,
  Tooltip,
  IconButton,
} from "@material-ui/core";
import Reply from "./Reply";

const Replies = (props) => {
  const [replies, setReplies] = useState([
    { id: 1, replyData: "Reply1" },
    { id: 2, replyData: "Reply2" },
    { id: 3, replyData: "Reply3" },
    { id: 4, replyData: "Reply4" },
  ]);

  return (
    <div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end",
        }}
      >
        {replies.map((reply) => (
          <Reply replyData={reply.replyData}/>
        ))}
      </div>
      <div
        style={{
          margin: "auto",
          borderBottom: "10px solid grey",
          width: "10vw",
        }}
      ></div>
    </div>
  );
};

export default Replies;
