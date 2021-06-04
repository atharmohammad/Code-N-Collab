import { useState, useEffect } from "react";
import { Grid, Tooltip, IconButton } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import AddIcon from "@material-ui/icons/Add";
import ForumIcon from "@material-ui/icons/Forum";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import CommentIcon from "@material-ui/icons/Comment";


const HelperIcons = (props) => {
  const { type, showEditBtn, editHandler, deleteHandler, openWriter } = {
    ...props,
  }; //for all
  const { showCommentHandler } = { ...props }; //particular blogs
  const { toggleReplyHandler } = { ...props }; //comment
  const { allBlogPage } = { ...props }; //allblogPage blog

  let addIconTitle = "reply";
  let forumIcon = null;
  let blogIcons = null;

  if (props.type.toLowerCase() == "blog") {
    addIconTitle = "comment";
    blogIcons = (
      <>
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
    <>
      <Tooltip title="Like">
        <IconButton>
          <ThumbUpAltIcon style={{ cursor: "pointer" }} /> 120
        </IconButton>
      </Tooltip>
      {!allBlogPage ? (
        <>
          {blogIcons}
          <Tooltip title={`write ${addIconTitle}`} onClick={openWriter}>
            <IconButton>
              <AddIcon title={`write ${addIconTitle}`} style={{}} />
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
        </>
      ) : null}
      <Tooltip title={`delete ${type}`} onClick={deleteHandler}>
        <IconButton>
          <DeleteIcon style={{ cursor: "pointer" }} />
        </IconButton>
      </Tooltip>
    </>
  );
};

export default HelperIcons;
