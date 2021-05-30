import { useState, useEffect, useRef } from "react";
import {
  Grid,
  Box,
  Button,
  Typography,
  Avatar,
  Tooltip,
  IconButton,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import SaveIcon from "@material-ui/icons/Save";
import CancelIcon from "@material-ui/icons/Cancel";
import AddIcon from "@material-ui/icons/Add";
import ReactMarkdown from "react-markdown";


const Reply = (props) => {
  const [editReply, setEditReply] = useState(false);
  const [initialReply, setInitialReply] = useState(props.replyData);
  const [deleted, setDeleted] = useState(false);
  const divRef = useRef();

  const deleteHandler = () => {
    setDeleted(true);
  };

  const saveHandler = () => {
    const data = divRef.current.value.trim();

    if (!data) {
      return alert("cant be empty");
    }
    setInitialReply(data);
    setEditReply(false);
  };

  if (deleted) {
    return <></>;
  }

  return (
    <div
      style={{
        width: "60vw",
        margin: "15px 0px 10px 0px",
        background: "#fff",
        borderRadius: "30px",
        padding: "10px",
        zIndex:'2',
      }}
    >
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div style={{ display: "flex", background: "#fff" }}>
          <div>User</div>
          <div style={{ paddingLeft: "20px" }}>3days ago</div>
        </div>
        {editReply === false ? (
          <div
            style={{
              background: "#fff",
              fontSize: "18px",
              padding: "15px",
            }}
          >
            <pre><ReactMarkdown>{initialReply}</ReactMarkdown></pre>
          </div>
        ) : (
          <div style={{ margin: "2px" }}>
            <textarea
              ref={divRef}
              style={{
                width: "100%",
                minHeight: "150px",
                resize: "vertical",
                fontSize: "18px",
                padding: "5px",
                boxSizing: "border-box",
              }}
            >
              {initialReply}
            </textarea>
          </div>
        )}
        <Grid style={{ display: "flex", marginTop: "0px", background: "#fff" }}>
          <Grid container direction="row" justify="flex-start">
            {editReply ? (
              <>
                <Tooltip title="save Reply" onClick={saveHandler}>
                  <IconButton>
                    <SaveIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip
                  title="cancel Changes"
                  onClick={() => setEditReply(false)}
                >
                  <IconButton>
                    <CancelIcon />
                  </IconButton>
                </Tooltip>
              </>
            ) : null}
          </Grid>

          <Grid container direction="row" justify="flex-end">
            <Tooltip title="write reply">
              <IconButton>
                <AddIcon title="write comment" />
              </IconButton>
            </Tooltip>

            {editReply === false ? (
              <Tooltip title="edit Reply" onClick={() => setEditReply(true)}>
                <IconButton>
                  <EditIcon style={{ cursor: "pointer" }} />
                </IconButton>
              </Tooltip>
            ) : null}

            <Tooltip title="delete Reply" onClick={deleteHandler}>
              <IconButton>
                <DeleteIcon style={{ cursor: "pointer" }} />
              </IconButton>
            </Tooltip>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default Reply;
