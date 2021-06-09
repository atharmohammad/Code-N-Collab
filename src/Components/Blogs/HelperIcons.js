import { useState, useEffect, useContext,useCallback } from "react";
import { Grid, Tooltip, IconButton, Button } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import AddIcon from "@material-ui/icons/Add";
import ForumIcon from "@material-ui/icons/Forum";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import CommentIcon from "@material-ui/icons/Comment";
import Fade from "@material-ui/core/Fade";
import { AuthContext } from "../../context/auth-context";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import axios from '../../Axios/axios'

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const HelperIcons = (props) => {
  const auth = useContext(AuthContext);
  const [error, setError] = useState(null);
  const [disableLikeBtn,setDisableLikeBtn] = useState(true);
   
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
  } = {
    ...props,
  }; //for all
  const { toggleCommentHandler } = { ...props }; //particular blogs
  const { toggleReplyHandler } = { ...props }; //comment
  const { allBlogPage } = { ...props }; //allblogPage blog
  
  const [viewerLiked, setViewerLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(likeArray.length);
  
  let addIconTitle = "reply";
  let forumIcon = null;
  let blogIcons = null;
  
  useEffect(()=>{
    if(auth.user){
      setDisableLikeBtn(false);
      const isUserLiked = likeArray.find(
        (like) => like.toString().trim() == auth.user._id.toString().trim()
      );
      if (isUserLiked) {
        setViewerLiked(true);
      }
    }
  },[])
  
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
      alert("problem liking");
    }
    setDisableLikeBtn(false);
  };

  if (type.toLowerCase() == "blog") {
    addIconTitle = "comment";
    blogIcons = (
      <>
        <Tooltip
          title="View Comment"
          style={{ height: "40px", width: "80px", margin: "10px 5px 0 " }}
          onClick={toggleCommentHandler}
        >
          <Button>
            <CommentIcon
              style={{ cursor: "pointer", color: "gray", marginRight: "5px" }}
            />
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
        style={{ height: "40px", width: "80px", margin: "10px 5px 0 " }}
        onClick={toggleReplyHandler}
      >
        <Button>
          <ForumIcon
            style={{ cursor: "pointer", color: "gray", marginRight: "5px" }}
          />
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
        style={{ height: "40px", width: "80px", margin: "10px 5px 0" }}
        onClick={() => {
          if (auth.user) {
            return likeHandler();
          }
          return setError("Login Required !");
        }}
      >
        <Button>
          <ThumbUpAltIcon
            style={{
              cursor: "pointer",
              color: viewerLiked ? "#353af3" : "#bec4c3",
              marginRight: "5px",
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
            style={{ height: "40px", width: "80px", margin: "10px 5px 0 " }}
          >
            <Button>
              <AddIcon
                title={`write ${addIconTitle}`}
                style={{ cursor: "pointer", color: "gray", marginRight: "5px" }}
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
                style={{ height: "40px", width: "80px", margin: "10px 5px 0 " }}
              >
                <Button>
                  <EditIcon
                    style={{
                      cursor: "pointer",
                      color: "gray",
                      marginRight: "5px",
                    }}
                  />
                </Button>
              </Tooltip>
            ) : null
          ) : null}

          {forumIcon}
        </>
      ) : null}

      {auth.user &&
      admin.User._id.toString().trim() === auth.user._id.toString().trim() ? (
        <Tooltip
          TransitionComponent={Fade}
          TransitionProps={{ timeout: 600 }}
          title={`delete ${type}`}
          onClick={deleteHandler}
          style={{ height: "40px", width: "80px", margin: "10px 5px 0 " }}
        >
          <Button>
            <DeleteIcon
              style={{ cursor: "pointer", color: "gray", marginRight: "5px" }}
            />
          </Button>
        </Tooltip>
      ) : null}
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        open={error !== null}
        autoHideDuration={6000}
        onClose={() => setError(null)}
      >
        <Alert onClose={() => setError(null)} severity="error">
          {error}
        </Alert>
      </Snackbar>
    </>
  );
};

export default HelperIcons;
