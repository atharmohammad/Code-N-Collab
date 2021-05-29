import { useState, useEffect, useRef } from "react";
import {
  Grid,
  Box,
  Button,
  Icon,
  Tooltip,
  IconButton,
} from "@material-ui/core";

import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import CommentIcon from "@material-ui/icons/Comment";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import SaveIcon from "@material-ui/icons/Save";
import CancelIcon from "@material-ui/icons/Cancel";
import AddIcon from "@material-ui/icons/Add";


import { connect } from "react-redux";
import * as TYPES from "../../store/Action/action";

const CurrentBlog = (props) => {
  const titleRef = useRef();
  const bodyRef = useRef();
  const [deleted, setDeleted] = useState(false);
  const [editBlog, setEditBlog] = useState(false);

  const [initialBlog, setInitialBlog] = useState({
    title: "LOREM",
    body: `What is Lorem Ipsum? Lorem Ipsum is simply dummy text of the printing
  and typesetting industry. Lorem Ipsum has been the industry's standard
  dummy text ever since the 1500s, when an unknown printer took a galley
  of type and scrambled it to make a type specimen book. It has survived
  not only five centuries, but also the leap into electronic typesetting,
  remaining essentially unchanged. It was popularised in the 1960s with
  the release of Letraset sheets containing Lorem Ipsum passages, and more
  recently with desktop publishing software like Aldus PageMaker including
  versions of Lorem Ipsum`,
  });

  const saveHandler = () => {
    const title = titleRef.current.value.trim();
    const body = bodyRef.current.value.trim();

    if (!title) {
      return alert("title cant be empty");
    }

    if (!body) {
      return alert("cant be empty");
    }
    setInitialBlog({ title, body });
    setEditBlog(false);
  };

  if (deleted) {
    return <></>;
  }

  return (
    <div
      style={{
        alignItems: "center",
        padding: "10px",
        margin: "10px 0px 10px 0px",
        display: "flex",
        flexDirection: "column",
        borderRadius: "20px",
        border: "",
        boxShadow: "5px 5px 10px #888888",
      }}
    >
      {editBlog === false ? (
        <>
          <h1>{initialBlog.title}</h1>
          <div>{initialBlog.body}</div>
        </>
      ) : (
        <>
          <textarea
            ref={titleRef}
            style={{
              width: "100%",
              margin:'2px',
              minHeight: "50px",
              resize: "vertical",
              fontSize: "30px",
              padding: "5px",
              borderRadius:'10px',
              boxSizing: "border-box",
            }}
          >
            {initialBlog.title}
          </textarea>
          <textarea
            ref={bodyRef}
            style={{
              borderRadius:'10px',
              width: "100%",
              margin:'2px',
              minHeight: "200px",
              resize: "vertical",
              fontSize: "18px",
              padding: "5px",
              boxSizing: "border-box",
            }}
          >
            {initialBlog.body}
          </textarea>
        </>
      )}
      <div>
        <Grid
          container
          direction="row"
          justify="space-between"
          style={{ marginTop: "3vh", width: "30vw" }}
        >
          {editBlog === true ? (
            <Grid
              container
              direction="row"
              justify="flex-start"
            >
              <>
                <Tooltip title="save Blog" onClick={saveHandler}>
                  <IconButton>
                    <SaveIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip
                  title="cancel Changes"
                  onClick={() => setEditBlog(false)}
                >
                  <IconButton>
                    <CancelIcon />
                  </IconButton>
                </Tooltip>
              </>
            </Grid>
          ) :null}

          <Tooltip title="Like/ Dislike">
            <IconButton>
              <ThumbUpAltIcon style={{ cursor: "pointer" }} />
            </IconButton>
          </Tooltip>
          <Tooltip title="View Comment" onClick={props.showComment}>
            <IconButton>
              <CommentIcon style={{ cursor: "pointer" }} />
            </IconButton>
          </Tooltip>
          <Tooltip title="write comment">
            <IconButton>
              <AddIcon title="write comment" />
            </IconButton>
          </Tooltip>
          {editBlog === false ? (
            <Tooltip title="edit Reply" onClick={() => setEditBlog(true)}>
              <IconButton>
                <EditIcon style={{ cursor: "pointer" }} />
              </IconButton>
            </Tooltip>
          ) : null}
          <Tooltip title="delete Blog" onClick={() => setDeleted(true)}>
            <IconButton>
              <DeleteIcon style={{ cursor: "pointer" }} />
            </IconButton>
          </Tooltip>
        </Grid>
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    blogPosted: () => {
      dispatch({ type: TYPES.BLOGPOSTED });
    },
    showComment: () => {
      dispatch({ type: TYPES.SHOW_COMMENTS });
    },
  };
};

export default connect(null, mapDispatchToProps)(CurrentBlog);
