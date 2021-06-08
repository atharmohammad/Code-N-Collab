import { useState, useEffect, useRef, useContext } from "react";
import {
  Grid,
  Box,
  Button,
  Typography,
  Avatar,
  Tooltip,
  IconButton,
} from "@material-ui/core";

import { AuthContext } from "../../context/auth-context";
import axios from "../../Axios/axios";
import ReactMarkdown from "react-markdown";
import SaveCancel from "./SaveCancel";
import HelperIcons from "./HelperIcons";
import WriterModal from "./WriterModal";
import UserBlogDescription from "./userBlogDescription/userBlogDescription";
import Spinner from "../Spinner/BlogSpinner";

const Reply = (props) => {
  const auth = useContext(AuthContext);

  const reply = props.replyData;
  const [editReply, setEditReply] = useState(false);
  const [initialReply, setInitialReply] = useState(reply.Body);
  const [deleted, setDeleted] = useState(false);
  const [showWriter, setShowWriter] = useState(false);
  const [viewerLiked, setViewerLiked] = useState(false);
  const [likesLength, setlikesLength] = useState(reply.Likes.length);
  const [spinner, setSpinner] = useState(false);
  const divRef = useRef();

  useEffect(() => {
    if (auth.user) {
      const isUserLiked = reply.Likes.find(
        (like) => like.toString().trim() == auth.user._id.toString().trim()
      );
      if (isUserLiked) {
        setViewerLiked(true);
      }
    }
  }, []);

  const deleteHandler = async () => {
    if (window.confirm("Are you sure you want to delete this comment")) {
      setSpinner(true);
      try {
        const res = await axios.delete("/reply/deleteReply/" + reply._id);
      } catch (e) {
        console.log(e);
      } finally {
        setSpinner(false);
        setDeleted(true);
      }
    }
  };

  const saveHandler = async () => {
    const data = divRef.current.value.trim();
    if (!data) {
      return alert("cant be empty");
    }
    setSpinner(true);
    try {
      const res = await axios.patch("/reply/updateReply/" + reply._id , {Body:data});
      setEditReply(false);
      setInitialReply(res.data.Body);
    } catch (e) {
      console.log(e);
    }finally{
      setSpinner(false);
    }
  };

  const likeHandler = async () => {
    if (!viewerLiked) {
      setlikesLength((state) => state + 1);
    } else {
      setlikesLength((state) => state - 1);
    }

    try {
      await axios.post("/reply/like/" + reply._id);
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

  if (spinner) {
    return (
      <div style={{ display: "flex", alignSelf: "center" }}>
        <Spinner />
      </div>
    );
  }

  if (deleted) {
    return <></>;
  }

  return (
    <>
      <div
        style={{
          width: "60vw",
          margin: "15px 0px 10px 0px",
          background: "#fff",
          borderRadius: "30px",
          padding: "10px",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", background: "#fff" }}>
            <UserBlogDescription admin={{ User: reply.User }} />
          </div>
          {editReply === false ? (
            <div
              style={{
                background: "#fff",
                fontSize: "18px",
                padding: "15px",
                overflow: "auto",
              }}
            >
              <pre>
                <ReactMarkdown>{initialReply}</ReactMarkdown>
              </pre>
            </div>
          ) : (
            <div style={{ margin: "2px" }}>
              <textarea
                ref={divRef}
                style={{
                  width: "100%",
                  minHeight: "150px",
                  resize: "vertical",
                  fontSize: "18px",
                  padding: "5px",
                  boxSizing: "border-box",
                }}
              >
                {initialReply}
              </textarea>
            </div>
          )}
          <Grid
            style={{ display: "flex", marginTop: "0px", background: "#fff" }}
          >
            <Grid container direction="row" justify="flex-start">
              {editReply ? (
                <SaveCancel
                  type="reply"
                  saveHandler={saveHandler}
                  cancelHandler={() => setEditReply(false)}
                />
              ) : null}
            </Grid>

            <Grid container direction="row" justify="flex-end">
              <HelperIcons
                type="reply"
                admin={{ User: reply.User }}
                showEditBtn={!editReply}
                editHandler={() => setEditReply(true)}
                likeHandler={likeHandler}
                likesLength={likesLength}
                deleteHandler={deleteHandler}
                openWriter={() => setShowWriter(true)}
              />
            </Grid>
          </Grid>
        </div>
      </div>
      <div style={{ width: "55vw", alignSelf: "center", backgorund: "red" }}>
        {showWriter ? (
          <WriterModal
            Api="/reply/newReply/"
            parentId={reply.Comment}
            cancelHandler={() => setShowWriter(false)}
          />
        ) : null}
      </div>
    </>
  );
};

export default Reply;
