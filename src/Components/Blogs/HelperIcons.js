import { useState, useEffect } from "react";
import { Grid, Tooltip, IconButton , Button } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import AddIcon from "@material-ui/icons/Add";
import ForumIcon from "@material-ui/icons/Forum";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import CommentIcon from "@material-ui/icons/Comment";
import Fade from '@material-ui/core/Fade';


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
          style={{ height:"40px",width: "80px",
          margin: "10px 5px 0 " }}
          onClick={showCommentHandler}
        >
        <Button>
            <CommentIcon style={{cursor: "pointer",
            color:"gray",marginRight:'5px'}} />
              93
        </Button>
        </Tooltip>
      </>
    );
  } else if (props.type.toLowerCase() == "comment") {
    forumIcon = (
      <Tooltip
        TransitionComponent={Fade} TransitionProps={{ timeout: 600 }}
        title="toggle Reply"
        style={{ height:"40px",width: "80px",
        margin: "10px 5px 0 " }}
        onClick={toggleReplyHandler}
      >
      <Button>
        <ForumIcon style={{ cursor: "pointer",
        color:"gray",marginRight:'5px' }} />
      </Button>
      </Tooltip>
    );
  }

  return (
    <>
      <Tooltip
      TransitionComponent={Fade} TransitionProps={{ timeout: 600 }}
      title="Like"
      style={{ height:"40px",width: "80px",
      margin: "10px 5px 0 " }}>
        <Button>
            <ThumbUpAltIcon style={{ cursor: "pointer",
            color:"gray",marginRight:'5px' }} />{" "}
          120
        </Button>
      </Tooltip>

      {blogIcons}

      {!allBlogPage ? (
        <>
          <Tooltip
            TransitionComponent={Fade} TransitionProps={{ timeout: 600 }}
            title={`write ${addIconTitle}`}
            onClick={openWriter}
            style={{ height:"40px",width: "80px",
            margin: "10px 5px 0 " }}
          >
            <Button>
              <AddIcon title={`write ${addIconTitle}`} style={{cursor: "pointer",
              color:"gray",marginRight:'5px'}} />
            </Button>
          </Tooltip>
          {showEditBtn ? (
            <Tooltip
              TransitionComponent={Fade} TransitionProps={{ timeout: 600 }}
              title={`edit ${type}`}
              onClick={editHandler}
              style={{ height:"40px",width: "80px",
              margin: "10px 5px 0 "}}
            >
            <Button>
              <EditIcon style={{cursor: "pointer",
              color:"gray",marginRight:'5px'}} />
            </Button>
            </Tooltip>
          ) : null}

          {forumIcon}
        </>
      ) : null}
      <Tooltip
        TransitionComponent={Fade} TransitionProps={{ timeout: 600 }}
        title={`delete ${type}`}
        onClick={deleteHandler}
        style={{ height:"40px",width: "80px",
        margin: "10px 5px 0 "}}
      >
      <Button>
        <DeleteIcon style={{ cursor: "pointer",
        color:"gray",marginRight:'5px'}} />
      </Button>
      </Tooltip>
    </>
  );
};

export default HelperIcons;
