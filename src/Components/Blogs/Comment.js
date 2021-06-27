import { useState, useRef, useContext, useCallback } from "react";
import ReactMarkdown from "react-markdown";
import { Grid } from "@material-ui/core";

import Reply from "./Reply";
import SaveCancel from "./SaveCancel";
import HelperIcons from "./HelperIcons";
import WriterModal from "./WriterModal";
import UserBlogDescription from "./userBlogDescription/userBlogDescription";
import axios from "../../Axios/axios";
import BlogSpinner from "../Spinner/BlogSpinner";
import classes from "./blogs.module.css";

const Comment = (props) => {
  const divRef = useRef();
  const [showReply, setShowReply] = useState(false);
  const [editComment, setEditComment] = useState(false);
  const [initialComment, setInitialComment] = useState(props.comment.Body);
  const [commentLoading, setCommentLoading] = useState(false);
  const [replySpinner, setReplySpinner] = useState(false);
  const [replies, setReplies] = useState([]);
  const [showWriter, setShowWriter] = useState(false);
  const [deleted, setDeleted] = useState(false);

  const user = props.comment.User;
  const id = props.comment._id;

  function resizeImageForMarkdown(props) {
    return (
      <div style={{ display: "flex", width: "100%", justifyContent: "center" }}>
        <img {...props} style={{ maxWidth: "80%" }} />
      </div>
    );
  }

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
    }
    setCommentLoading(false);
  };

  const fetchReply = useCallback(async () => {
    if (replySpinner) {
      return;
    }

    try {
      setShowReply(true);
      setReplySpinner(true);
      const data = await axios.get("/reply/getReply/" + id);
      setReplies(data.data.Replies);
    } catch (e) {
    }
    setReplySpinner(false);
  }, []);

  const toggleReplyHandler = () => {
    if (!showReply) {
      fetchReply();
    } else {
      setShowReply(false);
    }
  };

  const deleteHandler = async () => {
    if (window.confirm("Are you sure you want to delete this comment")) {
      setCommentLoading(true);
      try {
        await axios.delete("/comment/deleteComment/" + id);
        setDeleted(true);
      } catch (e) {
      }
    }
    setCommentLoading(false);
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
          <UserBlogDescription
            admin={{ User: user }}
            date={props.comment.createdAt}
          />
        </div>
        {editComment === false ? (
          <div
            style={{
              background: "#fff",
              fontSize: "18px",
              padding: "15px",
              boxSizing: "border-box",
              overflow: "auto",
              wordWrap: "break-word",
            }}
          >
            <ReactMarkdown
              renderers={{ image: resizeImageForMarkdown }}
              children={initialComment}
            />
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
              placeHolder="write your comment..."
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

        <Grid className={classes.helperGrid_comment}>
          <HelperIcons
            type="comment"
            admin={{ User: user }}
            showEditBtn={!editComment}
            editHandler={() => setEditComment(true)}
            toggleReplyHandler={toggleReplyHandler}
            deleteHandler={deleteHandler}
            openWriter={() => setShowWriter(true)}
            likeArray={props.comment.Likes}
            likeRoute={"/comment/like/" + id}
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
                replies.map((reply) => (
                  <Reply replyData={reply} fetchRepliesAgain={fetchReply} />
                ))
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
          fetchData={fetchReply}
          cancelHandler={() => {
            setShowWriter(false);
          }}
        />
      ) : null}
    </div>
  );
};

export default Comment;
