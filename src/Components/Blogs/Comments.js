import { useState, useEffect } from "react";
import { Grid, Box, Button, Typography, Avatar } from "@material-ui/core";
import Comment from "./Comment";

const c = [
  "comment1",
  "comment2",
  "comment3",
  "comment4",
  "comment5",
  "comment6",
  "comment7",
  "comment8",
  "comment9",
  "comment10",
  "comment11",
  "comment12",
  "comment13",
  "comment14",
  "comment15",
  "comment16",
  "comment17",
  "comment18",
];

const Comments = (props) => {
  const [comments, setComments] = useState([]);

  const onClickHandler = () => {
    let counter = 0;
    let temp = [];
    let commentLen = comments.length;
    while (counter < 5 && commentLen < c.length) {
      temp.push(c[commentLen++]);
      counter++;
    }
    setComments((x) => [...x, ...temp]);
  };

  return (
    <div
      style={{
        margin: "30px 10px 30px 10px",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div>
      {comments.map((item, i) => (
        <Comment commentId={123} commentData={"comment "+ i} />
      ))}
      </div>
      {c.length !== comments.length ? (
        <div style={{ alignSelf: "flex-end" }}>
          <Button
            onClick={onClickHandler}
            style={{
              background: "#49cc13c9",
              width: "100px",
              boxShadow: "5px 5px 5px #888888",
            }}
          >
            More...
          </Button>
        </div>
      ) : null}
    </div>
  );
};

export default Comments;
