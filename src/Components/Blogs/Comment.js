import { useState, useEffect, useRef } from "react";
import { Grid, Button, Tooltip, IconButton } from "@material-ui/core";
import Reply from "./Reply";
import ForumIcon from "@material-ui/icons/Forum";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import SaveIcon from "@material-ui/icons/Save";
import CancelIcon from "@material-ui/icons/Cancel";
import AddIcon from "@material-ui/icons/Add";

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
      style={{ marginBottom: "20px", background: "#fff", borderRadius: "10px" }}
    >
      <div style={{display:'flex',padding: "4px"}}>
        <div>User</div>
        <div style={{paddingLeft:'20px'}}>2days ago</div>
      </div>
      {editComment === false ? (
        <div
          style={{
            background: "#fff",
            fontSize: "18px",
            padding: "15px",
            borderRadius: "10px",
          }}
        >
          <pre>{initialComment}</pre>
        </div>
      ) : (
        <div style={{ margin: "2px" }}>
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
      <Grid style={{ display: "flex", marginTop: "-10px", background: "#fff" }}>
        <Grid container direction="row" justify="flex-start">
          {editComment ? (
            <>
              <Tooltip title="save Blog">
                <IconButton>
                  <SaveIcon onClick={saveHandler} />
                </IconButton>
              </Tooltip>
              <Tooltip title="cancel Changes">
                <IconButton>
                  <CancelIcon onClick={() => setEditComment(false)} />
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
            <Tooltip title="edit Blog">
              <IconButton>
                <EditIcon
                  onClick={() => setEditComment(true)}
                  style={{ cursor: "pointer" }}
                />
              </IconButton>
            </Tooltip>
          ) : null}

          <Tooltip title="edit Blog">
            <IconButton>
              <ForumIcon
                style={{ cursor: "pointer" }}
                onClick={() => toggleReplyHandler(props.commentId)}
              />
            </IconButton>
          </Tooltip>

          <Tooltip title="delete Blog">
            <IconButton>
              <DeleteIcon
                onClick={deleteHandler}
                style={{ cursor: "pointer" }}
              />
            </IconButton>
          </Tooltip>
        </Grid>
      </Grid>
      <div>{showReply ? <Reply commentId={123} /> : null}</div>
    </div>
  );
};

export default Comment;
