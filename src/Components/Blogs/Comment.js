import { useState, useEffect, useRef, useContext } from "react";
import { Grid, Button, Tooltip, IconButton } from "@material-ui/core";
import Reply from "./Reply";
import ReactMarkdown from "react-markdown";
import SaveCancel from "./SaveCancel";
import HelperIcons from "./HelperIcons";
import WriterModal from "./WriterModal";
import UserBlogDescription from "./userBlogDescription/userBlogDescription";
import axios from "../../Axios/axios";
import BlogSpinner from "../Spinner/BlogSpinner";
import { AuthContext } from "../../context/auth-context";

const Comment = (props) => {
  const auth = useContext(AuthContext);

  const divRef = useRef();
  const [showReply, setShowReply] = useState(false);
  const [editComment, setEditComment] = useState(false);
  const [initialComment, setInitialComment] = useState(props.comment.Body);
  const [commentLoading, setCommentLoading] = useState(false);
  const [replySpinner, setReplySpinner] = useState(false);

  const [likesLength, setlikesLength] = useState(props.comment.Likes.length);
  const [viewerLiked, setViewerLiked] = useState(false);

  const [replies, setReplies] = useState([]);
  const [showWriter, setShowWriter] = useState(false);
  const [deleted, setDeleted] = useState(false);

  const user = props.comment.User;
  const id = props.comment._id;

  useEffect(() => {
    if (auth.user) {
      const isUserLiked = props.comment.Likes.find(
        (like) => like.toString().trim() == auth.user._id.toString().trim()
      );
      if (isUserLiked) {
        setViewerLiked(true);
      }
    }
  }, []);

  const saveHandler = async () => {
    const data = divRef.current.value.trim();
    if (!data) {
      return alert("cant be empty");
    }
    setCommentLoading(true);
    try {
      const res = await axios.patch("/comment/updateComment/" + id, {
        Body: data,
      });
      setInitialComment(res.data);
      setEditComment(false);
    } catch (e) {
      console.log(e);
    }
    setCommentLoading(false);
  };

  const toggleReplyHandler = async () => {
    if (!showReply) {
      try {
        setShowReply((prev) => !prev);
        setReplySpinner(true);
        const data = await axios.get("/reply/getReply/" + id);
        setReplies(data.data.Replies);
        console.log(data.data.Replies);
      } catch (e) {
        console.log(e);
      } finally {
        setReplySpinner(false);
      }
    } else {
      setShowReply((prev) => !prev);
    }
  };

  const deleteHandler = async () => {
    if (window.confirm("Are you sure you want to delete this comment")) {
      setCommentLoading(true);
      try {
        await axios.delete("/comment/deleteComment/" + id);
        setDeleted(true);
      } catch (e) {
        console.log(e);
      }
    }
    setCommentLoading(false);
  };

  const likeHandler = async () => {
    if (!viewerLiked) {
      setlikesLength((state) => state + 1);
    } else {
      setlikesLength((state) => state - 1);
    }

    try {
      await axios.post("/comment/like/" + id);
      setViewerLiked((state) => !state);
    } catch (e) {
      alert("error liking");
      if (!viewerLiked) {
        setlikesLength((state) => state - 1);
      } else {
        setlikesLength((state) => state + 1);
      }
    }
  };

  if (deleted) {
    return <></>;
  }

  if (commentLoading) {
    return <BlogSpinner />;
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
          <UserBlogDescription admin={{ User: props.comment.User }} />
        </div>
        {editComment === false ? (
          <div
            style={{
              background: "#fff",
              fontSize: "18px",
              padding: "15px",
              overflow: "auto",
            }}
          >
            <pre>
              <ReactMarkdown>{initialComment}</ReactMarkdown>
            </pre>
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
      </div>
      <Grid
        style={{
          display: "flex",
          marginTop: "0px",
          background: "#fff",
          borderRadius: "10px",
        }}
      >
        <Grid container direction="row" justify="flex-start">
          {editComment ? (
            <SaveCancel
              type="Comment"
              saveHandler={saveHandler}
              cancelHandler={() => setEditComment(false)}
            />
          ) : null}
        </Grid>

        <Grid container direction="row" justify="flex-end">
          <HelperIcons
            type="comment"
            admin={{ User: user }}
            showEditBtn={!editComment}
            editHandler={() => setEditComment(true)}
            toggleReplyHandler={toggleReplyHandler}
            deleteHandler={deleteHandler}
            openWriter={() => setShowWriter(true)}
            likeHandler={likeHandler}
            likesLength={likesLength}
            viewerLiked={viewerLiked}
          />
        </Grid>
      </Grid>
      <div>
        {showReply ? (
          <div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-end",
              }}
            >
              {replySpinner ? (
                <div
                  style={{
                    height: "100%",
                    display: "flex",
                    justifyContent: "flexStart",
                    width: "100%",
                  }}
                >
                  <BlogSpinner />
                </div>
              ) : (
                replies.map((reply) => <Reply replyData={reply} />)
              )}
            </div>
            <div
              style={{
                margin: "auto",
                borderBottom: "10px solid grey",
                width: "10vw",
              }}
            ></div>
          </div>
        ) : null}
      </div>
      {showWriter ? (
        <WriterModal
          Api="/reply/newReply/"
          parentId={id}
          cancelHandler={() => setShowWriter(false)}
        />
      ) : null}
    </div>
  );
};

export default Comment;
