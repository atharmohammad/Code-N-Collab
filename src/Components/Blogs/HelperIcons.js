import { useState, useEffect, useContext } from "react";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import CommentIcon from "@material-ui/icons/Comment";
import { Tooltip, Button } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import ForumIcon from "@material-ui/icons/Forum";
import EditIcon from "@material-ui/icons/Edit";
import AddIcon from "@material-ui/icons/Add";
import Fade from "@material-ui/core/Fade";

import { AuthContext } from "../../context/auth-context";
import axios from "../../Axios/axios";
import classes from "./blogs.module.css";
import Snacker from '../Snacker/Snaker'

const HelperIcons = (props) => {
  const auth = useContext(AuthContext);
  const [error, setError] = useState(null);
  const [disableLikeBtn, setDisableLikeBtn] = useState(true);

  const {
    type,
    showEditBtn,
    editHandler,
    deleteHandler,
    openWriter,
    commentsLength,
    admin,
    likeRoute,
    likeArray,
  } = props //for all
  const { toggleCommentHandler } = { ...props }; //particular blogs
  const { toggleReplyHandler , repliesLength} = { ...props }; //comment
  const { allBlogPage } = { ...props }; //allblogPage blog

  const [viewerLiked, setViewerLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(likeArray.length);

  let addIconTitle = "reply";
  let forumIcon = null;
  let blogIcons = null;

  useEffect(() => {
    if (auth.user) {
      setDisableLikeBtn(false);
      const isUserLiked = likeArray.find(
        (like) => like.toString().trim() == auth.user._id.toString().trim()
      );
      if (isUserLiked) {
        setViewerLiked(true);
      }
    }
  }, []);

  const likeHandler = async () => {
    if (disableLikeBtn === true) {
      return;
    }
    setDisableLikeBtn(true);
    setLikesCount((state) => (viewerLiked ? state - 1 : state + 1));
    setViewerLiked((state) => !state);
    try {
      const blog = await axios.post(likeRoute);
    } catch (e) {
      setLikesCount((state) => (viewerLiked ? state - 1 : state + 1));
      setViewerLiked((state) => !state);
      setError("Oops something went wrong");
    }
    setDisableLikeBtn(false);
  };

  if (type.toLowerCase() == "blog") {
    addIconTitle = "comment";
    blogIcons = (
      <>
        <Tooltip
          title="View Comment"
          className={classes.iconTooltip}
          onClick={toggleCommentHandler}
        >
          <Button>
            <CommentIcon className={classes.particularIcon} />
            {commentsLength}
          </Button>
        </Tooltip>
      </>
    );
  } else if (type.toLowerCase() == "comment") {
    forumIcon = (
      <Tooltip
        TransitionComponent={Fade}
        TransitionProps={{ timeout: 600 }}
        title="toggle Reply"
        className={classes.iconTooltip}
        onClick={toggleReplyHandler}
      >
        <Button>
          <ForumIcon className={classes.particularIcon} />
          {repliesLength}
        </Button>
      </Tooltip>
    );
  }

  return (
    <>
      <Tooltip
        TransitionComponent={Fade}
        TransitionProps={{ timeout: 600 }}
        title="Like"
        className={classes.iconTooltip}
        onClick={() => {
          if (auth.user) {
            return likeHandler();
          }
          return setError("Login Required !");
        }}
      >
        <Button>
          <ThumbUpAltIcon
            className={classes.particularIcon}
            style={{
              color: viewerLiked ? "#353af3" : "#bec4c3",
            }}
          />
          {likesCount}
        </Button>
      </Tooltip>

      {blogIcons}

      {!allBlogPage ? (
        <>
          <Tooltip
            TransitionComponent={Fade}
            TransitionProps={{ timeout: 600 }}
            title={`write ${addIconTitle}`}
            onClick={() => {
              if (auth.user) {
                return openWriter();
              }
              return setError("Login Required !");
            }}
            className={classes.iconTooltip}
          >
            <Button>
              <AddIcon
                title={`write ${addIconTitle}`}
                className={classes.particularIcon}
              />
            </Button>
          </Tooltip>
          {auth.user &&
          admin.User._id.toString().trim() ===
            auth.user._id.toString().trim() ? (
            showEditBtn ? (
              <Tooltip
                TransitionComponent={Fade}
                TransitionProps={{ timeout: 600 }}
                title={`edit ${type}`}
                onClick={editHandler}
                className={classes.iconTooltip}
              >
                <Button>
                  <EditIcon className={classes.particularIcon} />
                </Button>
              </Tooltip>
            ) : null
          ) : null}

          {forumIcon}
        </>
      ) : null}

      {auth.user &&
      (admin.User._id.toString().trim() === auth.user._id.toString().trim() || auth.user.SuperUser)? (
        <Tooltip
          TransitionComponent={Fade}
          TransitionProps={{ timeout: 600 }}
          title={`delete ${type}`}
          onClick={deleteHandler}
          className={classes.iconTooltip}
        >
          <Button>
            <DeleteIcon className={classes.particularIcon} />
          </Button>
        </Tooltip>
      ) : null}
      <Snacker
        open={error !== null}
        severity="error"
        timer={6000}
        message ={error} 
        onClose={() => setError(null)}
      />
    </>
  );
};

export default HelperIcons;
