import { useState, useEffect } from "react";
import { Grid, Tooltip, IconButton } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import AddIcon from "@material-ui/icons/Add";
import ForumIcon from "@material-ui/icons/Forum";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import CommentIcon from "@material-ui/icons/Comment";

const HelperIcons = (props) => {
  const { type, style, showEditBtn, editHandler, deleteHandler } = { ...props }; //for all
  const { showCommentHandler } = { ...props }; //blogs
  const { toggleReplyHandler } = { ...props }; //comment

  let addIconTitle = "reply";
  let forumIcon = null;
  let blogIcons = null;

  if (props.type.toLowerCase() == "blog") {
    addIconTitle = "comment";
    blogIcons = (
      <>
        <Tooltip title="Like/ Dislike">
          <IconButton>
            <ThumbUpAltIcon style={{ cursor: "pointer" }} />
          </IconButton>
        </Tooltip>
        <Tooltip title="View Comment" onClick={showCommentHandler}>
          <IconButton>
            <CommentIcon style={{ cursor: "pointer" }} />
          </IconButton>
        </Tooltip>
      </>
    );
  } else if (props.type.toLowerCase() == "comment") {
    forumIcon = (
      <Tooltip title="toggle Reply" onClick={toggleReplyHandler}>
        <IconButton>
          <ForumIcon style={{ cursor: "pointer" }} />
        </IconButton>
      </Tooltip>
    );
  }

  return (
    <div style={style}>
      {blogIcons}
      <Tooltip title={`write ${addIconTitle}`}>
        <IconButton>
          <AddIcon title={`write ${addIconTitle}`} />
        </IconButton>
      </Tooltip>

      {showEditBtn ? (
        <Tooltip title={`edit ${type}`} onClick={editHandler}>
          <IconButton>
            <EditIcon style={{ cursor: "pointer" }} />
          </IconButton>
        </Tooltip>
      ) : null}

      {forumIcon}

      <Tooltip title={`delete ${type}`} onClick={deleteHandler}>
        <IconButton>
          <DeleteIcon style={{ cursor: "pointer" }} />
        </IconButton>
      </Tooltip>
    </div>
  );
};

export default HelperIcons;
