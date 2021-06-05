import { useState, useEffect, useRef } from "react";
import { Grid, Button, Tooltip, IconButton } from "@material-ui/core";
import Replies from "./Replies";
import ReactMarkdown from "react-markdown";
import SaveCancel from "./SaveCancel";
import HelperIcons from "./HelperIcons";
import WriterModal from "./WriterModal";
import UserBlogDescription from "./userBlogDescription/userBlogDescription";
import axios from "../../Axios/axios";
import BlogSpinner from '../Spinner/BlogSpinner'

const Comment = (props) => {
  const divRef = useRef();
  const [showReply, setShowReply] = useState(false);
  const [editComment, setEditComment] = useState(false);
  const [initialComment, setInitialComment] = useState(props.comment.Body);
  const [likesLength, setlikesLength] = useState(props.comment.Likes.length);
  const [commentLoading, setCommentLoading] = useState(false);

  const [viewerLiked, setViewerLiked] = useState(
    props.comment.Likes.findIndex(
      (like, i) => like === props.comment.User._id
    ) !== -1
  );
  const [showWriter, setShowWriter] = useState(false);
  const [deleted, setDeleted] = useState(false);

  const user = props.comment.User;
  const id = props.comment._id;

  const saveHandler = async () => {
    const data = divRef.current.value.trim();
    if (!data) {
      return alert("cant be empty");
    }
    setCommentLoading(true);
    try {
      const res = await axios.patch("/comment/updateComment/" + id);
      setInitialComment(res.data);
      setEditComment(false);
    } catch (e) {
      console.log(e);
    }
    setCommentLoading(false);
  };

  const toggleReplyHandler = () => {
    setShowReply((prev) => !prev);
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

  if (deleted) {
    return <></>;
  }
  
  if(commentLoading){
    return <BlogSpinner/>;
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
            showEditBtn={!editComment}
            editHandler={() => setEditComment(true)}
            toggleReplyHandler={toggleReplyHandler}
            deleteHandler={deleteHandler}
            openWriter={() => setShowWriter(true)}
            likeChangeHandler={() => {}}
            likesLength={likesLength}
            viewerLiked={viewerLiked}
          />
        </Grid>
      </Grid>
      <div>{showReply ? <Replies commentId={123} /> : null}</div>
      {showWriter ? (
        <WriterModal cancelHandler={() => setShowWriter(false)} />
      ) : null}
    </div>
  );
};

export default Comment;
