import { useState, useEffect } from "react";
import { Grid, Box, Button, Typography, Avatar } from "@material-ui/core";

const Comments = (props) => {
  const [reply, setReply] = useState(["Reply1", "Reply2", "Reply3", "Reply4"]);

  return (
    <div>
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-end",
      }}
    >
      {reply.map((item) => (
        <div>
          <p
            style={{
              margin:'0px 10px 10px 5px',
              height: "50px",
              width: "70vw",
              background: "#fff",
              padding: "5px",
              borderRadius: "10px",
              boxShadow: "5px 5px 10px #888888",
            }}
          >
            {item}
          </p>
        </div>
      ))}
      
    </div>
    <div style={{margin: "auto",borderBottom: '10px solid grey',width:'10vw'}}>
      </div>
    </div>
  );
};

export default Comments;
