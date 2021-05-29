import { useState, useEffect } from "react";
import { Grid, Box, Button, Typography, Avatar } from "@material-ui/core";

const c = ["Reply1", "Reply2", "Reply3", "Reply4", "Reply5", "Reply6"];

const Comments = (props) => {
  const [reply, setReply] = useState([]);
  const [showReply, setShowReply] = useState(false);

  const onClickHandler = () => {
    setShowReply(true);
    setReply(() => [...c]);
  };

  return showReply === true ? (
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
              marginY: "10px",
              height: "50px",
              width: "80vw",
              background: "#ff6a00",
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
  ) : (
    <Button
      onClick={onClickHandler}
      style={{
        alignSelf: "flex-end",
        background: "#24cebe",
        margin: "10px 0px 10px 0px",
        boxShadow: "5px 5px 5px #888888",
      }}
    >
      Load Replies...
    </Button>
  );
};

export default Comments;
