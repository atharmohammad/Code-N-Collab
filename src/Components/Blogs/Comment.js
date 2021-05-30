import { useState, useEffect, useRef } from "react";
import { Grid, Button, Tooltip, IconButton } from "@material-ui/core";
import Replies from "./Replies";
import ForumIcon from "@material-ui/icons/Forum";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import SaveIcon from "@material-ui/icons/Save";
import CancelIcon from "@material-ui/icons/Cancel";
import AddIcon from "@material-ui/icons/Add";
import ReactMarkdown from "react-markdown";


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
            <pre><ReactMarkdown>{initialComment}</ReactMarkdown></pre>
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
          zIndex:'2',
        }}
      >
        <Grid container direction="row" justify="flex-start">
          {editComment ? (
            <>
              <Tooltip title="save Blog" onClick={saveHandler}>
                <IconButton>
                  <SaveIcon />
                </IconButton>
              </Tooltip>
              <Tooltip
                title="cancel Changes"
                onClick={() => setEditComment(false)}
              >
                <IconButton>
                  <CancelIcon />
                </IconButton>
              </Tooltip>
            </>
          ) : null}
        </Grid>

        <Grid container direction="row" justify="flex-end">
          <Tooltip title="write comment">
            <IconButton>
              <AddIcon title="write comment" />
            </IconButton>
          </Tooltip>

          {editComment === false ? (
            <Tooltip title="edit Blog" onClick={() => setEditComment(true)}>
              <IconButton>
                <EditIcon style={{ cursor: "pointer" }} />
              </IconButton>
            </Tooltip>
          ) : null}

          <Tooltip
            title="toggle Reply"
            onClick={() => toggleReplyHandler(props.commentId)}
          >
            <IconButton>
              <ForumIcon style={{ cursor: "pointer" }} />
            </IconButton>
          </Tooltip>

          <Tooltip title="delete Comment" onClick={deleteHandler}>
            <IconButton>
              <DeleteIcon style={{ cursor: "pointer" }} />
            </IconButton>
          </Tooltip>
        </Grid>
      </Grid>
      <div>{showReply ? <Replies commentId={123} /> : null}</div>
    </div>
  );
};

export default Comment;
