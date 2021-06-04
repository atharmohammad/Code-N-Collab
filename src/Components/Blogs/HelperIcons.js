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
        <Tooltip
          title="View Comment"
          style={{ width: "60px" }}
          onClick={showCommentHandler}
        >
          <IconButton>
            <CommentIcon style={{ cursor: "pointer" }} />
            <p style={{ height: "10px", marginLeft: "5px", fontSize: "15px" }}>
              93
            </p>
          </IconButton>
        </Tooltip>
      </>
    );
  } else if (props.type.toLowerCase() == "comment") {
    forumIcon = (
      <Tooltip
        title="toggle Reply"
        style={{ width: "60px" }}
        onClick={toggleReplyHandler}
      >
        <IconButton>
          <ForumIcon style={{ cursor: "pointer" }} />
        </IconButton>
      </Tooltip>
    );
  }

  return (
    <>
      <Tooltip title="Like" style={{ width: "60px", marginRight: "10px" }}>
        <IconButton>
          <ThumbUpAltIcon style={{ cursor: "pointer" }} />{" "}
          <p style={{ height: "10px", marginLeft: "5px", fontSize: "15px" }}>
            120
          </p>
        </IconButton>
      </Tooltip>

      {blogIcons}

      {!allBlogPage ? (
        <>
          <Tooltip
            title={`write ${addIconTitle}`}
            onClick={openWriter}
            style={{ width: "60px" }}
          >
            <IconButton>
              <AddIcon title={`write ${addIconTitle}`} style={{}} />
            </IconButton>
          </Tooltip>
          {showEditBtn ? (
            <Tooltip
              title={`edit ${type}`}
              onClick={editHandler}
              style={{ width: "60px" }}
            >
              <IconButton>
                <EditIcon style={{ cursor: "pointer" }} />
              </IconButton>
            </Tooltip>
          ) : null}

          {forumIcon}
        </>
      ) : null}
      <Tooltip
        title={`delete ${type}`}
        onClick={deleteHandler}
        style={{ width: "60px" }}
      >
        <IconButton>
          <DeleteIcon style={{ cursor: "pointer" }} />
        </IconButton>
      </Tooltip>
    </>
  );
};

export default HelperIcons;
