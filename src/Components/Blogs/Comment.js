import { useState, useEffect, useRef } from "react";
import { Grid, Button, Tooltip, IconButton } from "@material-ui/core";
import Replies from "./Replies";
import ReactMarkdown from "react-markdown";
import SaveCancel from "./SaveCancel";
import HelperIcons from "./HelperIcons";

const Comment = (props) => {
  const divRef = useRef();
  const [showReply, setShowReply] = useState(false);
  const [editComment, setEditComment] = useState(false);
  const [initialComment, setInitialComment] = useState(props.commentData);
  const [deleted, setDeleted] = useState(false);

  const saveHandler = () => {
    const data = divRef.current.value.trim();
    if (!data) {
      return alert("cant be empty");
    }
    setInitialComment(data);
    setEditComment(false);
  };

  const toggleReplyHandler = () => {
    setShowReply((prev) => !prev);
  };
  const deleteHandler = () => {
    setDeleted(true);
  };

  if (deleted) {
    return <></>;
  }
  return (
    <div
      style={{
        marginBottom: "20px",
        background: "grey",
        borderRadius: "10px",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          padding: "4px",
          background: "#fff",

          borderRadius: "10px",
        }}
      >
        <div style={{ display: "flex" }}>
          <div>User</div>
          <div style={{ paddingLeft: "20px" }}>2days ago</div>
        </div>
        {editComment === false ? (
          <div
            style={{
              background: "#fff",
              fontSize: "18px",
              padding: "15px",
              zIndex: "2",
            }}
          >
            <pre>
              <ReactMarkdown>{initialComment}</ReactMarkdown>
            </pre>
          </div>
        ) : (
          <div style={{ margin: "2px", zIndex: "2" }}>
            <textarea
              ref={divRef}
              style={{
                width: "100%",
                minHeight: "200px",
                resize: "vertical",
                fontSize: "18px",
                padding: "5px",
                boxSizing: "border-box",
              }}
            >
              {initialComment}
            </textarea>
          </div>
        )}
      </div>
      <Grid
        style={{
          display: "flex",
          marginTop: "0px",
          background: "#fff",
          borderRadius: "10px",
          zIndex: "2",
        }}
      >
        <Grid container direction="row" justify="flex-start">
          {editComment ? (
            <SaveCancel
              type="Comment"
              saveHandler={saveHandler}
              cancelHandler={() => setEditComment(false)}
            />
          ) : null}
        </Grid>

        <Grid container direction="row" justify="flex-end">
          <HelperIcons
            type="comment"
            showEditBtn={!editComment}
            editHandler={() => setEditComment(true)}
            toggleReplyHandler={toggleReplyHandler}
            deleteHandler={deleteHandler}
          />
        </Grid>
      </Grid>
      <div>{showReply ? <Replies commentId={123} /> : null}</div>
    </div>
  );
};

export default Comment;
